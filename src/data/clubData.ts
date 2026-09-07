import { Discipline, ClubEvent, Notice, JournalArticle } from '../types';
import antiqueFlintlockImg from '../assets/images/antique_flintlock_1788140116211.jpg';
import colonialRifleSmokeImg from '../assets/images/colonial_rifle_smoke_1788140085637.jpg';
import historicShootersImg from '../assets/images/historic_shooters_1788140102348.jpg';
import championship66thImg from '../assets/images/championship_66th_banner_1788195840823.jpg';

export const CLUB_IMAGES = {
  heroSmoke: colonialRifleSmokeImg,
  historicShooters: historicShootersImg,
  antiqueFlintlock: antiqueFlintlockImg,
  championship66th: championship66thImg,
};

export const DISCIPLINES: Discipline[] = [
  {
    id: 'single-action',
    number: '01',
    title: 'Single Action',
    schedule: 'FIRST SUNDAY · MONTHLY',
    tagline: '19th-century frontier shooting, rapid steel targets, and period costume.',
    description:
      'Single Action shooting combines the thrill of dynamic timed stages with historical 19th-century firearms. Shooters engage reactive steel targets in custom scenario stages using two single-action revolvers, a pistol-caliber lever-action rifle, and a side-by-side or lever-action shotgun. Authentic period or frontier dress is worn, celebrating the craft, camaraderie, and marksmanship of the Victorian and frontier eras.',
    firearms: [
      'Colt 1851 Navy & 1860 Army (.36 & .44 Percussion)',
      'Remington 1858 New Model Army',
      'Colt 1873 Single Action Army (Black powder or BP equivalent)',
      'Winchester 1866 & 1873 Lever Action Rifles (.44-40, .38-40)',
      'Hammered Side-by-Side Shotguns (12g & 16g black powder)',
    ],
    courseOfFire:
      'Timed multi-target stages (5 to 6 stages per match). Engagement includes 10 revolver rounds, 10 rifle rounds, and 4+ shotgun knock-down targets. Scored on speed and raw accuracy with penalties for misses.',
    calibers: '.36 to .45 caliber revolvers & rifles; 12 or 16 gauge shotguns loaded strictly with black powder or approved substitute.',
    powderSpecs: 'FFFg for handguns; FFg for longarms and shotguns. Natural wool felt or card wads, authentic bee-wax/mutton tallow lubricant.',
    equipmentNotes: 'Eye and ear protection mandatory. Holster rigs must comply with safety drop and retention regulations.',
  },
  {
    id: 'pistol-events',
    number: '02',
    title: 'Pistol Events',
    schedule: 'FIRST SUNDAY · MONTHLY',
    tagline: 'Precision 25m matches for traditional flintlock, percussion, and cap & ball revolvers.',
    description:
      'Traditional Black Powder Pistol matches test pure discipline, consistent powder measurement, and trigger control. Competitors shoot single-shot flintlock horse pistols, percussion target and duelling pistols, as well as percussion revolvers at standard ISSF 25m precision and rapid-fire turning targets. Meticulous patching, ball seating, and flash-hole management are celebrated as living arts.',
    firearms: [
      'Single-shot Flintlock Pistols (.45 to .54 caliber smoothbore & rifled)',
      'Percussion Duelling & Target Pistols (.36, .44, .45 caliber)',
      'Cap and Ball Percussion Revolvers (Colt, Remington, Rogers & Spencer)',
      'Colonial Police and Dragoon Pattern Handguns',
    ],
    courseOfFire:
      '25m Precision match (13 shots in 30 minutes, best 10 to score) on standard 25m precision target. 25m Timed Fire match with turning targets (5 shots in 2.5 minutes or series of 3-second exposures).',
    calibers: '.31, .36, .44, .45, and .50 caliber swaged or hand-cast lead round balls.',
    powderSpecs: 'Swiss No. 2 (FFFg) or Wano PPPPg for flintlock pan priming; pure soft lead (HB 5) round balls with lubricated linen or cotton drill patch.',
    equipmentNotes: 'Pistol loading stand, powder flask with brass non-sparking measure, brass range rod with ball puller, nipple wrench.',
  },
  {
    id: 'rifle-events',
    number: '03',
    title: 'Rifle Events',
    schedule: 'FIRST SUNDAY · MONTHLY',
    tagline: 'Long-range precision with Hawken rifles, British military Enfields, and colonial trade guns.',
    description:
      'From 50-metre offhand standing targets to 100-metre bench-rest precision, our Rifle Events encompass the full arc of muzzle-loading longarms. Whether firing patched round balls from Pennsylvania flintlock longrifles or shooting heavy hollow-base Minié bullets from authentic Pattern 1853 Enfield rifled muskets, members experience the genuine physics, sight picture, and smoke of historic marksmanship.',
    firearms: [
      'Flintlock Longrifles & Pennsylvania/Kentucky Rifles (.45 - .54 cal)',
      'Hawken Mountain & Plains Percussion Rifles (.50 & .54 cal)',
      'British Service Rifled Muskets: P1853 Enfield, Snider-Enfield (.577)',
      'Whitworth Match Rifles with hexagonal bores (.451 cal)',
      'Colonial Volunteer Corps and Militia Pattern Rifles',
    ],
    courseOfFire:
      '50m Standing Offhand (13 shots, 30 minutes, top 10 score). 100m Prone or Bench-rest precision. Occasional 200m silhouette gong challenges at the back mound of the Sackville range.',
    calibers: '.45, .50, .54, .577, and .58 caliber round balls and Minié balls.',
    powderSpecs: 'FFg black powder (Swiss No. 3 or Wano PP). Pre-measured charge tubes strictly enforced on firing lines.',
    equipmentNotes: 'Hardwood or brass ramrod with muzzle guide; range box with cap dispenser, nipple prick, cleaning patches, and ball grease.',
  },
  {
    id: 'shotgun-events',
    number: '04',
    title: 'Shotgun Events',
    schedule: 'FIRST SUNDAY · MONTHLY',
    tagline: 'Black powder clay target busting with muzzle-loading side-by-side fowling pieces.',
    description:
      'There is nothing quite like hearing the report and seeing a clay target shatter through a billowing cloud of white black-powder smoke. Our Shotgun Events follow traditional sporting clays and simulated driven bird formats. Shooters pour black powder, tamp down heavy card over-powder wads, measure lead shot, seat thin over-shot cards, prime the nipples or pans, and call "Pull!"',
    firearms: [
      'Percussion Double-Barrel Muzzle Loading Fowling Pieces (12 & 16 gauge)',
      'Flintlock Single and Double Barrel Sporting Guns',
      'Under-hammer and English London-made heritage shotguns',
      'Early exposed-hammer breech-loading black powder shotguns',
    ],
    courseOfFire:
      '25 or 50 target sporting clay layout. Single rise, report pairs, and simulated rabbit targets thrown from automated traps situated in the Hawkesbury scrub.',
    calibers: '10, 12, 16, and 20 gauge muzzle-loading smoothbores.',
    powderSpecs: 'FFg black powder (70 to 85 grains typically). Hard card 1/8" over-powder wad, 1/2" lubricated fiber cushion wad, #7.5 or #8 lead birdshot, 1/16" over-shot card.',
    equipmentNotes: 'Dual shot/powder shot snake or brass volumetric dippers, non-sparking measure, brass cap tin, safety glasses and hearing protection.',
  },
];

export const UPCOMING_EVENTS: ClubEvent[] = [
  {
    id: 'evt-aug-01',
    day: '02',
    month: 'AUG',
    year: '2026',
    discipline: 'Single action events',
    title: 'Single action events',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'rust',
    description:
      'Frontier scenario stage shoot with timed shotgun knockdowns, cap & ball revolver showdowns, and black powder smoke relays. Victorian & period cowboy attire welcomed.',
    matchDirector: 'G. "Doc" Callaghan (Single Action Captain)',
    rangesOpen: '8:00 AM Sign-in & Gun Scrutineering',
    fees: '$20 match fee (covers steel targets & range maintenance)',
    safetyBriefing: 'Mandatory holster check and gun cart inspection at 8:45 AM.',
    visitorFriendly: true,
  },
  {
    id: 'evt-aug-02',
    day: '09',
    month: 'AUG',
    year: '2026',
    discipline: 'Pistol events',
    title: 'Pistol events',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'green',
    description:
      '25-Metre Precision & Duel match for traditional Flintlock, Percussion Duelling Pistols, and Cap & Ball Revolvers. 13-shot series on precision turning targets.',
    matchDirector: 'M. Thornton (Pistol Section Captain)',
    rangesOpen: '8:30 AM Range inspection, 9:00 AM First relay',
    fees: '$15 match entry fee',
    safetyBriefing: 'Nipple safety, flash guards on flintlocks, capping strictly at firing line.',
    visitorFriendly: true,
  },
  {
    id: 'evt-aug-03',
    day: '16',
    month: 'AUG',
    year: '2026',
    discipline: 'Rifle events',
    title: 'Rifle events',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'tan',
    description:
      '50m Offhand and 100m Bench-Rest Trophy shoot. Categories for Service Rifled Muskets (.577 Enfield), Hawken Plains Rifles (.50/.54), and Flintlock Longrifles.',
    matchDirector: 'A. Campbell (Rifle Captain)',
    rangesOpen: '8:15 AM Gates open, 8:45 AM Briefing',
    fees: '$15 match entry fee',
    safetyBriefing: 'Strictly black powder only. Ramrod safety protocol in effect.',
    visitorFriendly: true,
  },
  {
    id: 'evt-aug-04',
    day: '23',
    month: 'AUG',
    year: '2026',
    discipline: 'Shotgun events',
    title: 'Shotgun events',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'rust',
    description:
      'Monthly Clay Target & Sporting Clays black powder match. 50-target course across the lower gulley and ridge traps. Loan fowling pieces available for beginners.',
    matchDirector: 'L. Henderson (Chief Shotgun Marshal)',
    rangesOpen: '8:15 AM Gates open, 8:45 AM Range Safety Briefing',
    fees: '$15 members / $25 visitors (includes clay target fees)',
    safetyBriefing: 'Mandatory safety briefing at 8:45 AM sharp. Pre-measured powder charges only.',
    visitorFriendly: true,
  },
  {
    id: 'evt-sep-01',
    day: '06',
    month: 'SEP',
    year: '2026',
    discipline: 'Single action events',
    title: 'Spring Frontier Shootout',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'green',
    description:
      '6-Stage colonial frontier match featuring high-volume steel knockdowns, swinging gongs, and mid-day campfire damper BBQ.',
    matchDirector: 'G. Callaghan',
    rangesOpen: '8:00 AM Sign-in',
    fees: '$20 match fee',
    safetyBriefing: 'Eye and ear protection mandatory.',
    visitorFriendly: true,
  },
  {
    id: 'evt-sep-02',
    day: '13',
    month: 'SEP',
    year: '2026',
    discipline: 'Pistol events',
    title: 'Heritage Handgun Championship',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'tan',
    description:
      '25m Precision target match for single-shot flintlock and percussion pistols, plus MLAANZ postal qualifier.',
    matchDirector: 'M. Thornton',
    rangesOpen: '8:30 AM Setup',
    fees: '$15 match fee',
    safetyBriefing: 'Capping only at designated firing stations under RO command.',
    visitorFriendly: true,
  },
  {
    id: 'evt-sep-03',
    day: '20',
    month: 'SEP',
    year: '2026',
    discipline: 'Rifle events',
    title: 'Hawkesbury 100m Longarm Trophy',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'rust',
    description:
      'Precision bench-rest and offhand 50m/100m match for military Enfields, Whitworths, and custom Hawken rifles.',
    matchDirector: 'A. Campbell',
    rangesOpen: '8:15 AM Gates open',
    fees: '$15 match entry fee',
    safetyBriefing: 'No smokeless powders permitted on range.',
    visitorFriendly: true,
  },
  {
    id: 'evt-aug-66th-nationals',
    day: '21-23',
    month: 'AUG',
    year: '2026',
    discipline: 'Rifle events',
    title: '66th Australian Muzzle Loading Championships',
    location: 'Sackville Range (Hawkesbury)',
    time: '8:00 AM Daily',
    themeColor: 'rust',
    description:
      'The 66th Australian Muzzle Loading Rifle & Shotgun Championships. 300y Military Offhand, 100y Rifle Championships, Flintlock, Cannons, Tomahawk Throw, and 20-target MLAIC Clays. TryBooking #1591800.',
    matchDirector: 'SCMLC & NSWMLA Committee',
    rangesOpen: '7:30 AM Daily Registration & Armourer Inspection',
    fees: 'Refer to TryBooking portal (events/landing/1591800)',
    safetyBriefing: 'Mandatory daily range safety briefing at 8:15 AM.',
    visitorFriendly: true,
  },
  {
    id: 'evt-sep-04',
    day: '27',
    month: 'SEP',
    year: '2026',
    discipline: 'Shotgun events',
    title: 'Hawkesbury Smoke & Clay Classic',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'green',
    description:
      'Black powder sporting clays layout across 50 targets. Side-by-side percussion and exposed hammer fowlers.',
    matchDirector: 'L. Henderson',
    rangesOpen: '8:30 AM Trap testing',
    fees: '$25 entry fee',
    safetyBriefing: 'Card wads only, no plastic wads.',
    visitorFriendly: true,
  },
  {
    id: 'evt-oct-01',
    day: '04',
    month: 'OCT',
    year: '2026',
    discipline: 'Single action events',
    title: 'Colonial Cup & Steel Challenge',
    location: 'Sackville Range',
    time: '9:00 AM',
    themeColor: 'tan',
    description:
      'Annual Colonial Cup multi-stage scenario shoot with historical targets and themed period dress.',
    matchDirector: 'G. Callaghan',
    rangesOpen: '8:00 AM Sign-in',
    fees: '$20 match fee',
    safetyBriefing: 'Holster retention inspection at 8:45 AM.',
    visitorFriendly: true,
  },
  {
    id: 'evt-jul-01',
    day: '11',
    month: 'JUL',
    year: '2027',
    discipline: 'The Club',
    title: '2027 Annual General Meeting (AGM)',
    location: 'Sackville Range Clubhouse',
    time: '9:30 AM',
    themeColor: 'green',
    description:
      'Official 2027 Annual General Meeting followed by election of committee, range development presentation, and general fellowship shoot in the afternoon.',
    matchDirector: 'Club Secretary & Executive Committee',
    rangesOpen: '9:00 AM Tea, damper, and roll-call',
    fees: 'Free to all financial members and registered observers',
    safetyBriefing: 'General meeting inside clubhouse; range cold until 1:00 PM.',
    visitorFriendly: true,
  },
];

export const NOTICES: Notice[] = [
  {
    id: 'notice-66th-nationals',
    date: '21st–23rd August 2026',
    title: '66th Australian Muzzle Loading Championships (TryBooking #1591800)',
    summary: 'Three-day national rifle, musket, cannon, and shotgun championships at Sackville Range.',
    category: 'Match',
    urgent: true,
    body: `The Sydney Colonial Muzzle-Loading Club is honored to host the 66th Australian Muzzle Loading Rifle & Shotgun Championships at Sackville Range.

Event Highlights:
• Friday 21 Aug: Military Application, 300yd Offhand, 50yd Military & Sporting Musket matches.
• Saturday 22 Aug: Australian Muzzle Loading Rifle Championships at 100yd (3 Positions), Junior Rifle (75yd), 50yd Flintlock Rifle, 50yd Miniature & Field Cannon match, evening Knife & Tomahawk Throw.
• Sunday 23 Aug: Australian Open Muzzle Loading Shotgun Championship & Flintlock Shotgun Championship on 20-target MLAIC layout.

Official booking portal & registration cards: https://www.trybooking.com/events/landing/1591800`,
  },
  {
    id: 'notice-agm-2027',
    date: '11th July 2027',
    title: '2027 AGM: Sunday 11th July 2027 @ 9:30am',
    summary: 'Annual General Meeting, election of committee, and afternoon novelty match.',
    category: 'AGM',
    urgent: true,
    body: `Notice is hereby given to all financial members of the Sydney Colonial Muzzle Loading Club that the 2027 Annual General Meeting will take place at the Sackville Range Clubhouse on Sunday 11th July 2027 commencing promptly at 9:30am.

Agenda items include:
1. Confirmation of 2026 AGM Minutes
2. President's Annual Report & Range Operations Overview
3. Treasurer's Financial Statement and 2027/28 Budget
4. Election of Executive Committee (President, VP, Secretary, Treasurer, Range Captains)
5. Sackville 200-metre berm expansion project review
6. General Business and Member Q&A

Morning tea and damper will be served from 9:00am. A relaxed afternoon fellowship shoot will commence following the conclusion of the meeting at approximately 1:00pm.`,
  },
  {
    id: 'notice-working-bee',
    date: '20th June 2027',
    title: 'Range Maintenance & Berm Working Bee',
    summary: 'Join fellow members for general range upkeep, target frame painting, and grass mowing.',
    category: 'Range',
    urgent: false,
    body: `We encourage all members who are able to attend our bi-annual range working bee. Tasks include painting new steel target frames, repairing baffled target sheds, timber fencing maintenance, and brush clearing along the 100m and 200m range lanes.

Club will provide cold drinks, tea, and a hearty sausage sizzle lunch for all volunteers. Please bring gloves, sturdy boots, and hand tools if convenient.`,
  },
  {
    id: 'notice-powder-shipment',
    date: '2nd June 2027',
    title: 'Black Powder Supply & Pre-Measured Flask Guidelines',
    summary: 'Reminder on NSW Firearms Registry black powder transit limits and on-range flask safety.',
    category: 'Safety',
    urgent: false,
    body: `Members are reminded that pursuant to NSW Firearms Registry compliance and Club Standing Orders, all powder brought to the firing line must be in dedicated individual pre-measured plastic or copper charging tubes, or dispensed via an approved non-sparking brass flask measure.

Direct pouring from powder cans or storage canisters directly down the bore is strictly prohibited. Thank you for maintaining our unbroken safety record.`,
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'journal-01',
    title: 'The Art of Casting Round Balls: Alloy, Heat, and Balance',
    subtitle: 'Why pure soft lead and controlled temperature create the tightest groups at 50 metres.',
    author: 'Robert "Jack" MacIntyre (Club Armourer)',
    date: 'May 14, 2027',
    readTime: '6 min read',
    excerpt:
      'Modern projectile casting often chases hardness, but black powder round balls demand the exact opposite: pure 99.9% soft lead that engraves easily into the rifling lands under gentle cloth patch pressure.',
    tags: ['Ballistics', 'Reloading', 'Craftsmanship'],
    image: antiqueFlintlockImg,
    content: [
      'To understand colonial shooting, one must first look at the lead pot. While smokeless cartridges require antimony and tin to prevent lead fouling at high velocities, black powder muzzle-loading operates in a gentler, more tactile physical realm.',
      'A patched round ball must obturate slightly upon ignition, allowing the tightly woven linen or cotton drill patch to grip the spiral grooves of the barrel without stripping. If the lead is too hard (such as wheel-weight scrap), ramming becomes brutal, patch tears occur, and point of impact wanders unpredictably.',
      'We demonstrate authentic casting techniques at our bi-monthly masterclasses at Sackville: ladle pouring, checking for sprues, weighing individual balls to within 1.0 grain, and tumbling in a cloth bag with graphite for consistent seating.',
    ],
  },
  {
    id: 'journal-02',
    title: 'Reading the Smoke: Flintlock Pan Ignition Timing',
    subtitle: 'Demystifying the "flash-in-the-pan" and tuning English flint locks for instant detonation.',
    author: 'Clement Hughes',
    date: 'April 22, 2027',
    readTime: '8 min read',
    excerpt:
      'The common myth is that flintlocks have an unbearable delay between pull and projectile. With a hand-knapped English flint, a properly positioned vent, and fine priming powder, lock time can be under 50 milliseconds.',
    tags: ['Flintlock', 'History', 'Tuning'],
    image: colonialRifleSmokeImg,
    content: [
      'The expression "a flash in the pan" has passed into colloquial Australian English as a metaphor for fleeting failure. On the shooting line, it refers to priming powder detonating without igniting the main powder charge in the breech.',
      'The secret lies not in filling the pan to the brim, but in banking a minimal dusting of Swiss 4Fg priming powder against the outer pan wall, leaving the touch-hole exposed so the flame front licks through rather than drowning in burnt carbon.',
      'When properly adjusted, a quality lock sparks into the pan with a distinct crisp "clack-boom" that catches beginners by surprise with its near-instantaneous speed.',
    ],
  },
  {
    id: 'journal-03',
    title: '65 Years on the Hawkesbury: The Story of Sackville Range',
    subtitle: 'How a passionate group of Sydney historical arms collectors established NSW’s premier colonial range.',
    author: 'David Vance (Club Historian)',
    date: 'March 10, 2027',
    readTime: '10 min read',
    excerpt:
      'In 1962, a handful of enthusiasts met in a Sydney workshop with a shared vision: to keep the sound of black powder alive in Australia. Decades later, our Sackville range stands as a living cultural heritage sanctuary.',
    tags: ['Heritage', 'Club History', 'Hawkesbury'],
    image: historicShootersImg,
    content: [
      'When the Sydney Colonial Muzzle Loading Club was chartered in 1962, Australia was rapidly modernizing. Military surplus .303 rifles dominated shooting ranges, and 19th-century muzzle-loaders were largely relegated to wall hangings above suburban fireplaces.',
      'Our founders recognized that these firearms were not static museum artifacts, but intricate machines built by master gunsmiths to be used, maintained, and understood through sensory experience: the smell of sulfur and charcoal, the tactile heft of walnut and wrought iron, the patience of measured powder.',
      'Acquiring the parcel of land near Sackville in the Hawkesbury basin gave the club a permanent home away from encroaching urban development. Today, surrounded by native eucalypts and sandstone ridges, our range sounds exactly as it would have in 1860.',
    ],
  },
  {
    id: 'journal-04-66th-nationals',
    title: 'The 66th Australian Muzzle Loading Rifle & Shotgun Championships: Smoke, Steel & Heritage',
    subtitle: 'What happened when shooters from across the nation gathered at Sackville for three days of historic black powder competition.',
    author: 'SCMLC Match Operations & NSWMLA Committee',
    date: 'August 24, 2026',
    readTime: '7 min read',
    excerpt:
      'From 300-yard military offhand precision to 20-target MLAIC clay flights and 50-yard cannon detonations, the 66th Australian Championships brought together Australia’s finest black powder marksmen at our Sackville Range.',
    tags: ['Championships', 'Rifle', 'Shotgun', 'NSWMLA', 'Hawkesbury'],
    image: championship66thImg,
    content: [
      'The 66th Australian Muzzle Loading Rifle & Shotgun Championships, proudly hosted by the Sydney Colonial Muzzle-Loading Club (SCMLC) and promoted by the NSW Muzzle Loading Association, concluded with remarkable marksmanship, record attendance, and three full days of living history competition (Friday 21st to Sunday 23rd August 2026).',
      'Friday kicked off with intense Military Application matches and the celebrated 300-yard offhand event. Shooters contended with shifting Hawkesbury breezes, followed by 50-yard Military and Sporting Musket relays where heavy lead round balls and Minié projectiles punched crisp cloverleaf groups into target cards.',
      'Saturday was the marquee day of the Australian Muzzle Loading Rifle Championships at 100 yards. Competitors tackled three distinct shooting positions—Offhand standing, Sitting/Kneeling, and Prone—across Traditional, Military, and Open categories, while our junior competitors demonstrated poise at 75 yards. Concurrently, the 50-yard Flintlock Rifle and 50-yard Miniature & Field Cannon competitions filled the valley with deep reverberating roars. The day concluded under the stars with the traditional evening Knife and Tomahawk Throw by the campfire.',
      'Sunday was dedicated to the shotgunners, staging the Australian Open Muzzle Loading Shotgun Championship and the Australian Flintlock Shotgun Championship. Firing over an authentic MLAIC 20 single-rise layout, competitors swung vintage side-by-side percussion and flintlock fowlers, shattering clay birds against billowing white smoke clouds.',
      'Official registrations and match cards were managed via TryBooking (https://www.trybooking.com/events/landing/1591800). The executive committee extends gratitude to all range officers, volunteers, interstate competitors, and supporters who made this historic 66th edition unforgettable.',
    ],
  },
];

export const CHAMPIONSHIP_66TH_DATA = {
  title: '66th Australian Muzzle Loading Rifle & Shotgun Championships',
  hostedBy: 'Sydney Colonial Muzzle-Loading Club (SCMLC)',
  promotedBy: 'New South Wales Muzzle Loading Association (NSWMLA)',
  dates: 'Friday 21st – Sunday 23rd August 2026',
  location: 'Sackville Range, 423 Sackville Ferry Rd, Sackville North NSW',
  trybookingUrl: 'https://www.trybooking.com/events/landing/1591800',
  trybookingId: '1591800',
  badgeText: 'Featured National Contest · TryBooking #1591800',
  sectionHeading: 'What Happened at Sackville',
  image: championship66thImg,
  summary:
    'A landmark 3-day gathering encompassing 300-yard military offhand, 100-yard 3-position rifle championships, 50-yard flintlock & cannon matches, evening tomahawk throws, and 20-target MLAIC clay shotgun championships.',
  scheduleBreakdown: [
    {
      day: 'Friday 21st August',
      theme: 'Military & Musket Day',
      highlight: 'Military Application, 300-Yard Offhand & Musket Matches',
      events: [
        'Military Application Match (rapid loading & designated timed exposures)',
        '300-Yard Offhand Standing Match (long-range sight adjustment & wind reading)',
        '50-Yard Military Musket Match (.58 / .577 Enfield & Springfield service muskets)',
        '50-Yard Sporting Musket & Smoothbore Trade Gun Competition',
      ],
    },
    {
      day: 'Saturday 22nd August',
      theme: 'Rifle Championships, Cannons & Campfire',
      highlight: '100-Yard 3-Position Rifle Championships, Flintlock, Cannons & Tomahawk Throw',
      events: [
        'Australian Muzzle Loading Rifle Championships at 100 Yards (Offhand, Sit/Kneel, Prone in Traditional, Military, and Open categories)',
        'Junior Rifle Championship at 75 Yards',
        '50-Yard Flintlock Rifle Precision Championship',
        '50-Yard Miniature & Field Cannon match (powder smoke and timed lanyard ignition)',
        'Evening Knife & Tomahawk Throwing Contest around the heritage campfire',
      ],
    },
    {
      day: 'Sunday 23rd August',
      theme: 'Shotgun Championships & Clays',
      highlight: 'Australian Open Muzzle Loading & Flintlock Shotgun Championships',
      events: [
        'Australian Open Muzzle Loading Shotgun Championship (20 single-rise targets on MLAIC layout)',
        'Australian Flintlock Shotgun Championship (traditional flint ignition on fast-flying clays)',
        'Presentation of National Trophies, Badges, and Aggregate Marksmanship Honors',
      ],
    },
  ],
  whatHappenedHighlights: [
    {
      title: 'National Gathering at Sackville',
      description:
        'Competitors, traditional gun collectors, and living history enthusiasts from NSW, Victoria, Queensland, and South Australia assembled at our Sackville valley range.',
    },
    {
      title: 'Authentic 19th-Century Ballistics',
      description:
        'From hand-cast soft lead round balls and lubricated patch formulas to Swiss black powder and hand-knapped English flints, original and authentic reproduction arms performed with surgical precision.',
    },
    {
      title: 'Thunderous Cannon & Field Relays',
      description:
        'The 50-yard cannon match delivered spectator excitement as scaled field pieces blasted solid lead projectiles downrange with thunderous resonance.',
    },
  ],
};

export const CLUB_HISTORY_TIMELINE = [
  {
    year: '1962',
    title: 'Founding & Charter',
    description:
      'Established in Sydney by passionate historical arms collectors and master gunsmiths determined to preserve the tangible art of black powder shooting and colonial Australian heritage.',
  },
  {
    year: '1970s',
    title: 'The Sackville Valley Range',
    description:
      'Secured our dedicated bushland sanctuary along Sackville Ferry Road in the picturesque Hawkesbury basin, building accredited 25m turning bays, 50m/100m benches, and 200m silhouette mounds.',
  },
  {
    year: '1980s – 1990s',
    title: 'Discipline Expansion & MLAIC Standards',
    description:
      'Introduced formal MLAIC competitive shotgun layouts, Single Action cowboy shooting stages, and national postal matches, growing into NSW’s leading black powder club.',
  },
  {
    year: '2000s – Present',
    title: 'National Championships & Heritage Preservation',
    description:
      'Regular host of the Australian Muzzle Loading Championships, accredited NSW Firearms Registry safety inductions, and educational craft masterclasses passing 19th-century knowledge to future generations.',
  },
];

export const CLUB_CONTACTS = {
  address: {
    label: 'Range Physical Address',
    street: 'Sackville Ferry Rd',
    suburb: 'Sackville North',
    state: 'NSW',
    postcode: '2756',
    country: 'Australia',
    full: 'Sackville Ferry Rd, Sackville North NSW 2756, Australia',
    googleMapsUrl: 'https://maps.google.com/?q=Sackville+Ferry+Rd,+Sackville+North+NSW+2756,+Australia',
    notes: 'Approved private range complex located in the Hawkesbury Valley.',
  },
  mailTo: {
    label: 'Postal Address (Mail To)',
    poBox: 'PO Box 91',
    suburb: 'Riverstone',
    state: 'NSW',
    postcode: '2765',
    country: 'Australia',
    full: 'PO Box 91, Riverstone, NSW 2765',
  },
  membershipSecretary: {
    role: 'Club Membership Secretary',
    name: 'Ryan Meads',
    title: 'Vice President',
    email: 'scmlc.management@gmail.com',
    description: 'New member inquiries, visitor registrations, membership renewals, and range inductions.',
  },
  clubSecretary: {
    role: 'Club Secretary',
    name: 'Yucel Durkaya',
    title: 'Club Secretary',
    email: 'scmlc.secretary@gmail.com',
    description: 'Official club correspondence, AGM notices, registry compliance, and constitutional governance.',
  },
};

