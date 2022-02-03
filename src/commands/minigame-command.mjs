import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, MINIGAME_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder().setName(MINIGAME_COMMAND.COMMAND_NAME)
        .setDescription(MINIGAME_COMMAND.COMMAND_DESCRIPTION)
        .addStringOption(option =>
            option.setName(MINIGAME_COMMAND.OPTION_NAME)
                .setDescription(MINIGAME_COMMAND.OPTION_DESCRIPTION)
                .setRequired(true)
                .addChoices([
                    [COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
                    [COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
                ])
        ),
        async execute(interaction) {
            await interaction.reply("Minigame");
        }
}