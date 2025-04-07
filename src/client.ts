import { Logger } from '@/utils/Logger.ts';
import { dirname, importx } from '@discordx/importer'
import { IntentsBitField } from "discord.js";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import chalk from 'chalk'
import { Client, ClientOptions } from "discordx";
import { Surreal } from "@surrealdb/surrealdb";

export class CustomClient extends Client {
  private static _instance: CustomClient;
  public cluster?: ClusterClient<CustomClient>;
  public db: Surreal;

  private constructor(options: ClientOptions) {
    super(options);
    this.db = new Surreal();
  }

  static getInstance(): CustomClient {
    return this._instance;
  }

  public async isDBAlive(): Promise<boolean> {
    try {
      await this.db.query("RETURN true");
      return true;
    } catch (_e) {
      Logger.error("Database health check failed");
      return false;
    }
  }

  public async connectDB(): Promise<boolean> {
    const {
      SURREALDB_URL,
      SURREALDB_NAMESPACE,
      SURREALDB_DATABASE,
      SURREALDB_USERNAME,
      SURREALDB_PASSWORD
    } = Deno.env.toObject();

    try {
      await this.db.connect(SURREALDB_URL);
      await this.db.use({
        namespace: SURREALDB_NAMESPACE,
        database: SURREALDB_DATABASE,
      });
      await this.db.signin({
        username: SURREALDB_USERNAME,
        password: SURREALDB_PASSWORD,
      });

      Logger.success(
        `Connected to SurrealDB!\n${chalk.gray("📁 Namespace")}: ${chalk.yellow(SURREALDB_NAMESPACE)}\n${chalk.gray("📦 Database")}: ${chalk.yellow(SURREALDB_DATABASE)}`
      );
      return true;
    } catch (error) {
      Logger.error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }

  static async initialize(): Promise<void> {
    if (this._instance) {
      throw new Error('CustomClient is already initialized');
    }

    const client = new CustomClient({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      silent: true,
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS
    });

    this._instance = client;

    try {
      await importx(dirname(import.meta.url) + '/{events,commands}/**/*.{ts,js}');
      client.cluster = new ClusterClient(client);
      
      await this._instance.connectDB();

      await client.login(Deno.env.get('BOT_TOKEN') as string);
      Logger.success('Bot successfully initialized and logged in');
    } catch (error) {
      Logger.error(`Initialization failed: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}

// Initialize the bot
CustomClient.initialize()