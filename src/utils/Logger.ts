import chalk from "chalk";

export class Logger {
  private static getTimestamp(): string {
    return new Date().toLocaleTimeString();
  }

  private static formatMessage(level: string, message: string): string {
    const timestamp = chalk.gray.bold(`⌚ ${this.getTimestamp()}`);
    const separator = chalk.gray(' │ ');
    const prefix = `${timestamp}${separator}${level} ${chalk.gray.bold("❱")} `;
    const indentLength = Math.max(0, prefix.length - 57);
    const indent = ' '.repeat(indentLength);
    
    const lines = message.split('\n');
    const decoratedLines = lines.map((line, index) => {
      const linePrefix = index === 0 ? prefix : indent;
      return `${linePrefix}${line}`;
    });
    
    return `${decoratedLines.join('\n')}`;
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

  static command(message: string): void {
    console.log(
      this.formatMessage(
        chalk.yellowBright("CMD"),
        chalk.white(message)
      )
    );
  }
}