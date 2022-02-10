import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, FIELD_BOSS_COMMAND} from "../constants.mjs";
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs';
import {MessageEmbed} from "discord.js";
import {default as insertLog, Log} from "./insert-log.mjs";

export default {
    data: new SlashCommandBuilder().setName(FIELD_BOSS_COMMAND.COMMAND_NAME)
        .setDescription(FIELD_BOSS_COMMAND.COMMAND_DESCRIPTION)
        .addSubcommand(subcommand =>
            subcommand.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.COMMAND_NAME)
                .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.COMMAND_DESCRIPTION)
                .addStringOption(option =>
                    option.setName(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.OPTION_NAME)
                        .setDescription(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.OPTION_DESCRIPTION)
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
        console.log("Field Boss interaction received.");
        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();
        if(subcommand === FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH) {
            _instantSearch(interaction);
        } else if(subcommand === FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH) {
            // 시간 검색의 경우
        } else {
            // 이름 검색의 경우
        }
    }
}

function _instantSearch(interaction) {
    const url = (optionValue) => {
        // 옵션 종류에 따라 url 변경
        if (optionValue === COMMON_CONSTANTS.SOON) {
            return `${process.env.API_SERVER_URL}/boss/soon`;
        } else {
            return `${process.env.API_SERVER_URL}/boss/next`;
        }
    }

    const requestData = {
        uri: url(interaction.options.getString(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.OPTION_NAME)),
        method: "GET",
        json: true
    }

    requestToAPI(requestData).then(async response => {
        await interaction.editReply({embeds: _configureEmbedContent(response.body)});
        console.log("Process Success.");

        // Embed 컨텐츠는 String이 아니므로 병렬로 진행
        _insertLog(response.body, interaction.guildId, interaction.user.id, interaction.options.getString(MINIGAME_COMMAND.OPTION_NAME));

    }).catch(err => {
        console.log("ERROR OCCURRED.");
        console.error(err);
        errorHandling(interaction);
    });
}

function _configureEmbedContent(body) {
    const bossList = body.bosses;
    let result = [];

    bossList.forEach(item => {
        const embedContent =  new MessageEmbed()
            // 주황색
            .setColor('#d85311')
            .setTitle(`필드보스 정보`)
            .addFields(
                {name: `이름`, value: item.bossName},
                {name: `등장 시간`, value: `${item.time}분`},
                {name: `등장 맵`, value: item.map },
                {name: `레벨`, value: item.level },
                body.comment === null ? {name: `특이사항`, value: `${body.comment}` } : null
            );
        result.push(embedContent);
    });

    return result;
}