import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import fs from 'fs';
import path from 'path';

interface MarkdownPageServerProps {
  fileName: string;
}

const MarkdownPageServer: React.FC<MarkdownPageServerProps> = ({ fileName }) => {
  // Lade Markdown-Datei direkt beim Server-Side Rendering
  const filePath = path.join(process.cwd(), 'src', 'content', `${fileName}.md`);
  
  let content = '';
  try {
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8');
    } else {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-red-600 dark:text-red-400 text-center">
            <p className="text-lg font-semibold">Datei nicht gefunden</p>
            <p className="text-sm mt-2">Die Datei {fileName}.md konnte nicht gefunden werden.</p>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Fehler beim Laden der Markdown-Datei:', error);
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p className="text-lg font-semibold">Fehler beim Laden</p>
          <p className="text-sm mt-2">Ein Fehler ist beim Laden der Datei aufgetreten.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Hauptüberschriften
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b-2 border-gray-300 dark:border-gray-600 pb-4">
                {children}
              </h1>
            ),
            // Unterüberschriften
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-10 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                {children}
              </h2>
            ),
            // Kleinere Überschriften
            h3: ({ children }) => (
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-8 mb-4">
                {children}
              </h3>
            ),
            // Absätze
            p: ({ children }) => (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                {children}
              </p>
            ),
            // Ungeordnete Listen
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2 ml-4">
                {children}
              </ul>
            ),
            // Geordnete Listen
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2 ml-4">
                {children}
              </ol>
            ),
            // Listenelemente
            li: ({ children }) => (
              <li className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
              </li>
            ),
            // Fettgedruckter Text
            strong: ({ children }) => (
              <strong className="font-bold text-gray-900 dark:text-white">
                {children}
              </strong>
            ),
            // Kursivgedruckter Text
            em: ({ children }) => (
              <em className="italic text-gray-700 dark:text-gray-300">
                {children}
              </em>
            ),
            // Trennlinien
            hr: () => (
              <hr className="my-8 border-gray-300 dark:border-gray-600" />
            ),
            // Blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 my-6 bg-gray-50 dark:bg-gray-800 py-4 rounded-r-lg">
                {children}
              </blockquote>
            ),
            // Inline-Code
            code: ({ children, className }) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              ) : (
                <code className={className}>
                  {children}
                </code>
              );
            },
            // Code-Blöcke
            pre: ({ children }) => (
              <pre className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-x-auto my-6 border border-gray-200 dark:border-gray-700">
                {children}
              </pre>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default MarkdownPageServer; 