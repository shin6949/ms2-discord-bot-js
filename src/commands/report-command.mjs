import {SlashCommandBuilder} from "@discordjs/builders";
import {REPORT_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder()
        .setName(REPORT_COMMAND.COMMAND_NAME)
        .setDescription(REPORT_COMMAND.COMMAND_DESCRIPTION),
    async execute(interaction) {
        await interaction.reply("제보는 ~~으로 부탁드립니다.");
    },
}