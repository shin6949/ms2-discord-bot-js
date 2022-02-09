import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, MINIGAME_COMMAND} from "../constants.mjs";
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs';
import {MessageEmbed} from "discord.js";
import {default as insertLog, Log} from "./insert-log.mjs";

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
        console.log("Minigame interaction received.");
        await interaction.deferReply();

        const url = (optionValue) => {
            // 옵션 종류에 따라 url 변경
            if (optionValue === COMMON_CONSTANTS.SOON) {
                return `${process.env.API_SERVER_URL}/minigame/now`;
            } else {
                return `${process.env.API_SERVER_URL}/minigame/next`;
            }
        }

        const requestData = {
            uri: url(interaction.options.getString(MINIGAME_COMMAND.OPTION_NAME)),
            method: "GET",
            json: true
        }

        requestToAPI(requestData).then(async function(response) {
            await interaction.editReply({embeds: [_configureEmbedContent(response.body)]});
            console.log("Process Success.");

            // Embed 컨텐츠는 String이 아니므로 병렬로 진행
            await _insertLog(response.body, interaction.guildId, interaction.user.id, interaction.options.getString(MINIGAME_COMMAND.OPTION_NAME));

        }).catch(function(err) {
            console.log("ERROR OCCURRED.");
            console.error(err);
            errorHandling(interaction);
        });
    }
}

function _insertLog(body, guildId, userId, optionValue) {
    try {
        const sentMessage = `${body.time}${MINIGAME_COMMAND.EMBED_TITLE}\n` +
            `${MINIGAME_COMMAND.FIRST}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}\n${body["first-game"]}\n` +
            `${MINIGAME_COMMAND.SECOND}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}\n${body["second-game"]}\n` +
            `${MINIGAME_COMMAND.PVP}\n${body['pvp-game']}`;
        const query = `/${MINIGAME_COMMAND.COMMAND_NAME} ${MINIGAME_COMMAND.OPTION_NAME}:${optionValue}`;
        const log = new Log(query, MINIGAME_COMMAND.LOG_CODE, guildId === null, userId, guildId, sentMessage);

        insertLog(log);
    } catch (err) {
        console.error(err);
    }
}

function _configureEmbedContent(body) {
    return new MessageEmbed()
        // 주황색
        .setColor('#d85311')
        .setTitle(`${body.time}${MINIGAME_COMMAND.EMBED_TITLE}`)
        .addFields(
            {name: `${MINIGAME_COMMAND.FIRST}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}`, value: body["first-game"]},
            {name: `${MINIGAME_COMMAND.SECOND}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}`, value: body["second-game"]},
            {name: `${MINIGAME_COMMAND.PVP}`, value: body['pvp-game'] },
        );
}