import { InteractionType } from "discord.js";
import { MadClip } from "../client";

async function interactionCreate(client: MadClip, interaction: import("discord.js").Interaction): Promise<void> {
    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        await command.exe({ client, interaction });
    }
}

export { interactionCreate }