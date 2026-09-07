import { ClubEvent } from '../types';

export const MONTH_NAMES_SHORT = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const;

export const MONTH_NAMES_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/**
 * Returns current month short abbreviation (e.g. 'AUG')
 */
export function getCurrentMonthShort(): string {
  const now = new Date();
  return MONTH_NAMES_SHORT[now.getMonth()];
}

/**
 * Returns current month full name (e.g. 'August')
 */
export function getCurrentMonthFullName(): string {
  const now = new Date();
  return MONTH_NAMES_FULL[now.getMonth()];
}

/**
 * Returns current year as string (e.g. '2026')
 */
export function getCurrentYearString(): string {
  return new Date().getFullYear().toString();
}

/**
 * Maps 3-letter month string to 0-11 index
 */
export function monthToIndex(monthStr: string): number {
  const clean = monthStr.toUpperCase().trim().slice(0, 3);
  const idx = MONTH_NAMES_SHORT.indexOf(clean as any);
  return idx !== -1 ? idx : 0;
}

/**
 * Parses event into a valid JavaScript timestamp for sorting
 */
export function getEventDateTimestamp(event: ClubEvent): number {
  const year = parseInt(event.year || getCurrentYearString(), 10) || new Date().getFullYear();
  const monthIdx = monthToIndex(event.month);
  const day = parseInt(event.day, 10) || 1;
  return new Date(year, monthIdx, day).getTime();
}

/**
 * Checks whether an event occurs in the current month and year
 */
export function isEventInCurrentMonth(event: ClubEvent): boolean {
  const now = new Date();
  const currentYear = now.getFullYear().toString();
  const currentMonth = MONTH_NAMES_SHORT[now.getMonth()];
  
  const eventYear = (event.year || currentYear).trim();
  const eventMonth = (event.month || '').toUpperCase().trim().slice(0, 3);

  return eventMonth === currentMonth && eventYear === currentYear;
}

/**
 * Returns events matching the current month and year, or upcoming events if current month has none
 */
export function getEventsForCurrentMonth(events: ClubEvent[]): ClubEvent[] {
  const currentMonthEvents = events.filter(isEventInCurrentMonth);
  if (currentMonthEvents.length > 0) {
    return currentMonthEvents;
  }

  // Fallback: return upcoming events starting from today
  const nowTime = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const upcoming = [...events]
    .filter(e => getEventDateTimestamp(e) >= nowTime)
    .sort((a, b) => getEventDateTimestamp(a) - getEventDateTimestamp(b));

  return upcoming.length > 0 ? upcoming : events.slice(0, 4);
}
