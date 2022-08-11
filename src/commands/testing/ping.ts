import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { DaCommand } from "../../base/classes";

export default class Ping extends DaCommand {
    constructor(client: import("../../base/client").MadClip) {
        super(client, {
            name: 'ping',
            description: 'Pongs',
            type: ApplicationCommandType.ChatInput,
        });
    }

    async exe({ client, interaction }: {
        client: import("../../base/client").MadClip,
        interaction: import("../../base/types").WhoShotYaInt
    }): Promise<void> {

        interaction.reply({
            content: 'Pong',
            ephemeral: true
        })

    }
}