import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, LEGION_WAR_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder().setName(LEGION_WAR_COMMAND.COMMAND_NAME)
        .setDescription(LEGION_WAR_COMMAND.COMMAND_DESCRIPTION)
        .addStringOption(option =>
            option.setName(LEGION_WAR_COMMAND.OPTION_NAME)
                .setDescription(LEGION_WAR_COMMAND.OPTION_DESCRIPTION)
                .setRequired(true)
                .addChoices([
                    [COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
                    [COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
                ])
        ),
    async execute(interaction) {
        await interaction.reply("REGION WAR");
    }
}