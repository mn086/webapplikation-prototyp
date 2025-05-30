// Layout-Komponente für das Dashboard
// Implementiert ein responsives zweispaltiges Layout mit Seitennavigation und Hauptinhalt
// Die Navigation wird auf mobilen Geräten oben, auf Desktop-Geräten links angezeigt

import SideNav from '@/app/ui/dashboard/sidenav';

// Layout-Komponente, die den Rahmen für alle Dashboard-Seiten bereitstellt
// @param children - React-Komponenten, die im Hauptbereich angezeigt werden sollen
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Container mit flexiblem Layout, das sich an die Bildschirmgröße anpasst
    // - Auf Mobilgeräten: vertikale Anordnung (flex-col)
    // - Auf Desktop: horizontale Anordnung (md:flex-row)
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* Navigation */}
      {/* - Auf Mobilgeräten: volle Breite */}
      {/* - Auf Desktop: feste Breite von 64 (16rem) */}
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      
      {/* Hauptinhalt */}
      {/* - Füllt den verfügbaren Platz (flex-grow) */}
      {/* - Scrollbar bei Überlauf auf Desktop (md:overflow-y-auto) */}
      {/* - Innenabstand: 1.5rem (p-6) auf Mobilgeräten, 3rem (p-12) auf Desktop */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}