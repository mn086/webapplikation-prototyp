
// Diese Datei konfiguriert das Verhalten von Next.js für das Projekt

// Importiere den TypeScript-Typ für die Next.js-Konfiguration
import type { NextConfig } from 'next';

// Definiere die Next.js-Konfiguration
const nextConfig: NextConfig = {
  // Konfiguriere den webpack-Bundler
  // Diese Funktion wird aufgerufen, wenn Next.js den Code kompiliert
  webpack(config) {
    // Füge eine neue Regel zur webpack-Konfiguration hinzu
    config.module.rules.push({
      // Diese Regel gilt für alle Dateien, die auf .svg enden
      test: /\.svg$/,
      // Verwende @svgr/webpack, um SVG-Dateien in React-Komponenten umzuwandeln
      // Dies ermöglicht es uns, SVGs wie normale React-Komponenten zu importieren und zu verwenden
      // z.B.: import Logo from './logo.svg'
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
