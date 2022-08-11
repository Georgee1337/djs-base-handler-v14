import { Guild } from "discord.js";
import { Guilds } from "../../base/classes/typeorm";
import { MadClip } from "../../base/client";

export default async (client: MadClip, guild: Guild): Promise<void> => {
    const findGuild = await client.database.getRepository(Guilds).findBy({
        guildId: guild.id
    })
    if (findGuild.length) {
        await client.database.getRepository(Guilds).update({ guildId: guild.id }, { joinedAt: new Date(Date.now()).toISOString() })
    } else if (!findGuild.length) {
        const newGuild = new Guilds();
        newGuild.guildId = guild.id;
        newGuild.guildName = guild.name;
        newGuild.joinedAt = new Date(Date.now()).toISOString();
        await client.database.getRepository(Guilds).save(newGuild);
    }
};