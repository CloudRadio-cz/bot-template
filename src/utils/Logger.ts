import chalk from "chalk";

/**
 * A utility class for formatted console logging with different log levels and styling.
 * Provides methods for info, success, warning, error, debug, and command logging.
 */
export class Logger {
  /**
   * Gets the current timestamp in local time format.
   * @private
   * @returns {string} Formatted timestamp
   */
  private static getTimestamp(): string {
    return new Date().toLocaleTimeString();
  }

  /**
   * Formats a log message with timestamp, level, and styling.
   * @private
   * @param {string} level - The log level (e.g., INFO, ERROR)
   * @param {string} message - The message to format
   * @returns {string} Formatted log message
   */
  private static formatMessage(level: string, message: string): string {
    const timestamp = chalk.gray.bold(`⌚ ${this.getTimestamp()}`);
    const separator = chalk.gray(" │ ");
    const arrow = chalk.gray.bold("❱");
    const prefix = `${timestamp}${separator}${level} ${arrow} `;

    const visiblePrefix = prefix.replace(
      // deno-lint-ignore no-control-regex
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
   * Logs an informational message.
   * @param {string} message - The message to log
   */
  static info(message: string): void {
    console.log(
      this.formatMessage(
        chalk.blue("INFO"),
        chalk.white(message),
      ),
    );
  }

  /**
   * Logs a success message.
   * @param {string} message - The message to log
   */
  static success(message: string): void {
    console.log(
      this.formatMessage(
        chalk.green("SUCCESS"),
        chalk.white(message),
      ),
    );
  }

  /**
   * Logs a warning message.
   * @param {string} message - The message to log
   */
  static warn(message: string): void {
    console.warn(
      this.formatMessage(
        chalk.yellow("WARN"),
        chalk.yellowBright(message),
      ),
    );
  }

  /**
   * Logs an error message.
   * @param {string} message - The message to log
   */
  static error(message: string): void {
    console.error(
      this.formatMessage(
        chalk.red("ERROR"),
        chalk.redBright(message),
      ),
    );
  }

  /**
   * Logs a debug message.
   * @param {string} message - The message to log
   */
  static debug(message: string): void {
    console.debug(
      this.formatMessage(
        chalk.magenta("DEBUG"),
        chalk.gray(message),
      ),
    );
  }

  /**
   * Logs a command execution with detailed information.
   * @param {Object} options - Command logging options
   * @param {string} [options.username] - Username of the command executor
   * @param {string} [options.userId] - ID of the command executor
   * @param {string} options.commandName - Name of the executed command
   * @param {string} [options.guildName] - Name of the guild where command was executed
   * @param {string} [options.guildId] - ID of the guild where command was executed
   * @param {number} [options.shardId] - ID of the shard handling the command
   * @param {number} [options.clusterId] - ID of the cluster handling the command
   */
  static command(options: {
    username?: string;
    userId?: string;
    commandName: string;
    guildName?: string;
    guildId?: string;
    shardId?: number;
    clusterId?: number;
  }): void;
  /**
   * Logs a command execution with a simple message.
   * @param {string} message - Simple command message to log
   */
  static command(message: string): void;
  static command(
    messageOrOptions: string | {
      username?: string;
      userId?: string;
      commandName: string;
      guildName?: string;
      guildId?: string;
      shardId?: number;
      clusterId?: number;
    },
  ): void {
    if (typeof messageOrOptions === "string") {
      console.log(
        this.formatMessage(
          chalk.yellowBright("CMD"),
          chalk.white(messageOrOptions),
        ),
      );
    } else {
      const {
        username,
        userId,
        commandName,
        guildName,
        guildId,
        shardId,
        clusterId,
      } = messageOrOptions;
      const message = `${chalk.gray("👤 User")}: ${chalk.yellow(username)} (${
        chalk.yellow(userId)
      })\n${chalk.gray("🔧 Command")}: ${chalk.yellow(commandName)}\n${
        chalk.gray("🏠 Guild")
      }: ${chalk.yellow(guildName)} (${chalk.yellow(guildId)})\n${
        chalk.gray("♦️  Shard")
      }: ${chalk.yellow(shardId)} (${chalk.yellow(clusterId)})`;

      console.log(
        this.formatMessage(
          chalk.yellowBright("CMD"),
          chalk.white(message),
        ),
      );
    }
  }
}
