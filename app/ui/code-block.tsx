'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism.css';

interface CodeBlockProps {
  code: string;
  language: string;
  fileName?: string;
}

export default function CodeBlock({ code, language, fileName }: CodeBlockProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [code]);

  return (
    <div className="rounded-lg overflow-hidden">      {fileName && (
        <div className="bg-gray-700 text-gray-200 px-4 py-2 text-sm font-mono space-x-2">
          <span>📄</span>
          <span>{fileName}</span>
        </div>
      )}      <pre className={`language-${language} bg-white p-4 overflow-x-auto border border-gray-200 rounded-b-lg`}>
        <code className={`language-${language} text-gray-900`}>{code}</code>
      </pre>
    </div>
  );
}
