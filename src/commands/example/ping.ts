import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/classes/CustomClient.ts";
import { jsonify } from "@surrealdb/surrealdb";

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
      //if(!client.isDBAlive()) return interaction.reply('DB is not alive!')
      client.db.query('SELECT * FROM user')
      .then((res) => {
        console.log(res)
        interaction.reply('Pong!')
      })
  }
}