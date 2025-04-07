import chalk from 'chalk';
import { Logger } from '@/utils/Logger.ts';
import { ClusterManager, HeartbeatManager } from "discord-hybrid-sharding";

const manager = new ClusterManager("./src/client.ts", {
    totalShards: "auto",
    shardsPerClusters: 8,
    mode: "process",
    token: Deno.env.get("BOT_TOKEN"),
});

manager.extend(
    new HeartbeatManager({
        interval: 60000,
        maxMissedHeartbeats: 5,
    })
);

manager.on("clusterCreate", (cluster) => {
    Logger.info(`Launched Cluster ${chalk.yellow(cluster.id)}!`);
    
});
manager.spawn({ timeout: -1 });
