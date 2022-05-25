import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";
import { reportCommand } from "../commands/ReportCommand";
import { oxCommand } from "../commands/OxCommand";
import { default as minigameCommand } from "../commands/minigame-command";
import { default as fieldBossCommand } from "../commands/field-boss-command";
import { default as regionWarCommand } from "../commands/RegionWarCommand";
import { default as trophyCommand } from "../commands/trophy-command";

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: BaseCommandInteraction) => void;
}

export const Commands: Command[] = [reportCommand, oxCommand];
