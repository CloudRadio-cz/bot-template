import { Logger } from '@/utils/Logger.ts';
import { ArgsOf, Discord, On } from "discordx";
import { CustomClient } from "@/client.ts";

@Discord()
export class InteractionCreate {
  @On({ event: "interactionCreate" })
  onInteractionCreate(
    [interaction]: ArgsOf<"interactionCreate">,
    client: CustomClient,
  ) {
    client.executeInteraction(interaction);
    if(interaction.isChatInputCommand()) {
        Logger.command({
            username: interaction.member?.user.username,
            userId: interaction.member?.user.id,
            commandName: interaction.commandName,
            guildName: interaction.guild?.name,
            guildId: interaction.guildId!,
            shardId: interaction.guild?.shardId,
            clusterId: client.cluster?.id
        });
    }
  }
}
