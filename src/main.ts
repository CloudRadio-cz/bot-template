import { RedisAdapter } from "@slipher/redis-adapter";
import chalk from "chalk";
import { Client, Logger } from "seyfert";
import { customLogger } from "@/utils/CustomLogger";
import { connect, db } from "@db";
import { middlewares } from "@/middlewares";

/**
 * Main function that initializes and starts the Discord bot.
 *
 * This function:
 * - Creates a new Seyfert client instance
 * - Configures Redis cache adapter for caching
 * - Sets up middlewares and localization
 * - Connects to the MySQL database
 * - Starts the bot
 *
 * @async
 * @function main
 * @throws {Error} Exits the process if database connection fails
 */
async function main() {
	const client = new Client();

	client.setServices({
		cache: {
			adapter: new RedisAdapter({
				redisOptions: {
					url: process.env.REDIS_URL ?? "",
				},
				namespace: process.env.REDIS_NAMESPACE ?? "",
			}),
		},
		middlewares: middlewares,
		langs: {
			default: "en",
			aliases: {
				en: ["en-GB", "en-US"],
			},
		},
	});

	Logger.customize(customLogger);

	try {
		await connect();
		client.db = db;
		client.logger.db(`Connected to MySQL: \ud83d\udce6 ${chalk.yellow(process.env.DB_DATABASE ?? "")}!`);
	} catch (error) {
		client.logger.error("Failed to connect to the database!", chalk.red(error));
		process.exit(1);
	}

	await client.start();
}

main();
