# Discord Bot Template with SurrealDB

A modern Discord bot template built with Deno, Discord.js, and SurrealDB integration. This template provides a solid foundation for creating Discord bots with database persistence.

## Features

- 🚀 Built with Deno for enhanced security and performance
- 💾 SurrealDB integration for flexible data storage
- 🔄 Discord Hybrid Sharding for scalability
- 🧩 Command handler using decorators with discordx
- 🌐 Built-in translation system with support for multiple languages
- 📝 TypeScript support for better code quality
- 🎨 Beautiful console logging with chalk

## Prerequisites

- [Deno](https://deno.land/) (v2.0.0 or higher)
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

Check the official SurrealDB documentation for Docker installation instructions: [SurrealDB Docker Instructions](https://surrealdb.com/docs/surrealdb/installation/running/docker)

### Starting SurrealDB

#### Option 1: Manual startup

Start SurrealDB with the following command:

```bash
surrealdb start --user root --pass root --bind 127.0.0.1:3000 rocksdb:main.db
```

By default, SurrealDB will run on `http://127.0.0.1:3000/rpc`.

#### Option 2: Using Docker

Check the official SurrealDB documentation for Docker installation and running instructions: [SurrealDB Docker Instructions](https://surrealdb.com/docs/surrealdb/installation/running/docker)

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

### Development Mode

Start the bot in development mode:

```bash
deno task dev
```

This will start the bot with hot reloading enabled.

### Production Mode

Start the bot in production mode:

```bash
deno task start
```

This will start the bot without hot reloading.

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
    ├── lang/            # Translation files
    │   ├── cs.json      # Czech translations
    │   ├── en.json      # English translations
    │   └── index.ts     # Translation system implementation
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

For more information on creating command and or more advanced usage, refer to the official [discordx documentation](https://discordx.js.org/).

## Translation System

This template includes a built-in translation system that supports multiple languages. The system allows you to define translation keys in JSON files and use them in your code with variable substitution.

### How It Works

Translation files are stored in the `src/lang/` directory as JSON files (one per language). The system currently supports English (`en.json`) and Czech (`cs.json`). The translation system is automatically initialized when the bot starts up.

Each language file is a simple JSON object where:
- Keys are unique identifiers for text strings (e.g., `"ping.reply"`, `"user.welcome"`)  
- Values are the translated text for that language

Example of `en.json`:
```json
{
  "ping.reply": "🏓 Pong! Bot is alive!",
  "user.welcome": "Welcome, {username}!",
  "db.error": "❌ Database is not reachable. Please try again later."
}
```

Example of `cs.json`:
```json
{
  "ping.reply": "🏓 Pong! Bot je naživu!",
  "user.welcome": "Vítej, {username}!",
  "db.error": "❌ Databáze není dostupná. Zkuste to prosím později."
}
```

### Using Translations

To use translations in your code, import the `t` function from the language module:

```typescript
import { t } from "@/lang/index.ts";
```

Then use it to retrieve translated strings:

```typescript
// Basic usage (defaults to English)
t("ping.reply"); // Returns "🏓 Pong! Bot is alive!"

// Specify language
t("ping.reply", "cs"); // Returns "🏓 Pong! Bot je naživu!"

// With variable substitution
t("user.welcome", "en", { username: "John" }); // Returns "Welcome, John!"
```

### Variable Substitution

The translation system supports variable substitution using curly braces `{}`. For example:

```typescript
// English: "Welcome, {username}!"
t("user.welcome", "en", { username: "John" }); // Returns "Welcome, John!"

// Czech: "{username}, ❌ Databáze není dostupná. Zkuste {test2} to prosím později. {test}"
t("db.error", "cs", { 
  username: "John", 
  test: "value1",
  test2: "value2" 
}); // Returns "John, ❌ Databáze není dostupná. Zkuste value2 to prosím později. value1"
```

### Example in Commands

Here's how to use translations in a command:

```typescript
import { Discord, Slash } from 'discordx'
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";
import { t } from "@/lang/index.ts";

@Discord()
export class Ping {
  @Slash({ name: "ping", description: 'Ping!' })
  async ping(interaction: CommandInteraction, client: CustomClient) {
    // Check DB connection with translated error message
    if(!await client.isDBAlive()) {
      return interaction.reply(t("db.error", "cs", { 
        username: interaction.member!.user.username 
      }));
    }
    
    // Reply with translated message
    return interaction.reply(t("ping.reply", "cs"));
  }
}
```

### Getting Available Languages

You can get a list of all available languages using the `getAvailableLanguages()` function:

```typescript
import { getAvailableLanguages } from "@/lang/index.ts";

const languages = getAvailableLanguages(); // Returns ["en", "cs"]
```

### Adding New Languages

To add a new language:

1. Create a new JSON file in the `src/lang/` directory with the language code as the filename (e.g., `fr.json` for French)
2. Add all the translation keys and their translated values to the file
3. The system will automatically detect and load the new language file when the bot starts

### Adding New Translation Keys

To add new translations:

1. Add your translation key and text to all language JSON files in `src/lang/`
2. Use the key in your code with the `t()` function

### Fallback Mechanism

If a translation key is not found in the specified language, the system will:
1. Try to find the key in the fallback language (English by default)
2. If still not found, return the key itself as the text

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