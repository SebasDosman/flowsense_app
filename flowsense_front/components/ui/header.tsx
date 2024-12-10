import { useState, useEffect } from "react";
import Logo from "./logo";
import Link from "next/link"


export default function Header() {
  const [language, setLanguage] = useState("es");
  const [translations, setTranslations] = useState<{ contact?: string }>({});

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}/common.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Failed to load translations", error);
      }
    };

    loadTranslations();
  }, [language]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    window.location.reload();
  };

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Link
                href="/model"
                className="btn-sm bg-white text-gray-800 shadow hover:bg-gray-50"
              >
                Modelo
              </Link>
            </li>

            <li>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="btn-sm bg-gray-800 text-gray-200 shadow hover:bg-gray-900"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
