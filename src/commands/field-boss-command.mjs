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
                        .addChoices([
                            [ '그리폰', '그리폰' ],
                            [ '그리피나', '그리피나' ],
                            [ '냉혈한 바포메트', '냉혈한 바포메트' ],
                            [ '데블린 워리어', '데블린 워리어' ],
                            [ '데블린 치프', '데블린 치프' ],
                            [ '둔둔', '둔둔' ],
                            [ '레르노스', '레르노스' ],
                            [ '로로와 무무스', '로로와 무무스' ],
                            [ '마크52 알파', '마크52 알파' ],
                            [ '바야르 수문장', '바야르 수문장' ],
                            [ '분노의 바포메트', '분노의 바포메트' ],
                            [ '아마돈', '아마돈' ],
                            [ '아머드 체키', '아머드 체키' ],
                            [ '아크레온', '아크레온' ],
                            [ '알파터틀', '알파터틀' ],
                            [ '우레우스', '우레우스' ],
                            [ '이카르 마드', '이카르 마드' ],
                            [ '자이언트 터틀', '자이언트 터틀' ],
                            [ '토토와 구구스', '토토와 구구스' ],
                            [ '페카노스', '페카노스' ]
                        ])
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        await interaction.reply("Field Boss");
    }
}