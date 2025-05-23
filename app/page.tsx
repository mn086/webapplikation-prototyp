// Importiere benötigte Komponenten und Module
import HdmLogo from '@/app/ui/branding/hdm-logo';        // HdM Logo Komponente
import Link from 'next/link';                            // Next.js Link-Komponente für clientseitige Navigation
import Image from 'next/image';                          // Next.js optimierte Bildkomponente

// Hauptkomponente für die Startseite
export default function Page() {
  return (
    // Container für die gesamte Seite mit flexibler Höhe und Padding
    <main className="flex min-h-screen flex-col p-6">
      {/* Header-Bereich mit HdM Logo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#3E4847] p-4 md:h-52">
        <div className="w-40">
          <HdmLogo />
        </div>
      </div>
      {/* Hauptbereich der Seite mit zwei Spalten auf Desktop */}
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        {/* Linke Spalte mit Willkommenstext und Login-Button */}
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* Willkommenstext mit HdM-Link */}
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>            <strong>Willkommen im Zeitreihen-Dashboard.</strong> Diese Anwendung wurde im Rahmen der Prüfungsaufgabe des Moduls{' '}
            <Link href="https://www.hdm-weiterbildung.de/angebote/kontaktstudium/web-technologies-and-analytics" className="text-[#e2001a]">
              Web Technologies & Analytics
            </Link>
            {' '}im Studiengang Data Science von Maik Nitzsche (mn086) erstellt.
          </p>
          {/* Login-Button */}
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-[#3E4847] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a5553] md:text-base"
          >
            <span>Anmelden</span>
          </Link>
        </div>
        {/* Rechte Spalte mit Hero-Images */}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Desktop-Version des Hero-Images */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots des Dashboard-Projekts in der Desktop-Version"
          />
          {/* Mobile-Version des Hero-Images */}
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot des Dashboard-Projekts in der mobilen Version"
          />
        </div>
      </div>
    </main>
  );
}
