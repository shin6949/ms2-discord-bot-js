import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageActionRow, MessageButton} from 'discord.js';
import {OX_QUIZ_COMMAND, COMMON_CONSTANTS} from "../constants.mjs";
import {report_command} from "./command-index.mjs";
import request from 'request';

export default {
    data: new SlashCommandBuilder().setName(OX_QUIZ_COMMAND.COMMAND_NAME)
        .setDescription(OX_QUIZ_COMMAND.COMMAND_DESCRIPTION)
        .addStringOption(option => option.setName(OX_QUIZ_COMMAND.OPTION_NAME)
            .setDescription(OX_QUIZ_COMMAND.OPTION_DESCRIPTION)
            .setRequired(true)),

    async execute(interaction) {
        console.log("OX Interaction Received.");

        const keyword = interaction.options.getString(OX_QUIZ_COMMAND.OPTION_NAME);
        console.log(`Request User ID: ${interaction.user.id} / Keyword: ${keyword}`);

        await interaction.deferReply();

        const requestData = {
            uri: `${process.env.API_SERVER_URL}/ox/search`,
            method: "GET",
            qs: {
                apitoken: process.env.API_TOKEN,
                keyword: keyword
            },
            body: {
                query: `/${OX_QUIZ_COMMAND.COMMAND_NAME} ${OX_QUIZ_COMMAND.OPTION_NAME}:${keyword}`,
                callValue: `${OX_QUIZ_COMMAND.COMMAND_NAME}`,
                isDm: interaction.guildId === null,
                userId: interaction.user.id,
                serverId: interaction.guildId
            },
            json: true,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json'
            }
        };

        request(requestData,async function (err, response, body) {
            // API 서버에서 에러가 발생한 경우
            if (err !== null) {
                console.error(err);
                await interaction.editReply(COMMON_CONSTANTS.ERROR_MESSAGE);
            }

            // 결과가 없는 경우
            if (body.count === 0) {
                await interaction.editReply({content: `\'${keyword}\'에 대한 검색 결과가 없습니다.`, components: [reportButton.button]});
                return;
            }

            await interaction.editReply({content: `\'${keyword}\'에 대한 ${body.count}개의 검색 결과`});
        })
    }
}

// 검색 결과가 없을 시 표출할 버튼 객체 및 액션
export let reportButton = {
    button: new MessageActionRow()
        .addComponents(new MessageButton()
            .setCustomId('ox-report-button')
            .setLabel(OX_QUIZ_COMMAND.REPORT_BUTTON_NAME)
            .setStyle('PRIMARY'),
        ),
    async execute(interaction) {
        await report_command.execute(interaction);
    }
}