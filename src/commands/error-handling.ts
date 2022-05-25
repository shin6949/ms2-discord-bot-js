import {COMMON_CONSTANTS} from "../constants";

export default async function (interaction){
    try {
        await interaction.reply({ content: COMMON_CONSTANTS.ERROR_MESSAGE, ephemeral: true });
    } catch (err) {
        await interaction.editReply({ content: COMMON_CONSTANTS.ERROR_MESSAGE, ephemeral: true });
    }
}