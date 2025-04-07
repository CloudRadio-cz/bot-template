import { Client, ClientOptions } from 'discordx';
import { ClusterClient } from 'discord-hybrid-sharding';
import { Surreal } from '@surrealdb/surrealdb';

export class CustomClient extends Client {
    // private commands: Command[];
    public cluster?: ClusterClient<CustomClient> | undefined;
    public db: Surreal;

    constructor(options: ClientOptions) {
        super(options);
        // this.commands = new Collection();
        this.db = new Surreal();
    }
}