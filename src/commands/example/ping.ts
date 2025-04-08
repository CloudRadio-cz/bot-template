import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { t } from "@/lang/index.ts";

@Discord()
export class Ping {
  @Slash({ name: "ping", description: 'Pong!' })
  ping(interaction: CommandInteraction) {
      return interaction.reply(t("ping.reply", "en"));
  }
}