import {SlashCommandBuilder} from "@discordjs/builders";
import insertLog, {Log} from "./insert-log.mjs";

export default {
    data: new SlashCommandBuilder()
        .setName("개인트로피")
        .setDescription("메이뷰에서 개인 트로피 정보를 받아옵니다."),
    async execute(interaction) {
        await interaction.reply(REPORT_COMMAND.COMMAND_REPLY);

        _insertLog(interaction.guildId, interaction.user.id);
    }
}