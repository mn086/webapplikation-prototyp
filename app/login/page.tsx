
// Importiere benötigte Komponenten und Module
import HdmLogo from '@/app/ui/branding/hdm-logo';      // HdM Logo für den Header
import LoginForm from '@/app/ui/login-form';           // Komponente für das Login-Formular
import { Suspense } from 'react';                      // React-Komponente für asynchrones Laden
import { Metadata } from 'next';                       // Next.js Metadata für SEO

// Definiere Metadata für die Seite (wird im Browser-Tab angezeigt)
export const metadata: Metadata = {
  title: 'Login',
};

// Hauptkomponente für die Login-Seite
export default function LoginPage() {
  return (
    // Container für die gesamte Seite, zentriert auf Desktop
    <main className="flex items-center justify-center md:h-screen">
      {/* Login-Box mit maximaler Breite von 400px */}
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* Header mit HdM Logo */}
        <div className="flex h-20 w-full items-end rounded-lg bg-[#3E4847] p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <HdmLogo />
          </div>
        </div>
        {/* Login-Formular in Suspense-Wrapper für asynchrones Laden */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}