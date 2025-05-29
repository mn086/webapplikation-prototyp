// Hilfsfunktionen für verschiedene Formatierungen und Berechnungen
import { TimeseriesDataPoint } from './definitions';

// Formatiert einen Betrag als Währung
export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
};

// Formatiert ein Datum in lokales Format
export const formatDateToLocal = (
  date: string | Date,
  locale: string = 'de-DE',
) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(dateObj);
};

// Generiert Beschriftungen für die Y-Achse des Diagramms
export const generateYAxis = (data: TimeseriesDataPoint[]) => {
  // Berechne die benötigten Beschriftungen für die Y-Achse
  // basierend auf dem höchsten Wert, dargestellt in Tausenderschritten
  const yAxisLabels = [];
  // Finde den höchsten Wert über alle numerischen Eigenschaften
  const highestRecord = Math.max(...data.flatMap(point => 
    Object.entries(point)
      .filter(([key, value]) => key !== 'seconds' && typeof value === 'number')
      .map(([_, value]) => value as number)
  ));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

// Generiert ein Array von Seitenzahlen für die Paginierung
export const generatePagination = (currentPage: number, totalPages: number) => {
  // Falls die Gesamtzahl der Seiten 7 oder weniger beträgt,
  // zeige alle Seiten ohne Auslassungspunkte an
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Falls die aktuelle Seite unter den ersten 3 Seiten ist,
  // zeige die ersten 3, Auslassungspunkte und die letzten 2 Seiten
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // Falls die aktuelle Seite unter den letzten 3 Seiten ist,
  // zeige die ersten 2, Auslassungspunkte und die letzten 3 Seiten
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Falls die aktuelle Seite irgendwo in der Mitte liegt,
  // zeige die erste Seite, Auslassungspunkte, die aktuelle Seite und ihre Nachbarn,
  // weitere Auslassungspunkte und die letzte Seite
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
