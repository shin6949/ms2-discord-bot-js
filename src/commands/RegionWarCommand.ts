import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, LEGION_WAR_COMMAND} from "../constants";
import {ApplicationCommandOptionData, BaseCommandInteraction, MessageEmbed} from "discord.js";
import {default as errorHandling} from './error-handling';
import insertLog, {Log} from "./insert-log";
import requestToAPI from './RequestToAPI';
import {Command} from "../types/command";

const _insertLog = (body, guildId, userId, optionValue) => {
    const sentMessage = `${body.time}${LEGION_WAR_COMMAND.EMBED_TITLE}\n${LEGION_WAR_COMMAND.EMBED_DESCRIPTION}\n` +
        `${LEGION_WAR_COMMAND.FIRST}${LEGION_WAR_COMMAND.EMBED_FIELD_TITLE}\n${body["legion-wars"][0].name}\n` +
        `${LEGION_WAR_COMMAND.SECOND}${LEGION_WAR_COMMAND.EMBED_FIELD_TITLE}\n${body["legion-wars"][1].name}`;
    const query = `/${LEGION_WAR_COMMAND.COMMAND_NAME} ${LEGION_WAR_COMMAND.OPTION_NAME}:${optionValue}`;
    const log = new Log(query, LEGION_WAR_COMMAND.LOG_CODE, guildId === null, userId, guildId, sentMessage);

    insertLog(log).catch(err => {
        console.error(err);
    });
}

const _configureEmbedContent = (body) => {
    return new MessageEmbed()
        // 주황색
        .setColor('#d85311')
        .setTitle(`${body.time}${LEGION_WAR_COMMAND.EMBED_TITLE}`)
        .setDescription(LEGION_WAR_COMMAND.EMBED_DESCRIPTION)
        .addFields(
            {
                name: `${LEGION_WAR_COMMAND.FIRST}${LEGION_WAR_COMMAND.EMBED_FIELD_TITLE}`,
                value: body["legion-wars"][0].name
            },
            {
                name: `${LEGION_WAR_COMMAND.SECOND}${LEGION_WAR_COMMAND.EMBED_FIELD_TITLE}`,
                value: body["legion-wars"][1].name
            }
        );
}

const timeOption : ApplicationCommandOptionData = {
    type: "STRING"
}

export const regionWarCommand: Command = {
    name: LEGION_WAR_COMMAND.COMMAND_NAME,
    description: LEGION_WAR_COMMAND.COMMAND_DESCRIPTION,
    options: [],

    // data: new SlashCommandBuilder().setName(LEGION_WAR_COMMAND.COMMAND_NAME)
    //     .setDescription(LEGION_WAR_COMMAND.COMMAND_DESCRIPTION)
    //     .addStringOption(option =>
    //         option.setName(LEGION_WAR_COMMAND.OPTION_NAME)
    //             .setDescription(LEGION_WAR_COMMAND.OPTION_DESCRIPTION)
    //             .setRequired(true)
    //             .addChoices([
    //                 [COMMON_CONSTANTS.SOON, COMMON_CONSTANTS.SOON],
    //                 [COMMON_CONSTANTS.NEXT, COMMON_CONSTANTS.NEXT]
    //             ])
    //     ),
    async run(interaction: BaseCommandInteraction) {
        console.log("LegionWar interaction received.");
        await interaction.deferReply();

        const url = (optionValue: string | number | boolean) => {
            // 옵션 종류에 따라 url 변경
            if (optionValue === COMMON_CONSTANTS.SOON) {
                return `${process.env.API_SERVER_URL}/legion/soon`;
            } else {
                return `${process.env.API_SERVER_URL}/legion/next`;
            }
        }

        const requestData = {
            uri: url(interaction.options.get(LEGION_WAR_COMMAND.OPTION_NAME)?.value ?? ""),
            method: "GET",
            json: true
        }

        requestToAPI(requestData)
            // @ts-ignore
            .then(async (response: Response) => {
            await interaction.editReply({embeds: [_configureEmbedContent(response.body)]});
            console.log("Process Success.");

            // Embed 컨텐츠는 String이 아니므로 병렬로 진행
            _insertLog(response.body, interaction.guildId, interaction.user.id, interaction.options.get(LEGION_WAR_COMMAND.OPTION_NAME)?.value ?? "");
        }).catch(err => {
            console.log("ERROR OCCURRED.");
            console.error(err);
            errorHandling(interaction);
        });
    }
}