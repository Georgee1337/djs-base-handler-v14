import 'dotenv/config';
import { ApplicationCommandData, Client, Collection } from "discord.js";
import { DaCommand } from "../classes";
import { AppDataSource } from "../hustlas";
import { registerCommands, registerEvents } from "../registry";

export class MadClip extends Client {
    database = AppDataSource;
    commands: Collection<string, DaCommand> = new Collection()
    constructor() {
        super({
            intents: 32767,
        })
    }

    miazoi() {
        this.getModulas()
        this.login(process.env.TOKEN)
    }

    async addFile(filePath: string) {
        return (await import(filePath))?.default;
    }
    stillActive({ commands, guild }: { commands: Collection<string, DaCommand>, guild: string }) {
        if (guild) this.guilds.cache.get(guild).commands.set(toApplicationCommand(commands))
        else this.application.commands.set(toApplicationCommand(commands))
    }


    async getModulas() {
        await registerEvents(this, '../../events');
        await registerCommands(this, "../../commands");
        this.on("ready", () => {
            AppDataSource.initialize().then(() => console.log('Database connected')).catch(err => console.log(err))
            this.stillActive({
                commands: this.commands,
                guild: process.env.guildId
            })
        });
    }
}
/**
 * @param {Collection<string, DaCommand>} collection
 * @returns {import('discord.js').ApplicationCommandData[]}
 */
function toApplicationCommand(collection: Collection<string, DaCommand>): ApplicationCommandData[] {
    return collection.map(x => {
        return {
            name: x.name,
            description: x.description,
            options: x.options,
            defaultMemberPermissions: x.defaultMemberPermissions,
        };
    });
}