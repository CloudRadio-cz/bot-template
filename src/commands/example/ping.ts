import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";
import { t } from "@/lang/index.ts";

interface User {
  username: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

@Discord()
export class Ping {
  @Slash({ name: "ping", description: 'Ping!' })
  async ping(interaction: CommandInteraction, client: CustomClient) {
      if(!await client.isDBAlive()) return interaction.reply(t("db.error", "en", { username: interaction.member!.user.username, test: "test"}));
      return interaction.reply(t("ping.reply", "en"));
  }
}