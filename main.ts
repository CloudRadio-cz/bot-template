import chalk from "chalk";
import { Logger } from "@/utils/Logger.ts";
import { ClusterManager, HeartbeatManager } from "discord-hybrid-sharding";

/**
 * Initializes and manages Discord bot clusters using discord-hybrid-sharding.
 * Sets up heartbeat monitoring and logging for cluster events.
 */
const manager = new ClusterManager("./src/client.ts", {
	/**
	 * Total number of shards to spawn. 'auto' lets the library decide.
	 * @type {string}
	 */
	totalShards: "auto",
	/**
	 * Number of shards per cluster.
	 * @type {number}
	 */
	shardsPerClusters: 8,
	/**
	 * Cluster mode (process/thread).
	 * @type {string}
	 */
	mode: "process",
	/**
	 * Discord bot token from environment variables.
	 * @type {string | undefined}
	 */
	token: Deno.env.get("BOT_TOKEN"),
});

manager.extend(
	/**
	 * Adds heartbeat monitoring to clusters.
	 * @param {Object} options - Heartbeat options.
	 * @param {number} options.interval - Heartbeat interval in ms.
	 * @param {number} options.maxMissedHeartbeats - Max missed heartbeats before restart.
	 */
	new HeartbeatManager({
		interval: 60000,
		maxMissedHeartbeats: 5,
	}),
);

/**
 * Event listener for cluster creation. Logs cluster launch.
 * @param {Object} cluster - The created cluster instance.
 */
manager.on("clusterCreate", (cluster) => {
	Logger.info(`Launched Cluster ${chalk.yellow(cluster.id)}!`);
});

/**
 * Spawns all clusters with no timeout.
 */
manager.spawn({ timeout: -1 });
