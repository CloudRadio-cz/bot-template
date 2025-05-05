import { Logger } from "@/utils/Logger.ts";
import { dirname, importx } from "@discordx/importer";
import { IntentsBitField } from "discord.js";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import chalk from "chalk";
import { Client, ClientOptions } from "discordx";
import { Surreal } from "@surrealdb/surrealdb";
import { loadLocales } from "@/lang/index.ts";

/**
 * Custom Discord client with SurrealDB integration and cluster support.
 * Handles database connectivity, health checks, and bot initialization.
 * @extends Client
 */
export class CustomClient extends Client {
  /**
   * Singleton instance of CustomClient.
   * @type {CustomClient}
   */
  private static _instance: CustomClient;
  /**
   * Cluster client for sharding support.
   * @type {ClusterClient<CustomClient> | undefined}
   */
  public cluster?: ClusterClient<CustomClient>;
  /**
   * SurrealDB client instance.
   * @type {Surreal}
   */
  public db: Surreal;

  /**
   * Private constructor for singleton pattern.
   * @param {ClientOptions} options - Discord client options.
   */
  private constructor(options: ClientOptions) {
    super(options);
    this.db = new Surreal();
  }

  /**
   * Returns the singleton instance of CustomClient.
   * @returns {CustomClient}
   */
  static getInstance(): CustomClient {
    return this._instance;
  }

  /**
   * Checks if the database connection is alive.
   * @returns {Promise<boolean>} True if DB is alive, false otherwise.
   */
  public async isDBAlive(): Promise<boolean> {
    try {
      await this.db.query("RETURN true");
      return true;
    } catch (_e) {
      Logger.error("Database health check failed");
      return false;
    }
  }

  /**
   * Connects to SurrealDB using environment variables.
   * @returns {Promise<boolean>} True if connection is successful, false otherwise.
   */
  public async connectDB(): Promise<boolean> {
    const {
      SURREALDB_URL,
      SURREALDB_NAMESPACE,
      SURREALDB_DATABASE,
      SURREALDB_USERNAME,
      SURREALDB_PASSWORD,
    } = Deno.env.toObject();

    try {
      await this.db.connect(SURREALDB_URL, {
        namespace: SURREALDB_NAMESPACE,
      });
      await this.db.signin({
        username: SURREALDB_USERNAME,
        password: SURREALDB_PASSWORD,
        namespace: SURREALDB_NAMESPACE,
      });
      await this.db.use({
        database: SURREALDB_DATABASE,
      });

      Logger.success(
        `Connected to SurrealDB!\n${chalk.gray("\ud83d\udcc1 Namespace")}: ${
          chalk.yellow(SURREALDB_NAMESPACE)
        }\n${chalk.gray("\ud83d\udce6 Database")}: ${
          chalk.yellow(SURREALDB_DATABASE)
        }`,
      );
      return true;
    } catch (error) {
      Logger.error(
        `Database connection failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return false;
    }
  }

  /**
   * Initializes the CustomClient singleton, loads commands/events, connects DB, and logs in.
   * @throws {Error} If already initialized or initialization fails.
   * @returns {Promise<void>}
   */
  static async initialize(): Promise<void> {
    if (this._instance) {
      throw new Error("CustomClient is already initialized");
    }

    const client = new CustomClient({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildVoiceStates,
      ],
      silent: true,
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
    });

    this._instance = client;

    try {
      await importx(
        dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}",
      );
      client.cluster = new ClusterClient(client);

      await this._instance.connectDB();

      await client.login(Deno.env.get("BOT_TOKEN") as string);
      await loadLocales();
      Logger.success("Bot successfully initialized!");
    } catch (error) {
      Logger.error(
        `Initialization failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      throw error;
    }
  }
}

// Initialize the bot client.
CustomClient.initialize();
