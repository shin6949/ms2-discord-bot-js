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
        if(subcommand === FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.COMMAND_NAME) {
            let message = (optionValue) => {
                // 옵션 종류에 따라 url 변경
                if (optionValue === COMMON_CONSTANTS.SOON) {
                    return `${FIELD_BOSS_COMMAND.MESSAGE.SOON} ${FIELD_BOSS_COMMAND.MESSAGE.APPEAR_MESSAGE}`;
                } else {
                    return `${FIELD_BOSS_COMMAND.MESSAGE.NEXT} ${FIELD_BOSS_COMMAND.MESSAGE.APPEAR_MESSAGE}`;
                }
            }

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
            const query = `/${FIELD_BOSS_COMMAND.COMMAND_NAME} ${interaction.options.getSubcommand()} ` +
                `${FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.OPTION_NAME}:${interaction.options.getString(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.OPTION_NAME)}`;

            await _requestAndSendMessage(interaction, requestData, query, message(FIELD_BOSS_COMMAND.SUB_COMMANDS.INSTANT_SEARCH.OPTION_NAME));
        } else if(subcommand === FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.COMMAND_NAME) {
            const time = interaction.options.getString(FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_NAME);
            // 시간 검색의 경우
            const requestData = {
                uri: `${process.env.API_SERVER_URL}/boss/get-by-time`,
                method: "GET",
                qs: {
                    minute: time
                },
                json: true
            }

            const message = `${time}${FIELD_BOSS_COMMAND.MESSAGE.TIME_MESSAGE}`;
            const query = `/${FIELD_BOSS_COMMAND.COMMAND_NAME} ${interaction.options.getSubcommand()} ` +
                `${FIELD_BOSS_COMMAND.SUB_COMMANDS.TIME_SEARCH.OPTION_NAME}:${time}`;

            await _requestAndSendMessage(interaction, requestData, query, message);
        } else {
            // 이름 검색의 경우
            const keyword = interaction.options.getString(FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_NAME);
            const requestData = {
                uri: `${process.env.API_SERVER_URL}/boss/get-by-name`,
                method: "GET",
                qs: {
                    name: keyword
                },
                json: true
            }

            const message = `\'${keyword}\'${FIELD_BOSS_COMMAND.MESSAGE.NAME_MESSAGE}`;
            const query = `/${FIELD_BOSS_COMMAND.COMMAND_NAME} ${interaction.options.getSubcommand()} ` +
                `${FIELD_BOSS_COMMAND.SUB_COMMANDS.NAME_SEARCH.OPTION_NAME}:${keyword}`;

            await _requestAndSendMessage(interaction, requestData, query, message);
        }
    }
}

async function _requestAndSendMessage(interaction, requestData, query, message) {
    requestToAPI(requestData).then(async response => {
        const embedData = _configureEmbedContent(response.body);
        await interaction.editReply({content: message, embeds: embedData});
        console.log("Process Success.");

        _insertLog(interaction, embedData, message, query);
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
        let fields = [
            {name: `${FIELD_BOSS_COMMAND.EMBED_FIELD.NAME}`, value: `${item.bossName}`, inline: true},
            {name: `${FIELD_BOSS_COMMAND.EMBED_FIELD.TIME}`, value: `${item.time}${FIELD_BOSS_COMMAND.EMBED_FIELD.MINUTE}`, inline: true},
            {name: `${FIELD_BOSS_COMMAND.EMBED_FIELD.MAP}`, value: `${item.map}`, inline: true},
            {name: `${FIELD_BOSS_COMMAND.EMBED_FIELD.LEVEL}`, value: `${item.level}`, inline: true}
        ]

        if(item.comment !== null) {
            fields.push({name: `${FIELD_BOSS_COMMAND.EMBED_FIELD.COMMENT}`, value: `${item.comment}`, inline: true});
        }

        const embedContent = new MessageEmbed()
            // 주황색
            .setColor('#d85311')
            .setTitle(`${FIELD_BOSS_COMMAND.EMBED_TITLE}`)
            .addFields(fields);

        result.push(embedContent);
    });

    return result;
}

function _insertLog(interaction, embedData, message, query) {
    let replyData = `${message}\n`;

    embedData.forEach(item => {
        replyData += `${item.title}\n`;
        item.fields.forEach(item => {
            replyData += `${item.name}: ${item.value}\n`;
        });
    });

    const log = new Log(query, FIELD_BOSS_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, replyData);

    try {
        insertLog(log);
    } catch (err) {
        console.error(err);
    }
}