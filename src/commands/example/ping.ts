import { Discord, Slash } from "discordx";
import type { CommandInteraction } from "discord.js";
import { t } from "@/lang/index.ts";

/**
 * Example command that demonstrates basic slash command functionality.
 * Responds with a localized "pong" message.
 */
@Discord()
export class Ping {
	/**
	 * Handles the /ping slash command.
	 * Responds with a localized message using the Czech language.
	 * @param {CommandInteraction} interaction - The command interaction
	 * @returns {Promise<void>}
	 */
	@Slash({ name: "ping", description: "Pong!" })
	ping(interaction: CommandInteraction) {
		return interaction.reply(t("ping.reply", "cs"));
	}
}
