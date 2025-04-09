import chalk from "chalk";

export class Logger {
  private static getTimestamp(): string {
    return new Date().toLocaleTimeString();
  }

  private static formatMessage(level: string, message: string): string {
    const timestamp = chalk.gray.bold(`⌚ ${this.getTimestamp()}`);
    const separator = chalk.gray(' │ ');
    const arrow = chalk.gray.bold("❱");
    const prefix = `${timestamp}${separator}${level} ${arrow} `;
  
    const visiblePrefix = prefix.replace(
      // deno-lint-ignore no-control-regex
      /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g,
      ''
    );
    const indent = ' '.repeat(visiblePrefix.length + 1);
  
    const lines = message.split('\n');
    const decoratedLines = lines.map((line, index) => {
      const linePrefix = index === 0 ? prefix : indent;
      return `${linePrefix}${line}`;
    });
  
    return decoratedLines.join('\n');
  }
  

  static info(message: string): void {
    console.log(
      this.formatMessage(
        chalk.blue("INFO"),
        chalk.white(message)
      )
    );
  }

  static success(message: string): void {
    console.log(
      this.formatMessage(
        chalk.green("SUCCESS"),
        chalk.white(message)
      )
    );
  }

  static warn(message: string): void {
    console.warn(
      this.formatMessage(
        chalk.yellow("WARN"),
        chalk.yellowBright(message)
      )
    );
  }

  static error(message: string): void {
    console.error(
      this.formatMessage(
        chalk.red("ERROR"),
        chalk.redBright(message)
      )
    );
  }

  static debug(message: string): void {
    console.debug(
      this.formatMessage(
        chalk.magenta("DEBUG"),
        chalk.gray(message)
      )
    );
  }

  static command(options: {
    username?: string;
    userId?: string;
    commandName: string;
    guildName?: string;
    guildId?: string;
    shardId?: number;
    clusterId?: number;
  }): void;
  static command(messageOrOptions: string | {
    username?: string;
    userId?: string;
    commandName: string;
    guildName?: string;
    guildId?: string;
    shardId?: number;
    clusterId?: number;
  }): void {
    if (typeof messageOrOptions === 'string') {
      console.log(
        this.formatMessage(
          chalk.yellowBright("CMD"),
          chalk.white(messageOrOptions)
        )
      );
    } else {
      const { username, userId, commandName, guildName, guildId, shardId, clusterId } = messageOrOptions;
      const message = `${chalk.gray("👤 User")}: ${chalk.yellow(username)} (${chalk.yellow(userId)})\n${chalk.gray("🔧 Command")}: ${chalk.yellow(commandName)}\n${chalk.gray("🏠 Guild")}: ${chalk.yellow(guildName)} (${chalk.yellow(guildId)})\n${chalk.gray("♦️  Shard")}: ${chalk.yellow(shardId)} (${chalk.yellow(clusterId)})`;
      
      console.log(
        this.formatMessage(
          chalk.yellowBright("CMD"),
          chalk.white(message)
        )
      );
    }
  }
}