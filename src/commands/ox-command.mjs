import {SlashCommandBuilder} from "@discordjs/builders";
import {MessageActionRow, MessageButton} from 'discord.js';
import {OX_QUIZ_COMMAND} from "../constants.mjs";
import {report_command} from "./command-index.mjs";
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs'

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

        let requestData = {
            uri: `${process.env.API_SERVER_URL}/ox/search`,
            method: "GET",
            qs: {
                keyword: keyword
            },
            json: true,
        };

        const res = requestToAPI(requestData).then(async function(response) {
            // 결과가 없는 경우
            if (response.body.count === 0) {
                await interaction.editReply({content: `\'${keyword}\'에 대한 검색 결과가 없습니다.`, components: [reportButton.button]});
                return;
            }

            // 결과가 있는 경우
            await interaction.editReply(_configure_message(response.body, keyword));

        }).catch(function(err) {
            errorHandling(interaction);
        });
    }
}

function _configure_message(body, keyword) {
    let result = `\'${keyword}\'에 대한 ${body.mode} 결과: ${body.count}개\n`;
    const problemList = body.problems;

    problemList.forEach(function (problem) {
        if(problem.answer) {
            result += `\`\`\`ini\n[O] ${problem.question}\`\`\``;
        } else {
            result += `\`\`\`\n[X] ${problem.question}\`\`\``;
        }
    });

    if(result.length > 3000) {
        result = OX_QUIZ_COMMAND.DISCORD_MAX_LETTER_ERROR;
    }

    return result;
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