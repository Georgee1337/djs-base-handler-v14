import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { MadClip } from "../client";

export interface WhoShotYaInt extends CommandInteraction {
    member: import("discord.js").GuildMember;
}

export interface CommandOptions {
    name: string;
    description: string;
    type: ApplicationCommandType;
    options?: ApplicationCommandOptionData[];
    defaultPermission?: boolean;
    defaultMemberPermissions?: any;
    perms?: PermissionString[];
}