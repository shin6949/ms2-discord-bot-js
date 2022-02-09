import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, FIELD_BOSS_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder().setName(FIELD_BOSS_COMMAND.COMMAND_NAME)
        .setDescription(FIELD_BOSS_COMMAND.COMMAND_DESCRIPTION)
        .addSubcommand(subcommand =>
            subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.COMMAND_NAME)
                .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.COMMAND_DESCRIPTION)
                .addStringOption(option =>
                    option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.OPTION_NAME)
                        .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.INFORMATION.OPTION_DESCRIPTION)
                        .setRequired(true)
                        .addChoices([
                            [COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
                            [COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
                        ]))
        )
        .addSubcommand(subcommand =>
            subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_NAME)
                .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_DESCRIPTION)
                .addStringOption(option =>
                    option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_NAME)
                        .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_DESCRIPTION)
                        .setRequired(true)
                        .addChoices(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_CHOICES)
                )
        )
        .addSubcommand( subcommand =>
            subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.COMMAND_NAME)
                .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.COMMAND_DESCRIPTION)
                .addStringOption(option =>
                    option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_NAME)
                        .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_DESCRIPTION)
                        .addChoices(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_CHOICES)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        await interaction.reply("Field Boss");
    }
}