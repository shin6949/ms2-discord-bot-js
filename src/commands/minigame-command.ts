import { apiRequestForm, COMMON_CONSTANTS, MINIGAME_COMMAND } from '../constants';
import { default as requestToAPI } from './RequestToAPI';
import { default as errorHandling } from './error-handling';
import { ApplicationCommandOptionData, BaseCommandInteraction, MessageEmbed } from 'discord.js';
import { default as insertLog, Log } from './InsertLog';
import { Command } from '../types/command';

const timeOption: ApplicationCommandOptionData = {
  type: 'STRING',
  name: MINIGAME_COMMAND.OPTION_NAME,
  description: MINIGAME_COMMAND.OPTION_DESCRIPTION,
  choices: [
    {
      name: COMMON_CONSTANTS.SOON,
      value: COMMON_CONSTANTS.SOON,
    },
    {
      name: COMMON_CONSTANTS.NEXT,
      value: COMMON_CONSTANTS.NEXT,
    },
  ],
};

const _insertLog = (body, guildId, userId, optionValue) => {
  try {
    const sentMessage =
      `${body.time}${MINIGAME_COMMAND.EMBED_TITLE}\n` +
      `${MINIGAME_COMMAND.FIRST}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}\n${body['first-game']}\n` +
      `${MINIGAME_COMMAND.SECOND}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}\n${body['second-game']}\n` +
      `${MINIGAME_COMMAND.PVP}\n${body['pvp-game']}`;
    const query = `/${MINIGAME_COMMAND.COMMAND_NAME} ${MINIGAME_COMMAND.OPTION_NAME}:${optionValue}`;
    const log = new Log(query, MINIGAME_COMMAND.LOG_CODE, guildId === null, userId, guildId, sentMessage);

    insertLog(log);
  } catch (err) {
    console.error(err);
  }
};

const _configureEmbedContent = (body) => {
  const color: string = COMMON_CONSTANTS.EMBED_COLOR[Math.floor(Math.random() * COMMON_CONSTANTS.EMBED_COLOR.length)];
  return new MessageEmbed()
    .setColor(color)
    .setTitle(`${body.time}${MINIGAME_COMMAND.EMBED_TITLE}`)
    .addFields(
      {
        name: `${MINIGAME_COMMAND.FIRST}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}`,
        value: body['first-game'],
      },
      {
        name: `${MINIGAME_COMMAND.SECOND}${MINIGAME_COMMAND.EMBED_FIELD_TITLE}`,
        value: body['second-game'],
      },
      { name: `${MINIGAME_COMMAND.PVP}`, value: body['pvp-game'] },
    );
};

export const minigameCommand: Command = {
  name: MINIGAME_COMMAND.COMMAND_NAME,
  description: MINIGAME_COMMAND.COMMAND_DESCRIPTION,
  options: [timeOption],
  async run(interaction: BaseCommandInteraction) {
    console.log('Minigame interaction received.');
    await interaction.deferReply();

    const url = (optionValue: string | number | boolean) => {
      // 옵션 종류에 따라 url 변경
      if (optionValue === COMMON_CONSTANTS.SOON) {
        return `${process.env.API_SERVER_URL}/minigame/now`;
      } else {
        return `${process.env.API_SERVER_URL}/minigame/next`;
      }
    };

    const requestData: apiRequestForm = {
      uri: url(interaction.options.get(MINIGAME_COMMAND.OPTION_NAME)?.value ?? ''),
      method: 'GET',
      json: true,
    };

    requestToAPI(requestData)
      // @ts-ignore
      .then(async (response: Response) => {
        await interaction.editReply({ embeds: [_configureEmbedContent(response.body)] });
        console.log('Process Success.');

        // Embed 컨텐츠는 String이 아니므로 병렬로 진행
        _insertLog(response.body, interaction.guildId, interaction.user.id, interaction.options.get(MINIGAME_COMMAND.OPTION_NAME)?.value ?? '');
      })
      .catch((err) => {
        console.log('ERROR OCCURRED.');
        console.error(err);
        errorHandling(interaction);
      });
  },
};
