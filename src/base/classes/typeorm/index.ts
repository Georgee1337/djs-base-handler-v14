import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Guilds" })
class Guilds {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    guildName: string;

    @Column({ type: "varchar", length: 255, unique: true })
    guildId: string;

    @Column({ type: "varchar", length: 255 })
    joinedAt = new Date(Date.now()).toISOString();
}

export { Guilds }