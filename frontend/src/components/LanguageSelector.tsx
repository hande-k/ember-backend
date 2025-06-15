
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
];

type LanguageSelectorProps = {
  globeWhite?: boolean;
};

export default function LanguageSelector({ globeWhite }: LanguageSelectorProps = {}) {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // This effect is to ensure hydration doesn't cause issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center">
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger
          className="w-12 h-12 border-none bg-transparent focus:ring-0 flex items-center justify-center"
          aria-label="Select Language"
        >
          {/* Make the globe icon larger */}
          <Globe className="h-7 w-7" color={globeWhite ? "#fff" : undefined} />
        </SelectTrigger>
        <SelectContent align="start" className="w-[160px]">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} className="cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
