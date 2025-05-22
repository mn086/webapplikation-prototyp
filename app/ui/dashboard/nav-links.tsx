// Markiert dies als Client-Komponente für interaktive Navigation
'use client';

// Importiere die benötigten Icons und Komponenten
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Liste der Navigationslinks für die Seitenleiste
// Bei größeren Anwendungen würde dies in einer Datenbank gespeichert werden
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Auswertungen',
    href: '/dashboard/analysis',
    icon: DocumentDuplicateIcon,
  },
];

// Hauptkomponente für die Navigation
export default function NavLinks() {
  // Hook für den aktuellen Pfad zur Hervorhebung des aktiven Links
  const pathname = usePathname();

  return (
    <>
      {/* Rendere jeden Navigationslink */}
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              // Basis-Styling für alle Links
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                // Zusätzliches Styling für den aktiven Link
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            {/* Icon des Links */}
            <LinkIcon className="w-6" />
            {/* Text des Links (ausgeblendet auf mobilen Geräten) */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}