import {SlashCommandBuilder} from "@discordjs/builders";
import {default as requestToAPI} from './request-to-api.mjs';
import {default as errorHandling} from './error-handling.mjs';
import {MessageAttachment, MessageEmbed} from "discord.js";
import insertLog, {Log} from "./insert-log.mjs";
import {COMMON_CONSTANTS} from "../constants.mjs";
import request from "request";
import fs from "fs";

export default {
    data: new SlashCommandBuilder()
        .setName("트로피")
        .setDescription("메이뷰에서 트로피 정보를 받아옵니다.")
        .addSubcommand(subcommand =>
            subcommand.setName("개인")
                .setDescription("특정 캐릭터의 실시간 트로피 정보를 받아옵니다.")
                .addStringOption(option =>
                    option.setName("닉네임")
                        .setDescription("찾을 캐릭터의 닉네임을 입력합니다.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("길드")
                .setDescription("특정 길드의 실시간 트로피의 정보를 받아옵니다.")
                .addStringOption(option =>
                    option.setName("이름")
                        .setDescription("찾을 길드의 이름을 입력합니다.")
                        .setRequired(true))
        ),
    async execute(interaction) {
        console.log("Trophy interaction received.");
        await interaction.deferReply();

        if (interaction.options.getSubcommand() === "개인") {
            await _configureCharacterContent(interaction);
        } else {
            await _configureGuildEmbedContent(interaction);
        }
        // _insertLog(interaction.guildId, interaction.user.id);
    }
}

const _configureCharacterContent = async (interaction) => {
    const keyword = interaction.options.getString("닉네임");
    const requestData = {
        url: `${process.env.API_SERVER_URL}/trophy/character/realtime`,
        qs: {
            nickname: keyword
        },
        json: true
    }

    const response = await requestToAPI(requestData);
    if (response.body.status === "fail") {
        await interaction.editReply({content: `닉네임 \'${keyword}\'에 대한 검색 결과가 없습니다.`});
        return;
    }

    const character = response.body.characters[0];

    const file = await _downloadProfileImage(character.profileUrl, keyword);
    const color = COMMON_CONSTANTS.EMBED_COLOR[Math.floor(Math.random() * COMMON_CONSTANTS.EMBED_COLOR.length)];
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(`캐릭터 검색 결과`)
        .setThumbnail(`attachment://profile.jpg`)
        .addFields(
            {
                name: `닉네임`, value: character.nickname, inline: false
            },
            {
                name: `순위`, value: `${character.rank.toLocaleString()}위`, inline: true
            },
            {
                name: `트로피`, value: `${character.trophy.toLocaleString()}개`, inline: true
            }
        )
        .setFooter({ text: '이 정보는 5분 가량의 차이가 있음.'});

    await interaction.editReply({embeds: [embed], files: [file]});
}

const _configureGuildEmbedContent = async (interaction) => {
    const keyword = interaction.options.getString("이름");
    const requestData = {
        url: `${process.env.API_SERVER_URL}/trophy/guild/realtime`,
        qs: {
            guildname: keyword
        },
        json: true
    }

    const response = await requestToAPI(requestData);
    if (response.body.status === "fail") {
        await interaction.editReply({content: `길드명 \'${keyword}\'에 대한 검색 결과가 없습니다.`});
        return;
    }

    const guild = response.body.guilds[0];

    const file = await _downloadProfileImage(guild.profileUrl, keyword);
    const color = COMMON_CONSTANTS.EMBED_COLOR[Math.floor(Math.random() * COMMON_CONSTANTS.EMBED_COLOR.length)];
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(`길드 검색 결과`)
        .setThumbnail(`attachment://profile.jpg`)
        .addFields(
            {
                name: `닉네임`, value: guild.guildName, inline: false
            },
            {
                name: `순위`, value: `${guild.rank.toLocaleString()}위`, inline: true
            },
            {
                name: `트로피`, value: `${guild.trophy.toLocaleString()}개`, inline: true
            },
            {
                name: `길드장`, value: `${guild.master}`, inline: true
            }
        )
        .setFooter({ text: '이 정보는 5분 가량의 차이가 있음.'});

    await interaction.editReply({embeds: [embed], files: [file]});
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