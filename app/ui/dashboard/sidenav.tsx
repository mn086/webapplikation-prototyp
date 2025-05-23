// Importiere benötigte Komponenten und Module
import Link from 'next/link';                            // Next.js Link für clientseitige Navigation
import NavLinks from '@/app/ui/dashboard/nav-links';     // Navigationslinks-Komponente
import HdmLogo from '@/app/ui/branding/hdm-logo';       // HdM Logo-Komponente
import { PowerIcon } from '@heroicons/react/24/outline'; // Ausloggen-Icon
import { signOut } from '@/auth';                        // Authentifizierungs-Funktion

// Hauptkomponente für die seitliche Navigationsleiste
export default function SideNav() {
  return (
    // Container für die gesamte Seitenleiste
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* Logo-Link zur Startseite */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#3E4847] p-4 md:h-40"
        href="/"
      >        
        {/* Container für das HdM Logo */}
        <div className="w-32 h-full text-white md:w-full">
          <HdmLogo />
        </div>
      </Link>
      {/* Container für Navigation und Ausloggen-Button */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* Navigationslinks */}
        <NavLinks />
        {/* Platzhalter für zusätzlichen Inhalt (nur auf Desktop sichtbar) */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {/* Ausloggen-Formular */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          {/* Ausloggen-Button mit Icon */}
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#3E4847] p-3 text-sm font-medium text-white hover:bg-[#4a5553] md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>          </button>
        </form>
      </div>
    </div>
  );
}
