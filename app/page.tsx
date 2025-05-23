
// Importiere benötigte Komponenten und Module
import HdmLogo from '@/app/ui/branding/hdm-logo';        // HdM Logo Komponente
import { ArrowRightIcon } from '@heroicons/react/24/outline';  // Pfeil-Icon für den Login-Button
import Link from 'next/link';                            // Next.js Link-Komponente für clientseitige Navigation
import styles from '@/app/ui/home.module.css';           // CSS Module für spezifische Styling-Effekte
import Image from 'next/image';                          // Next.js optimierte Bildkomponente

// Hauptkomponente für die Startseite
export default function Page() {
  return (
    // Container für die gesamte Seite mit flexibler Höhe und Padding
    <main className="flex min-h-screen flex-col p-6">
      {/* Dekorativer Shape-Effekt aus dem CSS-Modul */}
      <div className={styles.shape} />
      
      {/* Header-Bereich mit HdM Logo */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#3E4847] p-4 md:h-52">
        <div className="w-40">
          <HdmLogo />
        </div>
      </div>      {/* Hauptbereich der Seite mit zwei Spalten auf Desktop */}
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        {/* Linke Spalte mit Willkommenstext und Login-Button */}
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* Dekorativer Pfeil über dem Text */}
          <div
            className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-[#3E4847]"
          />
          {/* Willkommenstext mit HdM-Link */}
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to HdM Dashboard.</strong> This is a project for the{' '}
            <a href="https://www.hdm-stuttgart.de/" className="text-[#e2001a]">
              Stuttgart Media University
            </a>
            , brought to you by the Web Technologies team.
          </p>
          {/* Login-Button mit Pfeil-Icon */}
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-[#3E4847] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a5553] md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>        {/* Rechte Spalte mit Hero-Images */}
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
