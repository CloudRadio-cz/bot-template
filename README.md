# 🚀 Modern Discord Bot Template

A production-ready Discord bot template built with Deno, Discord.js, and
SurrealDB. This template provides a robust foundation for creating scalable
Discord bots with database persistence, internationalization, and modern
development practices.

## ✨ Key Features

- 🛡️ **Built with Deno** - Enhanced security and performance with modern
  JavaScript runtime
- 💾 **SurrealDB Integration** - Flexible and powerful database for data
  persistence
- 🔄 **Discord Hybrid Sharding** - Built-in support for scaling across multiple
  servers
- 🧩 **Command Handler** - Decorator-based command system using discordx
- 🌐 **Internationalization** - Built-in translation system with multi-language
  support
- 📝 **TypeScript** - Full TypeScript support for better code quality and
  developer experience
- 🎨 **Beautiful Logging** - Colorful and informative console logging with chalk
- 🐳 **Docker Ready** - Containerized deployment with Docker and Docker Compose
- 🔧 **Development Tools** - Hot reloading, debugging, and development utilities
- 📚 **Comprehensive Docs** - Detailed documentation and deployment guides

## 🎯 Use Cases

- Community management bots
- Moderation and administration tools
- Game servers and community features
- Custom command systems
- Multi-language community support
- Data-driven Discord applications

## 📑 Navigation

- [✨ Key Features](#-key-features)
- [🎯 Use Cases](#-use-cases)
- [📋 To-Do](#-to-do)
- [🔧 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [💾 Setting up SurrealDB](#-setting-up-surrealdb)
- [🤖 Running the Bot](#-running-the-bot)
- [🐳 Deployment Guides](#-deployment-guides)
  - [Railway](#-deploying-to-railway)
  - [DigitalOcean](#-deploying-to-digitalocean)
  - [Oracle Cloud Free Tier](#-deploying-to-oracle-cloud-free-tier)
  - [Docker](#-deploying-with-docker)
  - [Docker Compose](#-using-docker-compose)
- [📁 Project Structure](#-project-structure)
- [⚙️ Creating Commands](#-creating-commands)
- [🌐 Translation System](#-translation-system)
- [📊 Using SurrealDB in Commands](#-using-surrealdb-in-commands)
- [🔒 Deployment Best Practices](#-deployment-best-practices)
  - [Security](#-security)
  - [Monitoring and Maintenance](#-monitoring-and-maintenance)
  - [Database Management](#-database-management)
  - [Development Workflow](#-development-workflow)
  - [Disaster Recovery](#-disaster-recovery)
  - [Cost Management](#-cost-management)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 📋 To-Do

### ✅ Completed

- [x] Add translation system
- [x] Improve logging system
- [x] Add comments to the code for better understanding and maintenance
- [x] Create deployment guides for popular hosting platforms
- [x] Add database schemas to make SurrealDB type-safe
  > Implemented using [SurrealORM](https://github.com/SurrealORM/orm)

### 🚀 Planned Features

- [ ] Add more example commands and use cases
- [ ] Implement command cooldowns

### 📚 Documentation

- [ ] Create contribution guidelines
- [ ] Add troubleshooting guide

### 🔧 Infrastructure

- [ ] Add health check endpoints
- [ ] Add database migration system
- [ ] Add caching layer

### 🌐 Internationalization

- [ ] Add more language templates
- [ ] Add automatic language detection

## Prerequisites

- [Deno](https://deno.land/) (v2.0.0 or higher)
- [SurrealDB](https://surrealdb.com/) (v2.0.0 or higher)
- Discord Bot Token
  ([Discord Developer Portal](https://discord.com/developers/applications))

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/CloudRadio-cz/bot-template.git
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
surreal start --user root --pass root --bind 127.0.0.1:3000 rocksdb:main.db
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

## Deployment Guides

### Deploying to Railway

[Railway](https://railway.app/) is a modern platform that makes it easy to
deploy and scale your Discord bot.

1. Create a Railway account and install the Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize your project:
   ```bash
   railway init
   ```

4. Add your environment variables in the Railway dashboard and share them with
   the service:
   - `BOT_TOKEN`
   - `SURREALDB_URL`
   - `SURREALDB_NAMESPACE`
   - `SURREALDB_DATABASE`
   - `SURREALDB_USERNAME`
   - `SURREALDB_PASSWORD`

5. Deploy your bot:
   ```bash
   railway up
   ```

### Deploying to DigitalOcean

[DigitalOcean](https://www.digitalocean.com/) provides virtual private servers
(Droplets) for hosting your bot.

1. Create a DigitalOcean account and create a new Droplet:
   - Choose Ubuntu as the operating system
   - Select a plan based on your needs (512MB RAM minimum recommended)
   - Choose a datacenter region close to your target users

2. Connect to your Droplet via SSH:
   ```bash
   ssh root@your_droplet_ip
   ```

3. Install Deno:
   ```bash
   curl -fsSL https://deno.land/install.sh | sh
   ```

4. Install SurrealDB:
   ```bash
   curl -sSf https://install.surrealdb.com | sh
   ```

5. Clone the repository:
   ```bash
   git clone https://github.com/CloudRadio-cz/bot-template.git
   cd bot-template
   ```

6. Create and configure your `.env` file:
   ```bash
   cp .env.example .env
   nano .env  # Edit with your configuration
   ```

7. Start SurrealDB:
   ```bash
   surreal start --user root --pass root --bind 0.0.0.0:3000 rocksdb:main.db
   ```

8. Start your bot:
   ```bash
   deno task start
   ```

9. (Optional) Set up PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start "deno task start" --name yours-bot-name
   pm2 save
   pm2 startup
   ```

### Deploying to Oracle Cloud Free Tier

[Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/) offers a generous
free tier for hosting your bot.

1. Create an Oracle Cloud account and create a new VM instance:
   - Choose Ubuntu as the operating system
   - Select the Always Free VM.Standard.E2.1.Micro shape
   - Generate an SSH key pair for access

2. Connect to your instance via SSH:
   ```bash
   ssh ubuntu@your_instance_ip
   ```

3. Follow the same setup steps as DigitalOcean (steps 3-9 above)

### Deploying with Docker

This template includes a Dockerfile for containerized deployment. Docker
provides a consistent environment and makes deployment easier across different
platforms.

1. Install Docker:
   ```bash
   # For Ubuntu/Debian
   curl -fsSL https://get.docker.com | sh

   # For Windows
   # Download and install Docker Desktop from https://www.docker.com/products/docker-desktop
   ```

2. Build the Docker image:
   ```bash
   docker build -t discord-bot .
   ```

3. Start the bot container:
   ```bash
   docker run -d \
     --name discord-bot \
     --env-file .env \
     discord-bot
   ```

4. View logs:
   ```bash
   docker logs -f discord-bot
   ```

5. Stop the containers:
   ```bash
   docker stop discord-bot surrealdb
   ```

### Using Docker Compose

For a more convenient way to manage both the bot and SurrealDB, you can use
included `docker-compose.yml`. This approach makes it easier to manage the
entire stack and ensures proper service dependencies.

1. Start the entire stack:
   ```bash
   docker-compose up -d
   ```

2. View logs for all services:
   ```bash
   docker-compose logs -f
   ```

3. View logs for a specific service:
   ```bash
   docker-compose logs -f bot    # For bot logs
   docker-compose logs -f surrealdb  # For database logs
   ```

4. Stop the stack:
   ```bash
   docker-compose down
   ```

5. Rebuild and restart after changes:
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

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
import { User } from "@schema/User"

@Discord()
export class UserCommand {
  @Slash({ name: "ping", description: "ping" })
  async createUser(interaction: CommandInteraction, client: CustomClient) {
    // Check if DB is connected
    if (!await client.isDBAlive()) {
      await client.connectDB();
    }

    // Create a new user
    const user = new User();
    user.username = "username";
    user.money = 5;

    const result = await client.db.create(user);
    await interaction.reply(`User created: ${JSON.stringify(result)}`);
  }
}
```

For more information on using SurrealDB with SurrealORM, refer to the
[SurrealORM Repository](https://github.com/SurrealORM/orm)

## Deployment Best Practices

### Security

1. **Environment Variables**:
   - Never commit `.env` files to version control
   - Use strong, unique passwords for all services
   - Rotate credentials regularly
   - Use different credentials for development and production
   - Consider using a secrets manager for production

2. **Network Security**:
   - Use firewalls to restrict access
   - Only expose necessary ports
   - Use internal networks for service communication
   - Implement rate limiting where possible
   - Keep all dependencies updated

3. **Bot Security**:
   - Use the minimum required Discord intents
   - Implement proper error handling
   - Validate all user inputs
   - Use proper permission checks
   - Keep the bot token secure

### Monitoring and Maintenance

1. **Performance**:
   - Monitor resource usage (CPU, memory, disk)
   - Set up performance metrics
   - Implement caching where appropriate
   - Optimize database queries

2. **Uptime**:
   - Set up uptime monitoring
   - Implement automatic restarts
   - Use health checks
   - Have a backup deployment ready
   - Document recovery procedures

### Database Management

1. **Backups**:
   - Implement regular automated backups
   - Test backup restoration
   - Store backups in multiple locations
   - Document backup procedures
   - Set up backup monitoring

2. **Data Integrity**:
   - Validate data before storage
   - Implement proper error handling
   - Monitor database health
   - Regular maintenance tasks

### Development Workflow

1. **Version Control**:
   - Use semantic versioning
   - Maintain a changelog
   - Use feature branches
   - Implement proper code review
   - Keep documentation updated

2. **Deployment Process**:
   - Use CI/CD pipelines
   - Implement blue-green deployments
   - Have rollback procedures
   - Test in staging first
   - Document deployment steps

### Disaster Recovery

1. **Backup Strategy**:
   - Regular database backups
   - Configuration backups
   - Code repository backups
   - Document recovery procedures
   - Test recovery regularly

2. **Incident Response**:
   - Have an incident response plan
   - Document common issues
   - Maintain contact lists
   - Set up monitoring alerts
   - Regular incident reviews

### Cost Management

1. **Resource Optimization**:
   - Monitor resource usage
   - Optimize hosting costs
   - Use appropriate instance sizes
   - Regular cost reviews

2. **Budget Planning**:
   - Plan for growth
   - Monitor costs
   - Set up budget alerts
   - Regular cost reviews
   - Optimize resource allocation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for
details.
