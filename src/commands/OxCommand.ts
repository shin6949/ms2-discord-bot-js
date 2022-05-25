import {
  ApplicationCommandOptionData,
  BaseCommandInteraction, MessageActionRow, MessageButton,
} from "discord.js";
import { default as requestToAPI } from "./RequestToAPI";
import { default as errorHandling } from "./error-handling";
import { default as insertLog, Log } from "./insert-log";
import { reportCommand } from "./ReportCommand";
import {Command} from "../types/command";
// 상수
import {apiRequestForm, OX_QUIZ_COMMAND} from "../constants";
import {Response} from "request";

const keywordOption : ApplicationCommandOptionData = {
  type: "STRING",
  name: OX_QUIZ_COMMAND.OPTION_NAME,
  description: OX_QUIZ_COMMAND.OPTION_DESCRIPTION,
  required: true
}

interface apiResponse {
  mode: string,
  count: number,
  problems: problem[]
}

interface problem {
  answer: boolean,
  question: string
}

const _configureMessageAndReturn = (body: apiResponse, keyword: string | number | boolean) => {
  let message = `\'${keyword}\'에 대한 ${body.mode} 결과: ${body.count}개`;
  const problemList = body.problems;

  // 결과가 없는 경우
  if (body.count === 0) {
    message = `\'${keyword}\'에 대한 검색 결과가 없습니다.`;
    return { content: message, components: [reportButton.button] };
  }

  problemList.forEach((problem) => {
    if (problem.answer) {
      message += `\`\`\`ini\n[O] ${problem.question}\`\`\``;
    } else {
      message += `\`\`\`\n[X] ${problem.question}\`\`\``;
    }
  });

  // Discord 글제수 제한 예외처리
  if (message.length > 3000) {
    message = OX_QUIZ_COMMAND.DISCORD_MAX_LETTER_ERROR;
  }

  return { content: message };
};

const _sendMessageAndReturnMessage = async (body: apiResponse, interaction: BaseCommandInteraction, keyword: string | number | boolean) => {
  const message = _configureMessageAndReturn(body, keyword);
  await interaction.editReply(message);
  console.log("Process Success.");

  return message.content;
};

// 검색 결과가 없을 시 표출할 버튼 객체 및 액션
export let reportButton = {
  button: new MessageActionRow()
      .addComponents(new MessageButton()
          .setCustomId('ox-report-button')
          .setLabel(OX_QUIZ_COMMAND.REPORT_BUTTON_NAME)
          .setStyle('PRIMARY'),
      ),
  async execute(interaction: BaseCommandInteraction) {
    await reportCommand.run(interaction);
  }
}
export const oxCommand: Command = {
  name: OX_QUIZ_COMMAND.COMMAND_NAME,
  description: OX_QUIZ_COMMAND.COMMAND_DESCRIPTION,
  options: [keywordOption],
  async run(interaction: BaseCommandInteraction): Promise<void> {
    console.log("OX Interaction Received.");

    // get으로 호출할 경우 key-value의 값이 등장.
    const keyword = interaction.options.get(OX_QUIZ_COMMAND.OPTION_NAME)?.value ?? "";
    await interaction.deferReply();

    const requestData : apiRequestForm = {
      uri: `${process.env.API_SERVER_URL}/ox/search`,
      method: "GET",
      qs: {
        keyword: keyword,
      },
      json: true,
    };

    requestToAPI(requestData)
        // @ts-ignore
        .then((response: Response) => {
          const sentMessage = _sendMessageAndReturnMessage(response.body, interaction, keyword);
          const query = `/${OX_QUIZ_COMMAND.COMMAND_NAME} ${OX_QUIZ_COMMAND.OPTION_NAME}:${keyword}`;
          const log = new Log(query, OX_QUIZ_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, sentMessage);

          insertLog(log);
        })
        .catch((err: Error) => {
          console.log("ERROR OCCURRED.");
          console.error(err);
          errorHandling(interaction);
        });
  },
};