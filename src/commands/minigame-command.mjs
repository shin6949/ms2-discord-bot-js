import {SlashCommandBuilder} from "@discordjs/builders";
import {COMMON_CONSTANTS, MINIGAME_COMMAND} from "../constants.mjs";
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs';
import {MessageEmbed} from "discord.js";

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

        let url = "";
        // 옵션 종류에 따라 url 변경
        if(interaction.options.getString(MINIGAME_COMMAND.OPTION_NAME) === COMMON_CONSTANTS.SOON) {
            url = `${process.env.API_SERVER_URL}/minigame/now`;
        } else {
            url = `${process.env.API_SERVER_URL}/minigame/next`;
        }

        const requestData = {
            uri: url,
            method: "GET",
            json: true
        }

        requestToAPI(requestData).then(async function(response) {
            await interaction.editReply({embeds: [_configure_embed_content(response.body)]});
            console.log("Process Success.");

        }).catch(function(err) {
            console.log("ERROR OCCURRED.");
            console.error(err);
            errorHandling(interaction);
        });
    }
}

function _configure_embed_content(body) {
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