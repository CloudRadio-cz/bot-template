# Discord Bot Template with SurrealDB

A modern Discord bot template built with Deno, Discord.js, and SurrealDB integration. This template provides a solid foundation for creating Discord bots with database persistence.

## Features

- 🚀 Built with Deno for enhanced security and performance
- 💾 SurrealDB integration for flexible data storage
- 🔄 Discord Hybrid Sharding for scalability
- 🧩 Command handler using decorators with discordx
- 📝 TypeScript support for better code quality
- 🎨 Beautiful console logging with chalk

## Prerequisites

- [Deno](https://deno.land/) (v1.37.0 or higher)
- [SurrealDB](https://surrealdb.com/) (v1.0.0 or higher)
- Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/bot-template.git
   cd bot-template
   ```

2. Create a `.env` file based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your Discord bot token and SurrealDB credentials.

## Setting up SurrealDB

### Installing SurrealDB

#### Option 1: Using the installer

Download and install SurrealDB from the [official website](https://surrealdb.com/install).

#### Option 2: Using Docker

```bash
docker run --name surrealdb -p 3000:3000 surrealdb/surrealdb:latest start --user root --pass root --auth
```

### Starting SurrealDB

Start SurrealDB with the following command:

```bash
surrealdb start --user root --pass root --bind 127.0.0.1:3000 rocksdb:main.db
```

By default, SurrealDB will run on `http://127.0.0.1:3000/rpc`.

### Configuring the Bot to Use SurrealDB

Update your `.env` file with the appropriate SurrealDB credentials:

```
BOT_TOKEN=your_discord_bot_token
SURREALDB_URL="http://127.0.0.1:3000/rpc"
SURREALDB_NAMESPACE="your_namespace"
SURREALDB_DATABASE="your_database"
SURREALDB_USERNAME="root"
SURREALDB_PASSWORD="root"
```

## Running the Bot

Start the bot in development mode:

```bash
deno task dev
```

This will start the bot with hot reloading enabled.

## Project Structure

```
├── .env.example        # Example environment variables
├── deno.json           # Deno configuration
├── main.ts             # Entry point for the bot
└── src/
    ├── client.ts       # Custom Discord client with SurrealDB integration
    ├── commands/        # Bot commands
    │   └── example/     # Example commands
    ├── events/          # Discord event handlers
    └── utils/           # Utility functions
        └── Logger.ts    # Custom logger
```

## Creating Commands

Commands are created using decorators from discordx. Here's an example ping command:

```typescript
import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";

@Discord()
export class Ping {
  @Slash({ name: "ping", description: 'Ping!' })
  async ping(interaction: CommandInteraction, client: CustomClient) {
    await interaction.reply('Pong!');
  }
}
```

## Using SurrealDB in Commands

You can access the SurrealDB instance through the client object:

```typescript
import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";

interface User {
  username: string;
  email: string;
  [key: string]: unknown;
}

@Discord()
export class UserCommand {
  @Slash({ name: "create-user", description: 'Create a new user' })
  async createUser(interaction: CommandInteraction, client: CustomClient) {
    // Check if DB is connected
    if(!await client.isDBAlive()) {
      await client.connectDB();
    }
    
    // Create a new user
    const user: User = {
      username: "example",
      email: "example@example.com"
    };
    
    const result = await client.db.create("user", user);
    await interaction.reply(`User created: ${JSON.stringify(result)}`);
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.