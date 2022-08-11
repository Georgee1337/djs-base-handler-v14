import { ApplicationCommandOptionData, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { DataSource } from "typeorm";
import { Guilds } from "../classes/typeorm";
import { MadClip } from "../client";
import { CommandOptions } from "../types";

class HustlaCommand {
    client: MadClip;
    name: string;
    description: string;
    type: number;
    defaultMemberPermissions: bigint;
    options?: ApplicationCommandOptionData[];

    constructor(client: MadClip, {
        name = "",
        description = "",
        type = ApplicationCommandType.ChatInput,
        defaultMemberPermissions = PermissionFlagsBits.ViewChannel,
        options = [],
    }: CommandOptions) {
        this.client = client;
        this.name = name;
        this.defaultMemberPermissions = defaultMemberPermissions;
        this.description = description;
        this.type = type;

        if (options && options.length) this.options = options;
    }
}

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    synchronize: true,
    entities: [Guilds]
})

export { HustlaCommand, AppDataSource };