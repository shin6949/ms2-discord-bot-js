import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageActionRow, MessageButton} from 'discord.js';
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs';
import {default as insertLog} from './insert-log.mjs';
// 상수
import {OX_QUIZ_COMMAND} from "../constants.mjs";
import {report_command} from "./command-index.mjs";

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
            // _sendMessageAndReturnMessage 수행 완료 후, Return 받으면 Promise Object로 변경됨.
            const sentMessage = _sendMessageAndReturnMessage(response.body, interaction, keyword);
            const query = `/${OX_QUIZ_COMMAND.COMMAND_NAME} ${OX_QUIZ_COMMAND.OPTION_NAME}:${keyword}`;
            insertLog(query, OX_QUIZ_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, sentMessage);
            console.log("LOG INSERT FINISHED");
        }).catch(function(err) {
            console.log("ERROR OCCURRED.");
            console.error(err);
            errorHandling(interaction);
        });
    }
}

function _configureMessageAndReturn(body, keyword) {
    let result = `\'${keyword}\'에 대한 ${body.mode} 결과: ${body.count}개\n`;
    const problemList = body.problems;

    problemList.forEach(function (problem) {
        if(problem.answer) {
            result += `\`\`\`ini\n[O] ${problem.question}\`\`\``;
        } else {
            result += `\`\`\`\n[X] ${problem.question}\`\`\``;
        }
    });

    // Discord 글제수 제한 예외처리
    if(result.length > 3000) {
        result = OX_QUIZ_COMMAND.DISCORD_MAX_LETTER_ERROR;
    }

    // 여기까지는 String
    return result;
}

async function _sendMessageAndReturnMessage(body, interaction, keyword) {
    let message = "";

    // 결과가 없는 경우
    if (body.count === 0) {
        message = `\'${keyword}\'에 대한 검색 결과가 없습니다.`;
        await interaction.editReply({content: message, components: [reportButton.button]});
    } else {
        // 결과가 있는 경우
        message = _configureMessageAndReturn(body, keyword);
        await interaction.editReply(message);
    }

    console.log("Process Success.");
    // 여기까지도 String
    return message;
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