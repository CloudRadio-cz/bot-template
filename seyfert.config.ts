import { config } from "seyfert";

export default config.bot({
	token: process.env.BOT_TOKEN ?? "",
	locations: {
		base: "src",
		commands: "commands",
		events: "events",
		langs: "langs",
		components: "components",
	},
	intents: 129,
	debug: process.env.BUILD_ENV === "development" ? true : false,
});
