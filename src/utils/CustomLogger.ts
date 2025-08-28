import chalk from "chalk";
import { Logger } from "seyfert";
import { LogLevels } from "seyfert/lib/common/index.js";

/**
 * Formats memory usage data into a human-readable string.
 *
 * Converts bytes to the most appropriate unit (B, KB, MB, GB, TB) for readability.
 *
 * Borrowed from https://github.com/Ganyu-Studios/stelle-music/blob/13e55170517b87b5e700e84c0c134dccc89a3f66/src/structures/utils/functions/logger.ts#L42
 *
 * @param {number} bytes - The memory usage data in bytes
 * @returns {string} The formatted memory usage string with appropriate unit
 * @example
 * formatMemoryUsage(1024) // "1.00KB"
 * formatMemoryUsage(1536000) // "1.46MB"
 */
export function formatMemoryUsage(bytes: number): string {
	const units = ["B", "KB", "MB", "GB", "TB"];
	let i = 0;

	while (bytes >= 1024 && i < units.length - 1) {
		bytes /= 1024;
		i++;
	}

	return `${bytes.toFixed(2)}${units[i]}`;
}

/**
 * Formats a log message with timestamp, memory usage, and level styling.
 *
 * Creates a consistently formatted log message that includes:
 * - Timestamp with timezone support
 * - Current RAM usage
 * - Log level with appropriate styling
 * - Proper indentation for multi-line messages
 *
 * @param {string} level - The styled log level string
 * @param {string} [message=""] - The message to format
 * @returns {string} The formatted log message with styling and metadata
 */
function formatMessage(level: string, message: string = ""): string {
	const now = new Date();
	const timestamp = chalk.gray.bold(
		`⌚ ${now.toLocaleDateString("en-US", { timeZone: process.env.TIME_ZONE ?? "UTC" })} │ ${now.toLocaleTimeString(
			"en-US",
			{
				timeZone: process.env.TIME_ZONE ?? "UTC",
			},
		)}`,
	);
	const ramUsage = chalk.gray.bold(`RAM: ${chalk.magentaBright(formatMemoryUsage(process.memoryUsage().rss))}`);
	const separator = chalk.gray(" │ ");
	const arrow = chalk.gray.bold("❱");
	const prefix = `${timestamp}${separator}${ramUsage}${separator}${level} ${arrow}`;

	const visiblePrefix = prefix.replace(
		// biome-ignore lint/suspicious/noControlCharactersInRegex: shut
		/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g,
		"",
	);
	const indent = " ".repeat(visiblePrefix.length + 1);

	const lines = message.split("\n");
	const decoratedLines = lines.map((line, index) => {
		const linePrefix = index === 0 ? prefix : indent;
		return `${linePrefix}${line}`;
	});

	return decoratedLines.join("\n");
}

/**
 * Custom logger levels enumeration.
 *
 * Extends the standard logging levels with bot-specific levels
 * for better categorization of different types of log messages.
 *
 * @enum {number}
 */
export enum LoggerLevels {
	Debug = 0,
	Info = 1,
	Success = 2,
	CMD = 3,
	DB = 4,
	Warn = 5,
	Error = 6,
	Fatal = 7,
}

/**
 * Maps custom logger levels to Seyfert's built-in log levels.
 *
 * This mapping allows custom log levels to be properly handled
 * by Seyfert's logging system while maintaining backward compatibility.
 *
 * @type {Record<LoggerLevels, LogLevels>}
 */
export const SeyfertLogLevelMap = {
	[LoggerLevels.Debug]: LogLevels.Debug,
	[LoggerLevels.Info]: LogLevels.Info,
	[LoggerLevels.Success]: LogLevels.Info, // Use Info level for Success
	[LoggerLevels.CMD]: LogLevels.Info, // Use Info level for CMD
	[LoggerLevels.DB]: LogLevels.Info, // Use Info level for DB
	[LoggerLevels.Warn]: LogLevels.Warn,
	[LoggerLevels.Error]: LogLevels.Error,
	[LoggerLevels.Fatal]: LogLevels.Fatal,
};

/**
 * Custom logger function that provides enhanced formatting and styling.
 *
 * This function replaces Seyfert's default logger with a custom implementation
 * that includes timestamps, memory usage, color-coded levels, and better formatting.
 * It supports both standard Seyfert log levels and custom extended levels.
 *
 * Heavily inspired by https://github.com/Ganyu-Studios/stelle-music/blob/13e55170517b87b5e700e84c0c134dccc89a3f66/src/structures/utils/functions/logger.ts#L128
 *
 * @param {Logger} _this - The logger instance (unused but required by Seyfert)
 * @param {LogLevels} level - The Seyfert log level
 * @param {unknown[]} args - Arguments to log
 * @returns {unknown[]} Modified arguments with custom formatting
 */
export function customLogger(_this: Logger, level: LogLevels, args: unknown[]): unknown[] {
	const customLevel = getCurrentCustomLevel();

	let label: string;
	let colorLevel: LoggerLevels;

	if (customLevel !== null) {
		// Use custom level labels
		switch (customLevel) {
			case LoggerLevels.Success:
				label = "SUCCESS";
				colorLevel = LoggerLevels.Success;
				break;
			case LoggerLevels.CMD:
				label = "CMD";
				colorLevel = LoggerLevels.CMD;
				break;
			case LoggerLevels.DB:
				label = "DB";
				colorLevel = LoggerLevels.DB;
				break;
			default:
				label = Logger.prefixes.get(level) ?? "UNKNOWN";
				colorLevel = customLevel;
		}
		clearCustomLevel(); // Clear after use
	} else {
		// Use standard seyfert level
		label = Logger.prefixes.get(level) ?? "UNKNOWN";
		// Map seyfert levels to our color levels
		switch (level) {
			case LogLevels.Debug:
				colorLevel = LoggerLevels.Debug;
				break;
			case LogLevels.Info:
				colorLevel = LoggerLevels.Info;
				break;
			case LogLevels.Warn:
				colorLevel = LoggerLevels.Warn;
				break;
			case LogLevels.Error:
				colorLevel = LoggerLevels.Error;
				break;
			case LogLevels.Fatal:
				colorLevel = LoggerLevels.Fatal;
				break;
			default:
				colorLevel = LoggerLevels.Info;
		}
	}

	const colors: Record<LoggerLevels, typeof chalk> = {
		[LoggerLevels.Debug]: chalk.gray.bold,
		[LoggerLevels.Error]: chalk.red.bold,
		[LoggerLevels.Info]: chalk.blue.bold,
		[LoggerLevels.Success]: chalk.green.bold,
		[LoggerLevels.CMD]: chalk.yellow.bold,
		[LoggerLevels.DB]: chalk.magenta.bold,
		[LoggerLevels.Warn]: chalk.yellow.bold,
		[LoggerLevels.Fatal]: chalk.red.bold,
	};

	const text = formatMessage(colors[colorLevel](label));

	return [text, ...args];
}

/**
 * Tracks the current custom log level for extended logging functionality.
 *
 * This variable maintains state for custom log levels that aren't part
 * of Seyfert's standard log levels (SUCCESS, CMD, DB).
 *
 * @type {LoggerLevels | null}
 */
let currentCustomLevel: LoggerLevels | null = null;

/**
 * Sets the current custom log level.
 *
 * Used internally to track when custom log levels are being used
 * so the logger can apply appropriate styling and labels.
 *
 * @param {LoggerLevels} level - The custom log level to set
 */
export function setCustomLevel(level: LoggerLevels) {
	currentCustomLevel = level;
}

/**
 * Gets the current custom log level.
 *
 * @returns {LoggerLevels | null} The current custom log level, or null if none is set
 */
export function getCurrentCustomLevel(): LoggerLevels | null {
	return currentCustomLevel;
}

/**
 * Clears the current custom log level.
 *
 * Resets the custom level tracking back to null after use.
 */
export function clearCustomLevel() {
	currentCustomLevel = null;
}

/**
 * Creates a new logger instance with predefined configuration.
 *
 * Creates a logger with file saving enabled and active status set to true.
 *
 * @param {string} name - The name for the logger instance
 * @returns {Logger} A new configured Logger instance
 */
export const createLogger = (name: string): Logger => new Logger({ name, saveOnFile: true, active: true });

/**
 * Extends the Logger prototype with custom logging methods.
 *
 * These methods provide additional logging levels beyond Seyfert's defaults:
 * - success: For successful operations (green styling)
 * - cmd: For command executions (yellow styling)
 * - db: For database operations (magenta styling)
 */

/**
 * Logs a success message with green styling.
 *
 * @param {...any} args - Arguments to log
 */
Logger.prototype.success = function (...args: any[]): void {
	setCustomLevel(LoggerLevels.Success);
	this.rawLog(SeyfertLogLevelMap[LoggerLevels.Success], ...args);
};

/**
 * Logs a command execution message with yellow styling.
 *
 * @param {...any} args - Arguments to log
 */
Logger.prototype.cmd = function (...args: any[]): void {
	setCustomLevel(LoggerLevels.CMD);
	this.rawLog(SeyfertLogLevelMap[LoggerLevels.CMD], ...args);
};

/**
 * Logs a database operation message with magenta styling.
 *
 * @param {...any} args - Arguments to log
 */
Logger.prototype.db = function (...args: any[]): void {
	setCustomLevel(LoggerLevels.DB);
	this.rawLog(SeyfertLogLevelMap[LoggerLevels.DB], ...args);
};
