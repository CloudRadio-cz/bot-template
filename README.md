# Discord Bot Template with SurrealDB

A modern Discord bot template built with Deno, Discord.js, and SurrealDB
integration. This template provides a solid foundation for creating Discord bots
with database persistence.

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
- Discord Bot Token
  ([Discord Developer Portal](https://discord.com/developers/applications))

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

Download and install SurrealDB from the
[official website](https://surrealdb.com/install).

#### Option 2: Using Docker

Check the official SurrealDB documentation for Docker installation instructions:
[SurrealDB Docker Instructions](https://surrealdb.com/docs/surrealdb/installation/running/docker)

### Starting SurrealDB

#### Option 1: Manual startup

Start SurrealDB with the following command:

```bash
surrealdb start --user root --pass root --bind 127.0.0.1:3000 rocksdb:main.db
```

By default, SurrealDB will run on `http://127.0.0.1:3000/rpc`.

#### Option 2: Using Docker

Check the official SurrealDB documentation for Docker installation and running
instructions:
[SurrealDB Docker Instructions](https://surrealdb.com/docs/surrealdb/installation/running/docker)

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
    │   ├── cs/          # Czech translations folder
    │   │   ├── ping.json  # Category-specific translations
    │   │   ├── user.json  # Category-specific translations
    │   │   └── db.json    # Category-specific translations
    │   ├── en/          # English translations folder
    │   │   ├── ping.json  # Category-specific translations
    │   │   ├── user.json  # Category-specific translations
    │   │   └── db.json    # Category-specific translations
    │   └── index.ts     # Translation system implementation
    └── utils/           # Utility functions
        └── Logger.ts    # Custom logger
```

## Creating Commands

Commands are created using decorators from discordx. Here's an example ping
command:

```typescript
import { Discord, Slash } from "discordx";
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";

@Discord()
export class Ping {
  @Slash({ name: "ping", description: "Ping!" })
  async ping(interaction: CommandInteraction, client: CustomClient) {
    await interaction.reply("Pong!");
  }
}
```

For more information on creating command and or more advanced usage, refer to
the official [discordx documentation](https://discordx.js.org/).

## Translation System

This template includes a built-in translation system that supports multiple
languages. The system allows you to define translation keys in JSON files and
use them in your code with variable substitution.

### How It Works

Translation files are organized in the `src/lang/` directory using a
folder-based structure. Each language has its own folder (e.g., `en/`, `cs/`),
and within each language folder, translations are split into multiple JSON files
by category. The system currently supports English and Czech. The translation
system is automatically initialized when the bot starts up.

Each category file is a simple JSON object where:

- The filename represents the category (e.g., `ping.json`, `user.json`,
  `db.json`)
- Keys within the file are identifiers for text strings in that category
- Values are the translated text for that language and category

Example folder structure:

```
src/lang/
  ├── en/
  │   ├── ping.json
  │   ├── user.json
  │   └── db.json
  └── cs/
      ├── ping.json
      ├── user.json
      └── db.json
```

Example of `en/ping.json`:

```json
{
  "reply": "🏓 Pong! Bot is alive!"
}
```

Example of `cs/ping.json`:

```json
{
  "reply": "🏓 Pong! Bot je naživu!"
}
```

When accessing translations in code, you still use the dot notation format:
`category.key` (e.g., `ping.reply`, `user.welcome`)

### Using Translations

To use translations in your code, import the `t` function from the language
module:

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

The translation system supports variable substitution using curly braces `{}`.
For example:

```typescript
// English: "Welcome, {username}!"
t("user.welcome", "en", { username: "John" }); // Returns "Welcome, John!"

// Czech: "Vítej, {username}!"
t("user.welcome", "cs", { username: "Jan" }); // Returns "Vítej, Jan!"
```

### Example in Commands

Here's how to use translations in a command:

```typescript
import { Discord, Slash } from "discordx";
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";
import { t } from "@/lang/index.ts";

@Discord()
export class Ping {
  @Slash({ name: "ping", description: "Ping!" })
  async ping(interaction: CommandInteraction, client: CustomClient) {
    // Check DB connection with translated error message
    if (!await client.isDBAlive()) {
      return interaction.reply(t("db.error", "cs", {
        username: interaction.member!.user.username,
      }));
    }

    // Reply with translated message
    return interaction.reply(t("ping.reply", "cs"));
  }
}
```

### Getting Available Languages

You can get a list of all available languages using the
`getAvailableLanguages()` function:

```typescript
import { getAvailableLanguages } from "@/lang/index.ts";

const languages = getAvailableLanguages(); // Returns ["en", "cs"]
```

### Adding New Languages

To add a new language:

1. Create a new folder in the `src/lang/` directory with the language code as
   the folder name (e.g., `fr/` for French)
2. Create JSON files for each category (e.g., `ping.json`, `user.json`,
   `db.json`) in the language folder
3. Add the translated values to each category file
4. The system will automatically detect and load the new language folder when
   the bot starts

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
import { Discord, Slash } from "discordx";
import { CommandInteraction } from "discord.js";
import { CustomClient } from "@/client.ts";

interface User {
  username: string;
  money: number;
  [key: string]: unknown;
}

@Discord()
export class UserCommand {
  @Slash({ name: "ping", description: "ping" })
  async createUser(interaction: CommandInteraction, client: CustomClient) {
    // Check if DB is connected
    if (!await client.isDBAlive()) {
      await client.connectDB();
    }

    // Create a new user
    const user: User = {
      username: "example",
      money: 5,
    };

    const result = await client.db.create("user", user);
    await interaction.reply(`User created: ${JSON.stringify(result)}`);
  }
}
```

For more information on using SurrealDB SDK, refer to the official
[SurrealDB JavaScript SDK Documentation](https://surrealdb.com/docs/sdk/javascript)

## To-Do

- [x] Add translation system
- [x] Improve logging system
- [ ] Add comments to the code for better understanding of the code and
      maintenance
- [ ] Add more example commands and use cases
- [ ] Create deployment guides for popular hosting platforms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for
details.
