import { MadClip } from "../client";
import { HustlaCommand } from "../hustlas";
import { CommandOptions } from "../types";

export class DaCommand extends HustlaCommand {
    [x: string]: any;
    constructor(client: MadClip, opts: CommandOptions) {
        super(client, opts);
    }
}
