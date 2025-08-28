import { Command, Middlewares, type CommandContext, Declare, LocalesT } from "seyfert";

/**
 * Ping command that responds with "Pong!" to test bot responsiveness.
 *
 * This command serves as a simple health check for the bot, allowing users
 * to verify that the bot is online and responding to commands. It uses
 * localized responses based on the user's or guild's preferred language.
 */
@Declare({
	name: "ping",
	description: "Pong!",
	contexts: ["Guild"],
})
@Middlewares(["commandLogger"])
@LocalesT("commands.ping.name", "commands.ping.description")
export default class PingCommand extends Command {
	/**
	 * Executes the ping command.
	 *
	 * Retrieves the appropriate localized response and sends it back to the user.
	 * The response language is determined by the user's or guild's preferred locale,
	 * falling back to the default locale (English) if none is set.
	 *
	 * @async
	 * @param {CommandContext} ctx - The command context containing user, guild, and interaction data
	 * @returns {Promise<void>} A promise that resolves when the response is sent
	 */
	async run(ctx: CommandContext) {
		// Either fetch the preferred locale of the user/guild and put it inside .get()
		// Or leave empty to use the default locale (English by default)
		const t = ctx.t.get();
		await ctx.editOrReply({ content: t.responses.ping.reply });
	}
}
