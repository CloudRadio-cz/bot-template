import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";
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
      if(!await client.isDBAlive()) return console.log(await client.connectDB())
  }
}