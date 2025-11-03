# 🚀 Modern Discord Bot Template

A production-ready Discord bot template built with Bun, Seyfert, and Prisma ORM. This template provides a robust foundation for creating scalable Discord bots with database persistence, internationalization, modern logging, and advanced development practices.

## ✨ Key Features

- ⚡ **Built with Bun** - Lightning-fast JavaScript runtime with built-in package manager and bundler
- 🛡️ **Seyfert Framework** - Modern Discord framework with advanced features
- 💾 **Prisma ORM Integration** - Type-safe database access with MySQL support
- 🔄 **Redis Caching** - High-performance caching layer for improved bot responsiveness
- 🧩 **Command System** - Decorator-based command system with middleware support
- 🌐 **Internationalization** - Built-in multi-language support with locale-based responses
- 📝 **Full TypeScript** - Complete TypeScript support with strict type safety
- 🎨 **Beautiful Logging** - Custom colorful logging system with timestamps and memory usage
- 📊 **Database Migrations** - Automated database schema management with Prisma

## 🤖 Bots using this template
- CloudRadio - An online radio stations streaming bot
> Invite: [Link](https://cloudradio.cz/invite)
> Website: [Link](https://cloudradio.cz)

If you want your bot to be on this list, make a request, edit the README, add your bot to the list and open a pull request.

## 🎯 Use Cases

- Community management bots
- Moderation and administration tools
- Game servers and guild utilities
- Custom command systems with database persistence
- Multi-language community support
- Advanced Discord applications with caching

## 📋 To-Do

### ✅ Completed

- [x] Seyfert framework integration
- [x] Prisma ORM with MySQL support
- [x] Redis caching system
- [x] Custom logging with memory tracking
- [x] Internationalization system
- [x] Middleware support
- [x] Development environment setup

### 🚀 Planned Features

- [ ] More example commands and use cases
- [ ] Command cooldowns and rate limiting
- [ ] Permission system integration

## 🔧 Prerequisites

- [Bun](https://bun.sh/)
- [MySQL](https://www.mysql.com/) database
- [Redis](https://redis.io/) server
- Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))

## 🚀 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/cloudradio-cz/bot-template.git
   cd bot-template
   ```

2. Install dependencies with Bun:
   ```bash
   bun install
   ```

3. Create a `.env` file based on the environment variables needed:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration

## 💾 Setting up the Database

### MySQL Setup

1. Install MySQL on your system
2. Create a database for your bot:
   ```sql
   CREATE DATABASE bot_template;
   CREATE DATABASE bot_template_shadow; -- For Prisma migrations
   ```

3. Update your `.env` file with the correct database details

4. Generate Prisma client:
   ```bash
   bun run db:generate
   ```

5. Run database migrations:
   ```bash
   bun run db:migrate
   ```

## 🤖 Running the Bot

### Development Mode

Start the bot in development mode with hot reloading:

```bash
bun run dev
```

This will start the bot with file watching enabled and detailed debug logging.

### Production Mode

Start the bot in production mode:

```bash
bun run start
```

This will generate the Prisma client and start the bot optimized for production.

## 📁 Project Structure

```
├── .env.example              # Example environment variables
├── package.json              # Package configuration and scripts
├── seyfert.config.ts         # Seyfert framework configuration
├── tsconfig.json             # TypeScript configuration
├── biome.json                # Biome linter/formatter configuration
├── bun.lock                  # Bun lockfile
├── prisma/
│   └── schema.prisma         # Database schema definition
└── src/
    ├── main.ts               # Entry point and bot initialization
    ├── module.ts             # TypeScript module augmentation
    ├── commands/             # Bot commands
    │   └── utils/
    │       └── ping.ts       # Example ping command
    ├── events/               # Discord event handlers
    │   └── client/
    │       └── botReady.ts   # Bot ready event
    ├── middlewares/          # Command middlewares
    │   ├── index.ts          # Middleware registry
    │   └── CommandLogger.ts  # Command logging middleware
    ├── database/             # Database configuration
    │   ├── db.ts             # Prisma client setup
    │   └── prisma/           # Generated Prisma client
    ├── utils/                # Utility functions
    │   └── CustomLogger.ts   # Custom logging system
    ├── configs/              # Configuration files
    │   ├── main.ts           # Main bot configuration
    │   ├── colors.ts         # Color palette
    │   └── emojis.ts         # Emoji collection
    └── langs/                # Internationalization
        ├── en.ts             # English translations
        └── cs.ts             # Czech translations
```

## ⚙️ Creating Commands

Commands in Seyfert use decorators for easy configuration. Here's an example:

```typescript
import { Command, Middlewares, type CommandContext, Declare, LocalesT } from "seyfert";

@Declare({
	name: "example",
	description: "An example command",
	contexts: ["Guild", "BotDM"],
})
@Middlewares(["commandLogger"])
@LocalesT("commands.example.name", "commands.example.description")
export default class ExampleCommand extends Command {
	async run(ctx: CommandContext) {
		await ctx.editOrReply({ content: "This is pretty cool!" });
	}
}
```

### Command Features

- **Type Safety**: Full TypeScript support with proper typing
- **Middleware Support**: Apply middleware functions for logging, permissions, etc.
- **Localization**: Built-in support for multiple languages
- **Context Handling**: Support for both guild and DM contexts
- **Database Integration**: Access to Prisma client through `ctx.client.db` or import db from `@db` when client is not available

## 🌐 Translation System

The bot includes a comprehensive internationalization system:
> Heavily inspired by [Stelle](https://github.com/Ganyu-Studios/stelle-music)

### Structure

```typescript
// src/langs/en.ts
export default {
	metadata: {
		name: "English",
		nativeName: "English",
		emoji: "🇺🇸",
		code: "en",
		translators: {
			lead: "JustWolf",
			contributors: [],
			reviewers: ["JustWolf"],
			maintainer: "JustWolf",
		},
		formatting: {
			dateFormat: "MM/DD/YYYY",
			timeFormat: "12h",
			numberFormat: "en-US",
		},
	},
	commands: {
		ping: {
			name: "ping",
			description: "Pong!",
		},
	},
	responses: {
		ping: {
			reply: "Pong!",
		},
	},
}
```

### Usage in Commands

```typescript
async run(ctx: CommandContext) {
	const t = ctx.t.get(); // Gets user's/guild's preferred locale
	await ctx.editOrReply({ content: t.responses.ping.reply });
}
```

### Adding New Languages

1. Create a new file in `src/langs/` (e.g., `fr.ts`)
2. Follow the same structure as existing language files
3. Use `satisfies typeof English` for type safety

## 📊 Database Usage

Access the database through the Prisma client:

```typescript
import { Command, type CommandContext } from "seyfert";
import { db } from "@db";

export default class DatabaseCommand extends Command {
	async run(ctx: CommandContext) {
		// Access database through client
		const users = await ctx.client.db.user.findMany();

      // Or access db by importing from @db when client is not available
      const users = await db.user.findMany();
		
		// Your database operations here
		await ctx.editOrReply({ 
			content: `Found ${users.length} users in database` 
		});
	}
}
```

### Database Scripts

- `bun run db:generate` - Generate Prisma client
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Prisma Studio for database management

## 🔧 Development Tools

### Linting and Formatting

```bash
# Check for linting issues
bun run lint

# Fix linting issues automatically
bun run lint:fix

# Format code
bun run format

# Fix formatting automatically
bun run format:fix
```

### Hot Reloading

The development mode includes automatic restart when files change:

```bash
bun run dev
```

## 📝 Logging System

The bot includes a custom logging system with:

- **Colored Output**: Different colors for different log levels
- **Timestamps**: Timezone-aware timestamps
- **Memory Usage**: Memory consumption tracking
- **Custom Levels**: Success, CMD, and DB specific log levels

### Log Levels

- `DEBUG` - Development debugging information
- `INFO` - General information
- `SUCCESS` - Success operations (green)
- `CMD` - Command executions (yellow)
- `DB` - Database operations (magenta)
- `WARN` - Warning messages
- `ERROR` - Error messages
- `FATAL` - Critical errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for new functions
- Ensure all linting passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Seyfert](https://seyfert.dev/) - Modern Discord framework
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Biome](https://biomejs.dev/) - Fast formatter and linter
- [Stelle](https://github.com/Ganyu-Studios/stelle-music/tree/main) - Provided a great inspiration for some parts

---

<div align="center">

**Happy coding! 🎉**

Made with ❤️ using modern technologies

</div>