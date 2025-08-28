import type English from "./en";

/**
 * Czech language configuration for the Discord bot.
 *
 * This file contains all Czech text strings used throughout the bot,
 * including command names, descriptions, and response messages.
 * It follows the same structure as the English locale to ensure
 * type safety and consistency across all supported languages.
 *
 * @type {Object} Czech locale configuration matching English structure
 * @property {Object} metadata - Language metadata information
 * @property {Object} commands - Command names and descriptions in Czech
 * @property {Object} responses - Bot response messages in Czech
 */
export default {
	/**
	 * Language metadata and configuration for Czech locale.
	 * @type {Object}
	 * @property {Object} translators - Translator information with roles
	 * @property {Object} formatting - Cultural and formatting preferences
	 */
	metadata: {
		name: "Czech",
		nativeName: "Čeština",
		emoji: "🇨🇿",
		code: "cs",
		translators: {
			lead: "JustWolf",
			contributors: [],
			reviewers: ["JustWolf"],
			maintainer: "JustWolf",
		},
		formatting: {
			dateFormat: "DD.MM.YYYY",
			timeFormat: "24h",
			numberFormat: "cs-CZ",
		},
	},
	/**
	 * Command localization strings in Czech.
	 * @type {Object}
	 */
	commands: {
		ping: {
			name: "ping",
			description: "Pong!",
		},
	},
	/**
	 * Bot response messages in Czech.
	 * @type {Object}
	 */
	responses: {
		ping: {
			reply: "Pong!",
		},
	},
} satisfies typeof English;
