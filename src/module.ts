import type { ParseClient, ParseLocales, ParseMiddlewares } from "seyfert";
import type { middlewares } from "./middlewares";
import type English from "@/langs/en";
import type { PrismaClient } from "@/database/prisma";

/**
 * Module augmentation for Seyfert framework.
 *
 * This file extends the Seyfert framework's TypeScript types to include:
 * - Custom client configuration
 * - Registered middlewares type safety
 * - Default locale configuration
 * - Extended logger methods for custom logging levels
 */
declare module "seyfert" {
	/**
	 * Interface for the bot client configuration.
	 * Extends the parsed client type with specific configurations.
	 */
	interface UsingClient extends ParseClient<Client<true>> {}

	/**
	 * Interface for the bot client.
	 * Extends the parsed client type with additional configurations.
	 */
	interface Client {
		db: PrismaClient;
	}

	/**
	 * Interface for registered middlewares.
	 * Provides type safety for all registered middleware functions.
	 */
	interface RegisteredMiddlewares extends ParseMiddlewares<typeof middlewares> {}

	/**
	 * Interface for the default locale configuration.
	 * Uses the English locale as the base type for all locales.
	 */
	interface DefaultLocale extends ParseLocales<typeof English> {}

	/**
	 * Extended Logger interface with custom logging methods.
	 */
	interface Logger {
		/**
		 * Logs a success message.
		 * @param args - Arguments to log
		 */
		success(...args: any[]): void;
		/**
		 * Logs a command execution message.
		 * @param args - Arguments to log
		 */
		cmd(...args: any[]): void;
		/**
		 * Logs a database operation message.
		 * @param args - Arguments to log
		 */
		db(...args: any[]): void;
	}
}
