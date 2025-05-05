import chalk from "chalk";
import { Discord, Once } from "discordx";
import { CustomClient } from "@/client.ts";
import { Logger } from "@/utils/Logger.ts";

/**
 * Handles the Discord client ready event.
 * Initializes application commands and logs successful login.
 */
@Discord()
export class ReadyEvent {
  /**
   * Event handler for the 'ready' event.
   * Initializes application commands and logs the bot's username.
   * @param {[CustomClient]} [client] - The Discord client instance
   * @returns {Promise<void>}
   */
  @Once({ event: "ready" })
  async onReady(
    [client]: [CustomClient],
  ): Promise<void> {
    await client.initApplicationCommands();
    Logger.success(
      `Logged in as ${chalk.yellowBright(client.user?.username)}!`,
    );
  }
}
