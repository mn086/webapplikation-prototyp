// Markiere dies als Client-Komponente, da sie interaktive Elemente enthält
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// Such-Komponente mit verzögerter Suche (Debouncing)
// Zeigt ein Suchfeld an und aktualisiert die URL-Parameter bei Eingabe
export default function Search({ placeholder }: { placeholder: string }) {
  // Hooks für URL-Parameter und Navigation
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Verzögerte Suchfunktion (300ms) zur Reduzierung von Server-Anfragen
  // Aktualisiert die URL-Parameter: setzt die Seite zurück auf 1 und fügt den Suchbegriff hinzu
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      {/* Label für Screenreader-Zugänglichkeit */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/* Suchfeld mit Icon */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      {/* Lupen-Icon, das sich bei Fokus einfärbt */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}