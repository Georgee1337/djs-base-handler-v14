import { MadClip } from "../../base/client";
import { interactionCreate } from "../../base/events";

export default async (client: MadClip, interaction: import("discord.js").Interaction): Promise<void> => {
    interactionCreate(client, interaction)
};