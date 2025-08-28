import chalk from "chalk";
import { createEvent } from "seyfert";

/**
 * Bot Ready Event Handler
 *
 * This event is triggered when the bot successfully connects to Discord
 * and is ready to receive and process commands. It handles the initial
 * setup tasks that need to be performed once the bot is online.
 *
 * @returns {Object} Event configuration object with handler function
 */
export default createEvent({
	data: {
		name: "botReady",
		once: true,
	},
	/**
	 * Executes when the bot becomes ready.
	 *
	 * This function:
	 * - Uploads all registered commands to Discord's API
	 * - Logs a success message indicating the bot is fully initialized
	 *
	 * @async
	 * @param {Object} user - The bot user object from Discord
	 * @param {Object} client - The Seyfert client instance
	 * @returns {Promise<void>} A promise that resolves when initialization is complete
	 */
	async run(user, client) {
		await client.uploadCommands({
			cachePath: process.env.COMMANDS_PATH || "./commands.json",
		});
		client.logger.success(`${chalk.yellowBright(user.username)} fully initialized!`);
	},
});
