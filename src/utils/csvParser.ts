import { ClubEvent } from '../types';

/**
 * Parses a CSV string into an array of rows, handling quotes and commas within quotes.
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentCell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      // Only push non-empty rows
      if (currentRow.some(cell => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  // Push final cell and row
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(cell => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Converts parsed CSV rows into ClubEvent objects.
 */
export function parseCalendarCSV(csvText: string): { events: ClubEvent[]; errors: string[] } {
  const rows = parseCSV(csvText);
  if (rows.length < 2) {
    return { events: [], errors: ['CSV must have a header row and at least one event row.'] };
  }

  const rawHeaders = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const dataRows = rows.slice(1);

  const headerMap: Record<string, number> = {};
  rawHeaders.forEach((h, index) => {
    headerMap[h] = index;
  });

  const getCol = (possibleNames: string[]): number => {
    for (const name of possibleNames) {
      const sanitized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (sanitized in headerMap) {
        return headerMap[sanitized];
      }
    }
    return -1;
  };

  const dayIdx = getCol(['day', 'date', 'shootday']);
  const monthIdx = getCol(['month', 'mon']);
  const yearIdx = getCol(['year', 'yr']);
  const disciplineIdx = getCol(['discipline', 'category', 'type', 'eventtype']);
  const titleIdx = getCol(['title', 'eventname', 'name']);
  const locationIdx = getCol(['location', 'range', 'venue']);
  const timeIdx = getCol(['time', 'hour', 'starttime']);
  const themeColorIdx = getCol(['themecolor', 'theme', 'color']);
  const descriptionIdx = getCol(['description', 'desc', 'details', 'summary']);
  const matchDirectorIdx = getCol(['matchdirector', 'director', 'officer', 'captain']);
  const rangesOpenIdx = getCol(['rangesopen', 'gatesopen', 'open']);
  const feesIdx = getCol(['fees', 'fee', 'cost', 'entryfee']);
  const safetyBriefingIdx = getCol(['safetybriefing', 'briefing', 'safety']);
  const visitorFriendlyIdx = getCol(['visitorfriendly', 'visitorswelcome', 'visitors', 'visitor']);

  const events: ClubEvent[] = [];
  const errors: string[] = [];

  const themeCycle: ('rust' | 'green' | 'tan')[] = ['rust', 'green', 'tan'];

  dataRows.forEach((row, idx) => {
    const rowNum = idx + 2;
    const titleVal = titleIdx !== -1 ? row[titleIdx] : '';
    const disciplineVal = disciplineIdx !== -1 ? row[disciplineIdx] : '';

    if (!titleVal && !disciplineVal) {
      errors.push(`Row ${rowNum}: Skipped because neither title nor discipline was provided.`);
      return;
    }

    const title = titleVal || disciplineVal;
    const discipline = disciplineVal || 'Colonial Shoot';

    let day = dayIdx !== -1 && row[dayIdx] ? row[dayIdx] : '';
    let month = monthIdx !== -1 && row[monthIdx] ? row[monthIdx] : '';
    let year = yearIdx !== -1 && row[yearIdx] ? row[yearIdx] : '';

    // If day has something like "2026-08-15" or "15/08/2026" or "15 Aug 2026"
    if (day.includes('-')) {
      const parts = day.split('-');
      if (parts[0].length === 4) {
        year = parts[0];
        const mNum = parseInt(parts[1], 10);
        const mNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (mNum >= 1 && mNum <= 12) month = mNames[mNum - 1];
        day = parts[2];
      }
    } else if (day.includes('/')) {
      const parts = day.split('/');
      day = parts[0];
      if (parts[1]) {
        const mNum = parseInt(parts[1], 10);
        const mNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (mNum >= 1 && mNum <= 12) month = mNames[mNum - 1];
        else month = parts[1].slice(0, 3).toUpperCase();
      }
      if (parts[2]) year = parts[2];
    } else if (!month && day.includes(' ')) {
      const parts = day.split(' ');
      day = parts[0];
      month = parts[1].slice(0, 3).toUpperCase();
      if (parts[2]) year = parts[2];
    }

    if (!day) day = String(1 + (idx * 7) % 28).padStart(2, '0');
    if (!month) month = 'AUG';
    if (!year) year = new Date().getFullYear().toString();

    month = month.toUpperCase().slice(0, 3);
    day = day.replace(/[^0-9]/g, '').padStart(2, '0') || '01';
    year = year.replace(/[^0-9]/g, '') || new Date().getFullYear().toString();

    const location = (locationIdx !== -1 && row[locationIdx]) ? row[locationIdx] : 'Sackville Range';
    const time = (timeIdx !== -1 && row[timeIdx]) ? row[timeIdx] : '9:00 AM';
    
    let rawTheme = (themeColorIdx !== -1 && row[themeColorIdx]) ? row[themeColorIdx].toLowerCase() : '';
    let themeColor: 'rust' | 'green' | 'tan' = themeCycle[idx % 3];
    if (rawTheme.includes('rust') || rawTheme.includes('red') || rawTheme.includes('orange')) {
      themeColor = 'rust';
    } else if (rawTheme.includes('green') || rawTheme.includes('dark')) {
      themeColor = 'green';
    } else if (rawTheme.includes('tan') || rawTheme.includes('gold') || rawTheme.includes('yellow')) {
      themeColor = 'tan';
    }

    const description = (descriptionIdx !== -1 && row[descriptionIdx])
      ? row[descriptionIdx]
      : `${title} at the Sackville Range. Black powder shooting discipline open to members and licensed visitors.`;

    const matchDirector = (matchDirectorIdx !== -1 && row[matchDirectorIdx])
      ? row[matchDirectorIdx]
      : 'Range Officer on Duty';

    const rangesOpen = (rangesOpenIdx !== -1 && row[rangesOpenIdx])
      ? row[rangesOpenIdx]
      : '8:30 AM Gates open, 9:00 AM Safety Briefing';

    const fees = (feesIdx !== -1 && row[feesIdx])
      ? row[feesIdx]
      : '$15 members / $25 visitors';

    const safetyBriefing = (safetyBriefingIdx !== -1 && row[safetyBriefingIdx])
      ? row[safetyBriefingIdx]
      : 'Mandatory briefing before relays start. Pre-measured charges only.';

    let visitorFriendly = true;
    if (visitorFriendlyIdx !== -1 && row[visitorFriendlyIdx]) {
      const v = row[visitorFriendlyIdx].toLowerCase();
      if (v === 'false' || v === 'no' || v === '0' || v === 'n') {
        visitorFriendly = false;
      }
    }

    events.push({
      id: `csv-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
      day,
      month,
      year,
      discipline,
      title,
      location,
      time,
      themeColor,
      description,
      matchDirector,
      rangesOpen,
      fees,
      safetyBriefing,
      visitorFriendly,
    });
  });

  return { events, errors };
}

/**
 * Generates sample CSV template string
 */
export function generateSampleCalendarCSV(): string {
  const headers = [
    'day',
    'month',
    'year',
    'discipline',
    'title',
    'location',
    'time',
    'themeColor',
    'description',
    'matchDirector',
    'rangesOpen',
    'fees',
    'safetyBriefing',
    'visitorFriendly',
  ];

  const currentYear = new Date().getFullYear().toString();

  const sampleRows = [
    [
      '02',
      'AUG',
      currentYear,
      'Single Action',
      'Frontier Gunfighters Championship',
      'Sackville Range',
      '9:00 AM',
      'rust',
      '"6-stage frontier steel match with timed shotgun knockdowns and percussion revolver relays. Period attire welcomed."',
      '"Doc" Callaghan (Single Action Captain)',
      '8:00 AM Sign-in & Scrutineering',
      '$20 match entry fee',
      'Pre-match safety walkthrough and holster check at 8:45 AM',
      'true',
    ],
    [
      '09',
      'AUG',
      currentYear,
      'Pistol Events',
      'Colonial 25m Precision & Duel',
      'Sackville Range',
      '9:30 AM',
      'green',
      '"Precision single-shot flintlock and percussion pistol shoot on 25m turning targets. MLAANZ postal round included."',
      'M. Thornton (Pistol Captain)',
      '8:30 AM Range inspection',
      '$15 members / $25 visitors',
      'Nipple capping only at designated firing stations under RO command',
      'true',
    ],
    [
      '16',
      'AUG',
      currentYear,
      'Rifle Events',
      'Hawkesbury 100m Military & Hawken',
      'Sackville Range',
      '9:00 AM',
      'tan',
      '"Service rifle and plains rifle postal match at 50m and 100m. 2-band and 3-band Enfields, Sharps, and custom Hawken rifles."',
      'Arthur Pendelton (Rifle Captain)',
      '8:15 AM Gates open',
      '$15 range fee',
      'Muzzles elevated above hat height between benches. No smokeless powders.',
      'true',
    ],
    [
      '23',
      'AUG',
      currentYear,
      'Shotgun Events',
      'Black Powder Sporting Clays Cup',
      'Sackville Range',
      '9:00 AM',
      'rust',
      '"50-target sporting clays through the lower valley gully. Single and double rise report birds. Black powder smoke galore."',
      'L. Henderson (Chief Shotgun Marshal)',
      '8:30 AM Trap testing',
      '$25 (includes clays and bird targets)',
      'Eye and ear protection mandatory. Over-shot wads checked before relay.',
      'true',
    ],
  ];

  return [headers.join(','), ...sampleRows.map(r => r.join(','))].join('\n');
}
