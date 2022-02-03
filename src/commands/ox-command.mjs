import {SlashCommandBuilder} from "@discordjs/builders";
import {OX_QUIZ_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder().setName(OX_QUIZ_COMMAND.COMMAND_NAME)
        .setDescription(OX_QUIZ_COMMAND.COMMAND_DESCRIPTION)
        .addStringOption(option =>
            option.setName(OX_QUIZ_COMMAND.OPTION_NAME)
                .setDescription(OX_QUIZ_COMMAND.OPTION_DESCRIPTION)
                .setRequired(true)
        ),
        async execute(interaction) {
            await interaction.reply("OX");
        }
}