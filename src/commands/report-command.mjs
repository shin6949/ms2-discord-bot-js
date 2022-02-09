import {SlashCommandBuilder} from "@discordjs/builders";
import {REPORT_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder()
        .setName(REPORT_COMMAND.COMMAND_NAME)
        .setDescription(REPORT_COMMAND.COMMAND_DESCRIPTION),
    async execute(interaction) {
        await interaction.reply(REPORT_COMMAND.COMMAND_REPLY);
    }
}