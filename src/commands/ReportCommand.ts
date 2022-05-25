import { BaseCommandInteraction } from "discord.js";
import { Command } from "../types/command";
import { REPORT_COMMAND } from "../constants";
import insertLog, { Log } from "./insert-log";

export const reportCommand: Command = {
  name: REPORT_COMMAND.COMMAND_NAME,
  description: REPORT_COMMAND.COMMAND_DESCRIPTION,
  run: async (interaction: BaseCommandInteraction) => {
    await interaction.reply(REPORT_COMMAND.COMMAND_REPLY);
    _insertLog(interaction.guildId, interaction.user.id);
  },
};

const _insertLog = (guildId: string | null, userId: string) => {
  const sentMessage = `${REPORT_COMMAND.COMMAND_REPLY}`;
  const query = `/${REPORT_COMMAND.COMMAND_NAME}`;
  const log = new Log(query, REPORT_COMMAND.LOG_CODE, guildId === null, userId, guildId, sentMessage);

  insertLog(log).catch((err) => {
    console.error(err);
  });
};
