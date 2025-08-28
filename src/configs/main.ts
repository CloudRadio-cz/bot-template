import { emojis } from "./emojis";
import { colors } from "./colors";

/**
 * Main bot configuration object.
 *
 * Centralizes all bot configuration settings including metadata,
 * developer information, server settings, and visual elements.
 * This configuration is used throughout the bot for various
 * functionality and customization.
 *
 * @type {Object} Bot configuration object
 * @property {string} name - The bot's display name
 * @property {string} version - Current bot version
 * @property {Object} colors - Color configuration from ./colors
 * @property {string} owner - Discord user ID of the bot owner
 * @property {string[]} developers - Array of Discord user IDs for developers
 * @property {string[]} devGuild - Array of Discord guild IDs for development servers
 * @property {Object} emojis - Emoji configuration from ./emojis
 */
export const config = {
	name: "Bot Template", // Bot display name
	version: "v1.0.0", // Current bot version
	colors, // Color palette configuration
	owner: "", // Discord user ID of the bot owner
	developers: [""], // Discord user IDs of authorized developers
	devGuild: [""], // Discord guild IDs for development/testing servers
	emojis, // Emoji collection configuration
};
