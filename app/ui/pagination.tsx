
// Markiere dies als Client-Komponente, da sie interaktive Elemente enthält
'use client';

// Importiere benötigte Komponenten und Module
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';  // Pfeil-Icons für Navigation
import clsx from 'clsx';                   // Utility für bedingte CSS-Klassen
import Link from 'next/link';              // Next.js Link-Komponente
import { generatePagination } from '@/app/lib/utils';  // Hilfsfunktion zur Seitennummerierung
import { usePathname, useSearchParams } from 'next/navigation';  // Hooks für URL-Parameter

// Hauptkomponente für die Seitennavigation
export default function Pagination({ totalPages }: { totalPages: number }) {
  // Hole aktuelle URL-Informationen
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Ermittle aktuelle Seite aus URL-Parametern (Standard: Seite 1)
  const currentPage = Number(searchParams.get('page')) || 1;

  // Hilfsfunktion zum Erstellen der URLs für Seitenwechsel
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generiere Array mit allen Seitenzahlen und ggf. Auslassungspunkten
  const allPages = generatePagination(currentPage, totalPages);
  return (
    <>
      {/* Container für die Paginierung */}
      <div className="inline-flex">
        {/* Pfeil für vorherige Seite */}
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}  // Deaktiviert auf Seite 1
        />

        {/* Container für Seitenzahlen */}
        <div className="flex -space-x-px">
          {/* Mapping über alle Seitenzahlen */}
          {allPages.map((page, index) => {
            // Bestimme Position der Seitenzahl für spezifisches Styling
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';                    // Erste Seitenzahl
            if (index === allPages.length - 1) position = 'last';   // Letzte Seitenzahl
            if (allPages.length === 1) position = 'single';         // Einzige Seitenzahl
            if (page === '...') position = 'middle';                // Auslassungspunkte

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

// Komponente für einzelne Seitenzahlen in der Paginierung
function PaginationNumber({
  page,              // Seitenzahl oder '...'
  href,              // URL für die Seitenzahl
  isActive,          // Ob diese Seite aktuell aktiv ist
  position,          // Position im Paginierungs-Layout
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  // Generiere CSS-Klassen basierend auf dem Zustand
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',   // Linke Rundung für erste/einzige Zahl
      'rounded-r-md': position === 'last' || position === 'single',    // Rechte Rundung für letzte/einzige Zahl
      'z-10 bg-[#e2001a] border-[#e2001a] text-white': isActive,      // HdM-Rot für aktive Seite
      'hover:bg-gray-100': !isActive && position !== 'middle',         // Hover-Effekt für klickbare Zahlen
      'text-gray-300': position === 'middle',                          // Hellgrau für Auslassungspunkte
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

// Komponente für die Navigations-Pfeile (vor/zurück)
function PaginationArrow({
  href,              // URL für die Zielseite
  direction,         // Richtung des Pfeils (links/rechts)
  isDisabled,        // Ob der Pfeil deaktiviert ist
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  // Generiere CSS-Klassen für den Pfeil
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,  // Deaktivierter Zustand
      'hover:bg-gray-100': !isDisabled,                 // Hover-Effekt wenn aktiv
      'mr-2 md:mr-4': direction === 'left',            // Abstand rechts für linken Pfeil
      'ml-2 md:ml-4': direction === 'right',           // Abstand links für rechten Pfeil
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
