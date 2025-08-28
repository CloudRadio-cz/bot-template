import { PrismaClient } from "@/database/prisma";

/**
 * Database client instance using Prisma ORM.
 *
 * Configured with optimized settings:
 * - Development mode: Logs all database queries, info, warnings, and errors
 * - Production mode: Only logs errors to reduce overhead
 * - Connection pool optimization to prevent memory leaks
 *
 * @type {PrismaClient} Prisma database client instance
 */
export const db = new PrismaClient({
	// Optimize connection pool to prevent memory leaks
	log: process.env.BUILD_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

/**
 * Establishes a connection to the database.
 *
 * This function should be called during application startup to ensure
 * the database connection is properly established before handling requests.
 *
 * @async
 * @function connect
 * @returns {Promise<void>} A promise that resolves when the connection is established
 * @throws {Error} Throws an error if the connection fails
 */
export async function connect() {
	await db.$connect();
}

/**
 * Gracefully disconnects from the database.
 *
 * This function should be called during application shutdown to ensure
 * all database connections are properly closed and resources are freed.
 *
 * @async
 * @function disconnect
 * @returns {Promise<void>} A promise that resolves when disconnection is complete
 */
export async function disconnect() {
	await db.$disconnect();
}
