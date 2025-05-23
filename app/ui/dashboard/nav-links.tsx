// Markiert dies als Client-Komponente für interaktive Navigation
'use client';

// Importiere die benötigten Icons und Komponenten
import {
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Liste der Navigationslinks für die Seitenleiste
// Bei größeren Anwendungen würde dies in einer Datenbank gespeichert werden
const links = [  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Messungen',
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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-[#3E4847] p-3 text-sm font-medium text-white hover:bg-[#4a5553] md:flex-none md:justify-start md:p-2 md:px-3',
              {
                // Zusätzliches Styling für den aktiven Link - HdM Rot für aktive Items
                'bg-[#e2001a] text-white': pathname === link.href,
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