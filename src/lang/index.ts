import chalk from 'chalk';
import { Logger } from '@/utils/Logger.ts';
import { join, toFileUrl, fromFileUrl, dirname } from "@std/path";

type TranslationMap = Record<string, string>;

const translations: Record<string, TranslationMap> = {};
const fallbackLang = "en";

const availableLangs: string[] = [];

export async function loadLocales(): Promise<void> {
  try {
    const currentFilePath = fromFileUrl(import.meta.url);
    const langDir = dirname(currentFilePath);
    
    Logger.info(`Loading language files from: ${langDir}`);
    
    try {
      const files = Deno.readDir(langDir);
      
      for await (const file of files) {
    if (file.isFile && file.name.endsWith(".json")) {
      const lang = file.name.replace(/\.json$/, "");
      const path = join(langDir, file.name);
      const module = await import(toFileUrl(path).href, { with: { type: "json" } });

      translations[lang] = module.default;
      availableLangs.push(lang);
    }
  }
      
      if (!availableLangs.includes(fallbackLang)) {
        Logger.warn(`[i18n] Warning: fallback language '${fallbackLang}' not found.`);
      }

      Logger.success(`Loaded languages: ${chalk.yellow(availableLangs.join(chalk.white(", ")))}`); 
    } catch (error) {
      Logger.error(`Failed to read language files: ${error instanceof Error ? error.message : String(error)}`);
    }
  } catch (error) {
    Logger.error(`Failed to initialize language system: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function t(
  key: string,
  lang = fallbackLang,
  vars?: Record<string, string | number>,
): string {
  const translation = translations[lang]?.[key] ??
    translations[fallbackLang]?.[key] ??
    key;

  if (!vars) return translation;

  return Object.entries(vars).reduce(
    (text, [k, v]) => text.replace(new RegExp(`{${k}}`, "g"), String(v)),
    translation,
  );
}

export function getAvailableLanguages(): string[] {
  return [...availableLangs];
}
