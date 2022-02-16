import {SlashCommandBuilder} from "@discordjs/builders";
import {REPORT_COMMAND} from "../constants.mjs";
import insertLog, {Log} from "./insert-log.mjs";

export default {
    data: new SlashCommandBuilder()
        .setName(REPORT_COMMAND.COMMAND_NAME)
        .setDescription(REPORT_COMMAND.COMMAND_DESCRIPTION),
    async execute(interaction) {
        await interaction.reply(REPORT_COMMAND.COMMAND_REPLY);

        _insertLog(interaction.guildId, interaction.user.id);
    }
}

const _insertLog = (guildId, userId) => {
    const sentMessage = `${REPORT_COMMAND.COMMAND_REPLY}`;
    const query = `/${REPORT_COMMAND.COMMAND_NAME}`;
    const log = new Log(query, REPORT_COMMAND.LOG_CODE, guildId === null, userId, guildId, sentMessage);

    insertLog(log).catch(err => {
        console.error(err);
    });
}