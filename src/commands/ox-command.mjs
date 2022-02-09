import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageActionRow, MessageButton} from 'discord.js';
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs';
import {default as insertLog, Log} from './insert-log.mjs';
import {report_command} from "./command-index.mjs";
// 상수
import {OX_QUIZ_COMMAND} from "../constants.mjs";

export default {
    data: new SlashCommandBuilder().setName(OX_QUIZ_COMMAND.COMMAND_NAME)
        .setDescription(OX_QUIZ_COMMAND.COMMAND_DESCRIPTION)
        .addStringOption(option => option.setName(OX_QUIZ_COMMAND.OPTION_NAME)
            .setDescription(OX_QUIZ_COMMAND.OPTION_DESCRIPTION)
            .setRequired(true)),

    async execute(interaction) {
        console.log("OX Interaction Received.");

        const keyword = interaction.options.getString(OX_QUIZ_COMMAND.OPTION_NAME);
        await interaction.deferReply();

        const requestData = {
            uri: `${process.env.API_SERVER_URL}/ox/search`,
            method: "GET",
            qs: {
                keyword: keyword
            },
            json: true,
        };

        requestToAPI(requestData).then(function(response) {
            const sentMessage = _sendMessageAndReturnMessage(response.body, interaction, keyword);
            const query = `/${OX_QUIZ_COMMAND.COMMAND_NAME} ${OX_QUIZ_COMMAND.OPTION_NAME}:${keyword}`;
            const log = new Log(query, OX_QUIZ_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, sentMessage);

            insertLog(log);
        }).catch(function(err) {
            console.log("ERROR OCCURRED.");
            console.error(err);
            errorHandling(interaction);
        });
    }
}

function _configureMessageAndReturn(body, keyword) {
    let message = `\'${keyword}\'에 대한 ${body.mode} 결과: ${body.count}개`;

    // 결과가 없는 경우
    if (body.count === 0) {
        message = `\'${keyword}\'에 대한 검색 결과가 없습니다.`;
        return {content: message, components: [reportButton.button]};
    }

    const problemList = body.problems;

    problemList.forEach(function (problem) {
        if(problem.answer) {
            message += `\`\`\`ini\n[O] ${problem.question}\`\`\``;
        } else {
            message += `\`\`\`\n[X] ${problem.question}\`\`\``;
        }
    });

    // Discord 글제수 제한 예외처리
    if(message.length > 3000) {
        message = OX_QUIZ_COMMAND.DISCORD_MAX_LETTER_ERROR;
    }

    return {content: message};
}

function _sendMessageAndReturnMessage(body, interaction, keyword) {
    const message = _configureMessageAndReturn(body, keyword);
    interaction.editReply(message);
    console.log("Process Success.");

    return message.content;
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