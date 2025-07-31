import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 mt-auto">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/impressum" 
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Impressum
            </Link>
            <Link 
              href="/datenschutz" 
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Datenschutzvereinbarung
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-slate-500 dark:text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} Regression Lexikon. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </footer>
  );
} 