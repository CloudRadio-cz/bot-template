import { createMiddleware } from "seyfert";
import chalk from "chalk";

/**
 * Command Logger Middleware
 *
 * This middleware logs detailed information about command executions,
 * including who executed the command, which command was used, and
 * where it was executed (guild context if applicable).
 *
 * The middleware provides comprehensive audit logging for command usage,
 * which is useful for monitoring bot activity and debugging.
 *
 * @type {import("seyfert").Middleware<void>}
 */
export const commandLogger = createMiddleware<void>(async (middle) => {
	/**
	 * Logs command execution details.
	 *
	 * For chat-based interactions, this logs:
	 * - User's global name and ID who executed the command
	 * - The full command name that was executed
	 * - Guild name and ID (if executed in a guild context)
	 *
	 * @param {Object} middle - Middleware context object
	 * @param {Object} middle.context - Command context
	 * @param {Function} middle.next - Function to pass control to next middleware
	 */

	if (middle.context.isChat()) {
		middle.context.client.logger.cmd(
			`${chalk.yellowBright(middle.context.author.globalName)}(${chalk.yellowBright(
				middle.context.author.id,
			)}) used ${chalk.yellowBright(`/${middle.context.resolver.fullCommandName}`)}${
				middle.context.inGuild()
					? ` on ${chalk.yellowBright(
							(await middle.context.guild()).name,
						)}(${chalk.yellowBright(middle.context.guildId)})`
					: ""
			}`,
		);
	}

	// Pass control to the next middleware in the chain
	middle.next();
});
