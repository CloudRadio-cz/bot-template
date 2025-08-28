/**
 * English language configuration for the Discord bot.
 *
 * This file contains all English text strings used throughout the bot,
 * including command names, descriptions, and response messages.
 * It serves as the default locale and base template for other language files.
 *
 * @type {Object} English locale configuration
 * @property {Object} metadata - Language metadata information
 * @property {Object} commands - Command names and descriptions
 * @property {Object} responses - Bot response messages
 */
export default {
	/**
	 * Language metadata and configuration.
	 * @type {Object}
	 * @property {Object} translators - Translator information with roles
	 * @property {Object} formatting - Cultural and formatting preferences
	 */
	metadata: {
		name: "English",
		nativeName: "English",
		emoji: "🇺🇸",
		code: "en",
		translators: {
			lead: "JustWolf",
			contributors: [],
			reviewers: ["JustWolf"],
			maintainer: "JustWolf",
		},
		formatting: {
			dateFormat: "MM/DD/YYYY",
			timeFormat: "12h",
			numberFormat: "en-US",
		},
	},
	/**
	 * Command localization strings.
	 * @type {Object}
	 */
	commands: {
		ping: {
			name: "ping",
			description: "Pong!",
		},
	},
	/**
	 * Bot response messages.
	 * @type {Object}
	 */
	responses: {
		ping: {
			reply: "Pong!",
		},
	},
};
