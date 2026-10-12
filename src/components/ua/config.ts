/**
 * Single place to wire Dasha's Ukrainian funnel to GHL.
 * Empty strings mean "not wired yet": forms then fall back to her
 * Instagram DMs so nothing on the page is a dead end.
 */
export const UA = {
  /** GHL workflow "Inbound Webhook" trigger URLs (one per form). */
  webhookChecklist: '',
  webhookEfir: '',
  /** GHL calendar embed URL for the paid $100 consultation. */
  calendarEmbed: '',
  /** Fallback contact while GHL is not wired. */
  dm: 'https://ig.me/m/_daria_podkhaliuzina',
  checklistPdf: '/ua/uruguay-checklist.pdf',
  /**
   * Next free group Q&A on Zoom. PROPOSED date: Dasha confirms.
   * Kyiv is UTC+2 after Oct 25, Montevideo UTC-3.
   */
  efir: {
    iso: '2026-10-29T17:00:00Z',
    labelDate: 'Четвер, 29 жовтня',
    labelTime: '19:00 за Києвом · 14:00 в Монтевідео',
    durationMin: 45,
  },
} as const;
