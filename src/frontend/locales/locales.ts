export type Languages = 'en' | 'de';

const locales: Record<Languages, { [key: string]: any }> = {
  en: {
    widgetName: 'Users Customer Requests',

    'button.all': 'All',
    'button.loadMore': 'Load more',
    'button.discarded': 'Discarded',
    'button.accepted': 'Accepted',

    'filter.condition': 'Condition',
    'filter.status': 'Status',

    'table.label.number': 'Client number',
    'table.label.caseId': 'Case/Order ID',
    'table.label.title': 'Title',
    'table.label.type': 'Type',
    'table.label.detail': 'Detail',
    'table.label.dueDate': 'Returned on',
    'table.label.acceptedOn': 'Accepted on',
    'table.label.condition': 'Condition',
    'table.label.status': 'Status',
    'table.label.sla': 'SLA',

    'label.status.offen Kundenwunsch': 'offen Kundenwunsch',
    'label.status.in Arbeit A1': 'in Arbeit A1',
    'label.status.Mangel Kunde': 'Mangel Kunde',
    'label.status.Mangel/in Arbeit Kunde': 'Mangel/in Arbeit Kunde',
    'label.status.(_) Noch nicht überg': '(_) Noch nicht überg',
    'label.status.In Bearbeitung': 'In Bearbeitung',
    'label.status.(Z) Zugeordnet': '(Z) Zugeordnet',
    'label.status.(S) Storno': '(S) Storno',
    'label.status.Positiv': 'Positiv',
    'label.status.Negativ': 'Negativ',
    'label.status.Mehrere Stati (Z)': 'Mehrere Stati (Z)',
    'label.status.Fehlerbehandlung': 'Fehlerbehandlung',
    'label.status.Offen': 'Offen',

    'label.condition.open': 'Open',
    'label.condition.dispatched': 'Dispatched',
    'label.condition.openDispatch': 'Open-Dispatch',
    'label.condition.accepted': 'Accepted',
    'label.condition.postponed': 'Postponed',
    'label.from': 'from',
    'label.to': 'to',

    'link.showAll': 'Show all ({amount})',

    'gucci-date-input-placeholder': 'dd.mm.yyyy',
    'gucci-date-input-description': 'Date of format dd.mm.yyyy',
    'gucci-date-range-input-placeholder': 'dd.mm.yyyy - dd.mm.yyyy',
    'gucci-date-range-input-description': 'Date range of format dd.mm.yyyy - dd.mm.yyyy',

    // Headers
    'gucci-date-picker-label': 'Choose Date',
    'gucci-month-list-label': 'Choose Month',
    'gucci-year-list-label': 'Choose Year',

    // Buttons
    'gucci-date-picker-prev-month': 'Previous month',
    'gucci-date-picker-next-month': 'Next month',

    // Day short-names
    'gucci-short-day-monday': 'Mo',
    'gucci-short-day-tuesday': 'Tu',
    'gucci-short-day-wednesday': 'We',
    'gucci-short-day-thursday': 'Th',
    'gucci-short-day-friday': 'Fr',
    'gucci-short-day-saturday': 'Sa',
    'gucci-short-day-sunday': 'Su',

    // Day full-names
    'gucci-full-day-monday': 'Monday',
    'gucci-full-day-tuesday': 'Tuesday',
    'gucci-full-day-wednesday': 'Wednesday',
    'gucci-full-day-thursday': 'Thursday',
    'gucci-full-day-friday': 'Friday',
    'gucci-full-day-saturday': 'Saturday',
    'gucci-full-day-sunday': 'Sunday',

    // Month names
    'gucci-month-jan': 'January',
    'gucci-month-feb': 'February',
    'gucci-month-mar': 'March',
    'gucci-month-apr': 'April',
    'gucci-month-may': 'May',
    'gucci-month-jun': 'June',
    'gucci-month-jul': 'July',
    'gucci-month-aug': 'August',
    'gucci-month-sep': 'September',
    'gucci-month-oct': 'October',
    'gucci-month-nov': 'November',
    'gucci-month-dec': 'December',

    // Year
    'gucci-year': '{year}',

    // Combinations
    'gucci-month-and-year': '{month} {year}',
    'gucci-week-of-year': 'Calendar-week {week} of year {year}',
  },
  de: {
    widgetName: 'Meine Kundenanliegen',

    'button.all': 'Alle',
    'button.loadMore': 'Mehr laden',
    'button.discarded': 'Zurückgelegte',
    'button.accepted': 'Angenommene',

    'filter.condition': 'Condition',
    'filter.status': 'Status',

    'table.label.number': 'Kundenummer',
    'table.label.caseId': 'Case/Order ID',
    'table.label.title': 'Titel',
    'table.label.type': 'Typ',
    'table.label.detail': 'Detail',
    'table.label.dueDate': 'Zurückgelegt am',
    'table.label.acceptedOn': 'Angenommen am',
    'table.label.condition': 'Condition',
    'table.label.status': 'Status',
    'table.label.sla': 'SLA',

    'label.status.offen Kundenwunsch': 'offen Kundenwunsch',
    'label.status.in Arbeit A1': 'in Arbeit A1',
    'label.status.Mangel Kunde': 'Mangel Kunde',
    'label.status.Mangel/in Arbeit Kunde': 'Mangel/in Arbeit Kunde',
    'label.status.(_) Noch nicht überg': '(_) Noch nicht überg',
    'label.status.In Bearbeitung': 'In Bearbeitung',
    'label.status.(Z) Zugeordnet': '(Z) Zugeordnet',
    'label.status.(S) Storno': '(S) Storno',
    'label.status.Positiv': 'Positiv',
    'label.status.Negativ': 'Negativ',
    'label.status.Mehrere Stati (Z)': 'Mehrere Stati (Z)',
    'label.status.Fehlerbehandlung': 'Fehlerbehandlung',
    'label.status.Offen': 'Offen',

    'label.condition.open': 'Open',
    'label.condition.dispatched': 'Dispatched',
    'label.condition.openDispatch': 'Open-Dispatch',
    'label.condition.accepted': 'Accepted',
    'label.condition.postponed': 'Postponed',
    'label.from': 'von',
    'label.to': 'bis',

    'link.showAll': 'Alle anzeigen ({amount})',

    'gucci-date-input-placeholder': 'TT.MM.JJJJ',
    'gucci-date-input-description': 'Datum in Format TT.MM.JJJJ',
    'gucci-date-range-input-placeholder': 'TT.MM.JJJJ - TT.MM.JJJJ',
    'gucci-date-range-input-description': 'Datumsbereich in Format TT.MM.JJJJ - TT.MM.JJJJ',

    // Headers
    'gucci-date-picker-label': 'Datum auswählen',
    'gucci-month-list-label': 'Monat auswählen',
    'gucci-year-list-label': 'Jahr auswählen',

    // Buttons
    'gucci-date-picker-prev-month': 'Vorheriger Monat',
    'gucci-date-picker-next-month': 'Nächster Monat',

    // Day short-names
    'gucci-short-day-monday': 'Mo',
    'gucci-short-day-tuesday': 'Di',
    'gucci-short-day-wednesday': 'Mi',
    'gucci-short-day-thursday': 'Do',
    'gucci-short-day-friday': 'Fr',
    'gucci-short-day-saturday': 'Sa',
    'gucci-short-day-sunday': 'So',

    // Day full-names
    'gucci-full-day-monday': 'Montag',
    'gucci-full-day-tuesday': 'Dienstag',
    'gucci-full-day-wednesday': 'Mittwoch',
    'gucci-full-day-thursday': 'Donnerstag',
    'gucci-full-day-friday': 'Freitag',
    'gucci-full-day-saturday': 'Samstag',
    'gucci-full-day-sunday': 'Sonntag',

    // Month names
    'gucci-month-jan': 'Jänner',
    'gucci-month-feb': 'Februar',
    'gucci-month-mar': 'März',
    'gucci-month-apr': 'April',
    'gucci-month-may': 'Mai',
    'gucci-month-jun': 'Juni',
    'gucci-month-jul': 'Juli',
    'gucci-month-aug': 'August',
    'gucci-month-sep': 'September',
    'gucci-month-oct': 'Oktober',
    'gucci-month-nov': 'November',
    'gucci-month-dec': 'Dezember',

    // Year
    'gucci-year': '{year}',

    // Combinations
    'gucci-month-and-year': '{month} {year}',
    'gucci-week-of-year': 'Kalendarwoche {week} des Jahres {year}',
  },
};

export default locales;
