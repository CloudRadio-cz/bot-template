import { commandLogger } from "@/middlewares/CommandLogger";

/**
 * Middleware Registry
 *
 * Centralized export of all available middlewares for the bot.
 * This object contains all middleware functions that can be applied
 * to commands or other bot interactions.
 *
 * Current middlewares:
 * - commandLogger: Logs command execution details for audit purposes
 *
 * @type {Object} Collection of middleware functions
 */
export const middlewares = {
	commandLogger,
};
