import { Logger } from '@/utils/Logger.ts';
import { ArgsOf, Discord, On } from "discordx";
import { CustomClient } from "@/client.ts";
import chalk from "chalk";

@Discord()
export class InteractionCreate {
  @On({ event: "interactionCreate" })
  onInteractionCreate(
    [interaction]: ArgsOf<"interactionCreate">,
    client: CustomClient,
  ) {
    client.executeInteraction(interaction);
    if(interaction.isChatInputCommand()) {
        Logger.command(`${chalk.gray("👤 User")}: ${chalk.yellow(interaction.member?.user.username)} (${chalk.yellow(interaction.member?.user.id)})\n${chalk.gray("🔧 Command")}: ${chalk.yellow(interaction.commandName)}\n${chalk.gray("🏠 Guild")}: ${chalk.yellow(interaction.guild?.name)} (${chalk.yellow(interaction.guildId)})\n${chalk.gray("♦️ Shard")}: ${chalk.yellow(interaction.guild?.shardId)} (${chalk.yellow(client.cluster?.id)})`);
    }
  }
}
