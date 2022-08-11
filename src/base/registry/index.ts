import * as fs from 'fs/promises';
import * as path from 'path';
import { DaCommand } from '../classes';
import { MadClip } from '../client';

async function registerCommands(client: MadClip, ...dirs: string[]): Promise<void> {
    for (const dir of dirs) {
        const files = await fs.readdir(path.join(__dirname, dir));

        for (const file of files) {
            const stat = await fs.lstat(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                await registerCommands(client, path.join(dir, file));
            } else if (file.endsWith('.ts')) {
                try {
                    const cmdModule: DaCommand = new ((await import(path.join(__dirname, dir, file))).default)(client);
                    const { name } = cmdModule;
                    client.commands.set(name, cmdModule);
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}


async function registerEvents(client: MadClip, ...dirs: string[]): Promise<void> {
    for (const dir of dirs) {
        const files = await fs.readdir(path.join(__dirname, dir));
        for (const file of files) {
            const stat = await fs.lstat(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                await registerEvents(client, path.join(dir, file));
            } else if (file.endsWith('.ts')) {
                const eventName = file.substring(0, file.indexOf('.ts'));
                try {
                    const eventModule = (await import(path.join(__dirname, dir, file))).default;
                    client.on(eventName, eventModule.bind(null, client));
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}

export { registerCommands, registerEvents };