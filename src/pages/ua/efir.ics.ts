import type { APIRoute } from 'astro';
import { UA } from '../../components/ua/config';

export const GET: APIRoute = () => {
  const start = new Date(UA.efir.iso);
  const end = new Date(start.getTime() + UA.efir.durationMin * 60_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Origin Liberty//UA efir//UK',
    'BEGIN:VEVENT',
    `UID:ua-efir-${fmt(start)}@originliberty.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    'SUMMARY:Ефір: переїзд в Уругвай (Даша)',
    'DESCRIPTION:Посилання на Zoom — у листі-підтвердженні.',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Ефір про переїзд в Уругвай через годину',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return new Response(ics, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
