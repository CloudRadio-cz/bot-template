import { Logger } from '@/utils/Logger.ts';
import { dirname, importx } from '@discordx/importer'
import { IntentsBitField } from "discord.js";
import { CustomClient } from "@/classes/CustomClient.ts";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import chalk from 'chalk'

export class BotClient {
  private static _client: CustomClient;

  static get client() {
    return this._client;
  }

  static async isDBAlive(): Promise<boolean> {
    try {
      await this._client.db.query("RETURN true");
      return true;
    } catch (_e) {
      return false;
    }
  }

  static async connectDB(): Promise<boolean> {
    try {
      await this._client.db.connect(Deno.env.get('SURREALDB_URL') as string);
      await this._client.db.use({
        namespace: Deno.env.get('SURREALDB_NAMESPACE') as string,
        database: Deno.env.get('SURREALDB_DATABASE') as string,
      });
      await this._client.db.signin({
        username: Deno.env.get('SURREALDB_USERNAME') as string,
        password: Deno.env.get('SURREALDB_PASSWORD') as string,
      });
      Logger.success(`Connected to SurrealDB!\n${chalk.gray("📁 Namespace")}: ${chalk.yellow(Deno.env.get("SURREALDB_NAMESPACE"))}\n${chalk.gray("📦 Database")}: ${chalk.yellow(Deno.env.get("SURREALDB_DATABASE"))}`);
      return true;
    } catch (e) {
      Logger.error(JSON.stringify(e));
      return false;
    }
  }

  static async start() {
    const _client = new CustomClient({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      silent: true,
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS
    });
    await importx(dirname(import.meta.url) + '/{events,commands}/**/*.{ts,js}');
     _client.cluster = new ClusterClient(_client);
    await _client.login(Deno.env.get('BOT_TOKEN') as string);
    await this.connectDB();
  }
}

BotClient.start();