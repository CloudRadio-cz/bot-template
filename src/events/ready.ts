import chalk from 'chalk';
import { Discord, Once } from "discordx";
import { CustomClient } from "@/client.ts";
import { Logger } from "@/utils/Logger.ts";

@Discord()
export class ReadyEvent {
  @Once({ event: "ready" })
  async onReady(
    [client]: [CustomClient],
  ): Promise<void> {
    await client.initApplicationCommands();
    Logger.success(`Logged in as ${chalk.yellowBright(client.user?.username)}!`);
  }
}