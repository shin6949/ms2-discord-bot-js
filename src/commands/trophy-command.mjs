import {SlashCommandBuilder} from "@discordjs/builders";
import {default as requestToAPI} from './request-to-api.mjs';
import {MessageAttachment, MessageEmbed} from "discord.js";
import insertLog, {Log} from "./insert-log.mjs";
import {COMMON_CONSTANTS, TROPHY_COMMAND} from "../constants.mjs";
import request from "request";
import fs from "fs";

export default {
    data: new SlashCommandBuilder()
        .setName(TROPHY_COMMAND.COMMAND_NAME)
        .setDescription(TROPHY_COMMAND.COMMAND_DESCRIPTION)
        .addSubcommand(subcommand =>
            subcommand.setName(TROPHY_COMMAND.CHARACTER_SEARCH.COMMAND_NAME)
                .setDescription(TROPHY_COMMAND.CHARACTER_SEARCH.COMMAND_DESCRIPTION)
                .addStringOption(option =>
                    option.setName(TROPHY_COMMAND.CHARACTER_SEARCH.OPTION_NAME)
                        .setDescription(TROPHY_COMMAND.CHARACTER_SEARCH.OPTION_DESCRIPTION)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName(TROPHY_COMMAND.GUILD_SEARCH.COMMAND_NAME)
                .setDescription(TROPHY_COMMAND.GUILD_SEARCH.COMMAND_DESCRIPTION)
                .addStringOption(option =>
                    option.setName(TROPHY_COMMAND.GUILD_SEARCH.OPTION_NAME)
                        .setDescription(TROPHY_COMMAND.GUILD_SEARCH.OPTION_DESCRIPTION)
                        .setRequired(true))
        ),
    async execute(interaction) {
        console.log("Trophy interaction received.");
        await interaction.deferReply();

        if (interaction.options.getSubcommand() === TROPHY_COMMAND.CHARACTER_SEARCH.COMMAND_NAME) {
            await _sendCharacterContent(interaction);
        } else {
            await _sendGuildContent(interaction);
        }
    }
}

const _sendCharacterContent = async (interaction) => {
    const keyword = interaction.options.getString(TROPHY_COMMAND.CHARACTER_SEARCH.OPTION_NAME);
    const query = `/${TROPHY_COMMAND.COMMAND_NAME} ${TROPHY_COMMAND.CHARACTER_SEARCH.OPTION_NAME}:${keyword}`;
    const requestData = {
        url: `${process.env.API_SERVER_URL}/trophy/character/realtime`,
        qs: {
            nickname: keyword
        },
        json: true
    }

    const response = await requestToAPI(requestData);
    if (response.body.status === "fail") {
        const message = `${TROPHY_COMMAND.CHARACTER_SEARCH.OPTION_NAME} \'${keyword}\'${TROPHY_COMMAND.NO_RESULT_COMMENT}`;
        await interaction.editReply({content: message});

        const log = new Log(query, TROPHY_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, message);
        insertLog(log);
        return;
    }

    const character = response.body.characters[0];

    const file = await _downloadProfileImage(character.profileUrl, keyword);
    const color = COMMON_CONSTANTS.EMBED_COLOR[Math.floor(Math.random() * COMMON_CONSTANTS.EMBED_COLOR.length)];
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(TROPHY_COMMAND.CHARACTER_SEARCH.EMBED_TITLE)
        .setThumbnail(`attachment://profile.jpg`)
        .addFields(
            {
                name: TROPHY_COMMAND.CHARACTER_SEARCH.NICKNAME, value: character.nickname, inline: false
            },
            {
                name: TROPHY_COMMAND.RANK, value: `${character.rank.toLocaleString()}${TROPHY_COMMAND.RANK_UNIT}`, inline: true
            },
            {
                name: TROPHY_COMMAND.TROPHY, value: `${character.trophy.toLocaleString()}${TROPHY_COMMAND.TROPHY_UNIT}`, inline: true
            }
        )
        .setFooter({ text: TROPHY_COMMAND.FOOTER});

    await interaction.editReply({embeds: [embed], files: [file]});

    const message = `${TROPHY_COMMAND.CHARACTER_SEARCH.EMBED_TITLE}\n${TROPHY_COMMAND.CHARACTER_SEARCH.NICKNAME}:${character.nickname}` +
    `${TROPHY_COMMAND.RANK}:${character.rank.toLocaleString()}${TROPHY_COMMAND.RANK_UNIT}\n` +
    `${TROPHY_COMMAND.TROPHY}:${character.trophy.toLocaleString()}${TROPHY_COMMAND.TROPHY_UNIT}\n` +
    `${TROPHY_COMMAND.FOOTER}`;
    const log = new Log(query, TROPHY_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, message);
    insertLog(log);
}

const _sendGuildContent = async (interaction) => {
    const keyword = interaction.options.getString(TROPHY_COMMAND.GUILD_SEARCH.OPTION_NAME);
    const query = `/${TROPHY_COMMAND.COMMAND_NAME} ${TROPHY_COMMAND.GUILD_SEARCH.OPTION_NAME}:${keyword}`;
    const requestData = {
        url: `${process.env.API_SERVER_URL}/trophy/guild/realtime`,
        qs: {
            guildname: keyword
        },
        json: true
    }

    const response = await requestToAPI(requestData);
    if (response.body.status === "fail") {
        const message = `${TROPHY_COMMAND.GUILD_SEARCH.OPTION_NAME} \'${keyword}\'${TROPHY_COMMAND.NO_RESULT_COMMENT}`;
        await interaction.editReply({content: message});

        const log = new Log(query, TROPHY_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, message);
        insertLog(log).catch();
        return;
    }

    const guild = response.body.guilds[0];

    const file = await _downloadProfileImage(guild.profileUrl, keyword);
    const color = COMMON_CONSTANTS.EMBED_COLOR[Math.floor(Math.random() * COMMON_CONSTANTS.EMBED_COLOR.length)];
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(TROPHY_COMMAND.GUILD_SEARCH.EMBED_TITLE)
        .setThumbnail(`attachment://profile.jpg`)
        .addFields(
            {
                name: TROPHY_COMMAND.GUILD_SEARCH.GUILD_NAME, value: guild.guildName, inline: false
            },
            {
                name: TROPHY_COMMAND.RANK, value: `${guild.rank.toLocaleString()}${TROPHY_COMMAND.RANK_UNIT}`, inline: true
            },
            {
                name: TROPHY_COMMAND.TROPHY, value: `${guild.trophy.toLocaleString()}${TROPHY_COMMAND.TROPHY_UNIT}`, inline: true
            },
            {
                name: TROPHY_COMMAND.GUILD_SEARCH.GUILD_MASTER, value: guild.master, inline: true
            }
        )
        .setFooter({ text: TROPHY_COMMAND.FOOTER});

    await interaction.editReply({embeds: [embed], files: [file]});

    const message = `${TROPHY_COMMAND.GUILD_SEARCH.EMBED_TITLE}\n${TROPHY_COMMAND.GUILD_SEARCH.GUILD_NAME}:${guild.name}` +
        `${TROPHY_COMMAND.RANK}:${guild.rank.toLocaleString()}${TROPHY_COMMAND.RANK_UNIT}\n` +
        `${TROPHY_COMMAND.TROPHY}:${guild.trophy.toLocaleString()}${TROPHY_COMMAND.TROPHY_UNIT}\n` +
        `${TROPHY_COMMAND.GUILD_SEARCH.GUILD_MASTER}:${guild.master}\n` +
        `${TROPHY_COMMAND.FOOTER}`;
    const log = new Log(query, TROPHY_COMMAND.LOG_CODE, interaction.guildId === null, interaction.user.id, interaction.guildId, message);
    insertLog(log).catch();
}

const _downloadProfileImage = (url, filename) => {
    const requestData = {
        method: "GET",
        uri: url
    };

    return new Promise(async (resolve, reject) => {
        request(requestData, () => {
            resolve(new MessageAttachment()
                .setFile(`${process.env.FILE_PATH}/${filename}.jpg`)
                .setName(`profile.jpg`));
        }).pipe(fs.createWriteStream(`${process.env.FILE_PATH}/${filename}.jpg`));
    });
}