import { Logger } from "@/utils/Logger.ts";
import { type ArgsOf, Discord, On } from "discordx";
import type { CustomClient } from "@/client.ts";

/**
 * Handles Discord interaction events.
 * Processes commands and logs command executions.
 */
@Discord()
export class InteractionCreate {
	/**
	 * Event handler for the 'interactionCreate' event.
	 * Executes the interaction and logs command details if it's a chat input command.
	 * @param {ArgsOf<"interactionCreate">} [interaction] - The interaction event data
	 * @param {CustomClient} client - The Discord client instance
	 */
	@On({ event: "interactionCreate" })
	onInteractionCreate(
		[interaction]: ArgsOf<"interactionCreate">,
		client: CustomClient,
	) {
		client.executeInteraction(interaction);
		if (interaction.isChatInputCommand()) {
			Logger.command({
				username: interaction.member?.user.username,
				userId: interaction.member?.user.id,
				commandName: interaction.commandName,
				guildName: interaction.guild?.name,
				guildId: interaction.guildId!,
				shardId: interaction.guild?.shardId,
				clusterId: client.cluster?.id,
			});
		}
	}
}
