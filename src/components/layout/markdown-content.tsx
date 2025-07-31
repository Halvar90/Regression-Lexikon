"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock } from 'lucide-react';
import { useReadingMode } from '../context/reading-mode-provider';

import { SharingButtons } from './sharing-buttons';
import { calculateReadingTime } from '../../lib/reading-time';
import rehypeGlossaryTooltips from '../../lib/rehype-glossary-tooltips';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface MarkdownContentProps {
  content: string;
  slug?: string;
  title?: string;
  href?: string;
}

export function MarkdownContent({ content, slug }: MarkdownContentProps) {
  const { getFontSizeClass } = useReadingMode();
  const fontSizeClass = getFontSizeClass();
  
  // State für Glossar-Daten
  const [glossaryData, setGlossaryData] = useState<Record<string, string>>({});
  const [isGlossaryLoaded, setIsGlossaryLoaded] = useState(false);
  
  // Lade Glossar-Daten beim Mount
  useEffect(() => {
    const loadGlossary = async () => {
      try {
        const response = await fetch('/glossary.json');
        if (response.ok) {
          const data = await response.json();
          setGlossaryData(data);
          setIsGlossaryLoaded(true);
        }
      } catch (error) {
        console.warn('Glossar-Daten konnten nicht geladen werden:', error);
        setIsGlossaryLoaded(true); // Trotzdem als geladen markieren
      }
    };
    
    loadGlossary();
  }, []);
  
  // Berechne Lesezeit
  const readingTime = calculateReadingTime(content);

  return (
    <div className="relative">
      {/* Markdown-Inhalt */}
      <div className={`${fontSizeClass} transition-all duration-200`}>
        <TooltipProvider>
                     <ReactMarkdown 
             remarkPlugins={[remarkGfm]}
             rehypePlugins={isGlossaryLoaded ? [[rehypeGlossaryTooltips, { glossary: glossaryData }]] : []}
             components={{
            // Hauptüberschriften
            h1: ({ children }) => (
              <div className="mb-8 pb-4 border-b-2 border-gradient-to-r from-blue-500 to-purple-500">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
                  {children}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Lesezeit: {readingTime} {readingTime === 1 ? 'Minute' : 'Minuten'}</span>
                </div>
              </div>
            ),
            // Unterüberschriften
            h2: ({ children }) => (
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200 mt-12 mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">
                {children}
              </h2>
            ),
            // Kleinere Überschriften
            h3: ({ children }) => (
              <h3 className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 mt-10 mb-4">
                {children}
              </h3>
            ),
            // Absätze
            p: ({ children }) => (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {children}
              </p>
            ),
            // Ungeordnete Listen
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mb-6 space-y-3 ml-4">
                {children}
              </ul>
            ),
            // Geordnete Listen
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-slate-600 dark:text-slate-300 mb-6 space-y-3 ml-4">
                {children}
              </ol>
            ),
            // Listenelemente
            li: ({ children }) => (
              <li className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {children}
              </li>
            ),
            // Fettgedruckter Text
            strong: ({ children }) => (
              <strong className="font-bold text-slate-900 dark:text-white">
                {children}
              </strong>
            ),
            // Kursivgedruckter Text
            em: ({ children }) => (
              <em className="italic text-slate-600 dark:text-slate-300">
                {children}
              </em>
            ),
            // Trennlinien
            hr: () => (
              <hr className="my-12 border-slate-200 dark:border-slate-700" />
            ),
            // Blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gradient-to-b from-blue-500 to-purple-600 pl-6 italic text-slate-600 dark:text-slate-400 my-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-700/50 py-6 rounded-r-xl backdrop-blur-sm">
                {children}
              </blockquote>
            ),
            // Inline-Code
            code: ({ children, className }) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded-md text-sm font-mono border border-slate-200 dark:border-slate-600">
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
              <pre className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl overflow-x-auto my-8 border border-slate-200 dark:border-slate-700 shadow-lg">
                {children}
              </pre>
            ),
            // Links
            a: ({ children, href }) => (
              <a 
                href={href} 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            // Tabellen
            table: ({ children }) => (
              <div className="overflow-x-auto my-8">
                <table className="min-w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                {children}
              </td>
            ),
            // Glossar-Tooltips für span-Elemente mit data-glossary-term
            span: ({ children, ...props }) => {
              const glossaryTerm = (props as any)['data-glossary-term'] as string;
              
              if (glossaryTerm && glossaryData[glossaryTerm]) {
                return (
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <span className="border-b border-dotted border-blue-500 dark:border-blue-400 cursor-help text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 font-medium">
                        {children}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      sideOffset={5}
                      className="max-w-xs p-4 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 border border-slate-700 dark:border-slate-300 shadow-xl rounded-lg"
                    >
                      <div>
                        <div className="font-bold text-blue-400 dark:text-blue-600 mb-2 text-sm">
                          {glossaryTerm}
                        </div>
                        <div className="text-sm leading-relaxed">
                          {glossaryData[glossaryTerm]}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }
              
              // Fallback für normale span-Elemente
              return <span {...props}>{children}</span>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
        </TooltipProvider>
        
        {/* Sharing-Buttons am Ende des Artikels */}
        {slug && <SharingButtons slug={slug} />}
      </div>
    </div>
  );
} 