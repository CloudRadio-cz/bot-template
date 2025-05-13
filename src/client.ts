import { Logger } from "@/utils/Logger.ts";
import { dirname, importx } from "@discordx/importer";
import { IntentsBitField } from "discord.js";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import chalk from "chalk";
import { Client, type ClientOptions } from "discordx";
import { SurrealORM } from "@surrealorm/orm";
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
	 * @type {SurrealORM}
	 */
	public db: SurrealORM;

	/**
	 * Private constructor for singleton pattern.
	 * @param {ClientOptions} options - Discord client options.
	 */
	private constructor(options: ClientOptions) {
		super(options);
		this.db = new SurrealORM({
			url: Deno.env.get("SURREALDB_URL") as string,
			namespace: Deno.env.get("SURREALDB_NAMESPACE") as string,
			database: Deno.env.get("SURREALDB_DATABASE") as string,
			username: Deno.env.get("SURREALDB_USERNAME") as string,
			password: Deno.env.get("SURREALDB_PASSWORD") as string,
		});
	}

	/**
	 * Returns the singleton instance of CustomClient.
	 * @returns {CustomClient}
	 */
	static getInstance(): CustomClient {
		return CustomClient._instance;
	}

	/**
	 * Checks if the database connection is alive.
	 * @returns {Promise<boolean>} True if DB is alive, false otherwise.
	 */
	public async isDBAlive(): Promise<boolean> {
		return await this.db.isConnected();
	}

	/**
	 * Connects to SurrealDB using environment variables.
	 * @returns {Promise<boolean>} True if connection is successful, false otherwise.
	 */
	public async connectDB(): Promise<boolean> {
		try {
			await this.db.connect("namespace");

			Logger.success(
				`Connected to SurrealDB!\n${chalk.gray("\ud83d\udcc1 Namespace")}: ${chalk.yellow(
					Deno.env.get("SURREALDB_NAMESPACE") as string,
				)}\n${chalk.gray("\ud83d\udce6 Database")}: ${chalk.yellow(
					Deno.env.get("SURREALDB_DATABASE") as string,
				)}`,
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
		if (CustomClient._instance) {
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

		CustomClient._instance = client;

		try {
			await importx(
				`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`,
			);
			client.cluster = new ClusterClient(client);

			await CustomClient._instance.connectDB();

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
