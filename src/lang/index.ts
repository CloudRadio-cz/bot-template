import chalk from "chalk";
import { Logger } from "@/utils/Logger.ts";
import { dirname, fromFileUrl, join, toFileUrl } from "@std/path";

/**
 * Type definition for a map of translations within a category.
 * @typedef {Record<string, string>} TranslationMap
 */
type TranslationMap = Record<string, Record<string, string>>;

/**
 * Global storage for all loaded translations.
 * @type {Record<string, TranslationMap>}
 */
const translations: Record<string, TranslationMap> = {};

/**
 * Default fallback language code.
 * @type {string}
 */
const fallbackLang = "en";

/**
 * List of available language codes.
 * @type {string[]}
 */
const availableLangs: string[] = [];

/**
 * Loads all language files from the language directory.
 * Scans for JSON files in language-specific subdirectories and loads them as translation modules.
 * @throws {Error} If language system initialization fails
 * @returns {Promise<void>}
 */
export async function loadLocales(): Promise<void> {
	try {
		const currentFilePath = fromFileUrl(import.meta.url);
		const langDir = dirname(currentFilePath);

		Logger.info(`Loading language files from: ${langDir}`);

		try {
			const langFolders = Deno.readDir(langDir);

			for await (const folder of langFolders) {
				if (folder.isDirectory) {
					const lang = folder.name;
					const langFolderPath = join(langDir, lang);

					if (!translations[lang]) {
						translations[lang] = {};
					}

					const categoryFiles = Deno.readDir(langFolderPath);

					for await (const file of categoryFiles) {
						if (file.isFile && file.name.endsWith(".json")) {
							const category = file.name.replace(/\.json$/, "");
							const path = join(langFolderPath, file.name);
							const module = await import(toFileUrl(path).href, {
								with: { type: "json" },
							});

							translations[lang][category] = module.default;
						}
					}

					if (!availableLangs.includes(lang)) {
						availableLangs.push(lang);
					}
				}
			}

			if (!availableLangs.includes(fallbackLang)) {
				Logger.warn(
					`[i18n] Warning: fallback language '${fallbackLang}' not found.`,
				);
			}

			Logger.success(
				`Loaded languages: ${chalk.yellow(
					availableLangs.join(chalk.white(", ")),
				)}`,
			);
		} catch (error) {
			Logger.error(
				`Failed to read language files: ${
					error instanceof Error ? error.message : String(error)
				}`,
			);
		}
	} catch (error) {
		Logger.error(
			`Failed to initialize language system: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);
	}
}

/**
 * Translates a key to the specified language, with variable interpolation.
 * Falls back to the default language if translation is not found.
 * @param {string} key - Translation key in format "category.key"
 * @param {string} [lang=fallbackLang] - Target language code
 * @param {Record<string, string | number>} [vars] - Variables to interpolate in the translation
 * @returns {string} Translated text with interpolated variables
 */
export function t(
	key: string,
	lang = fallbackLang,
	vars?: Record<string, string | number>,
): string {
	const [category, actualKey] = key.split(".");

	if (!category || !actualKey) {
		Logger.warn(
			`[i18n] Invalid translation key format: ${key}. Expected format: "category.key"`,
		);
		return key;
	}

	const translation =
		translations[lang]?.[category]?.[actualKey] ??
		translations[fallbackLang]?.[category]?.[actualKey] ??
		key;

	if (!vars) return translation;

	return Object.entries(vars).reduce(
		(text, [k, v]) => text.replace(new RegExp(`{${k}}`, "g"), String(v)),
		translation,
	);
}

/**
 * Returns a list of all available language codes.
 * @returns {string[]} Array of language codes
 */
export function getAvailableLanguages(): string[] {
	return [...availableLangs];
}
