export let COMMON_CONSTANTS = {
    SOON: "곧",
    NEXT: "다음",
    ERROR_MESSAGE: "처리 중 오류가 발생하였습니다.",
    BAN_MESSAGE: "차단된 사용자로 사용이 불가능합니다.",
    EMBED_COLOR: [
        // 출처: https://horangi.tistory.com/259
        "#FFF56E", "#FFFA78", "#FFFA82", "#FFFF8C", "#FFFF96",
        "#FFE650", "#FFEB5A", "#FFF064", "#FFF56E", "#FFF978",
        "#FFD232", "#FFD73C", "#FFDC46", "#FFE150", "#FFE65A",
        "#FFC300", "#FFC800", "#FFCD00", "#FFD200", "#FFD700",
        "#FF9100", "#FF9B00", "#FFA500", "#FFAF00", "#FFB900",
        "#FFDBC1", "#FFE0C6", "#FFE5CB", "#FFEAD0", "#FFEFD5",
        "#FFD0A1", "#FFD5A6", "#FFDAAB", "#FFDFB0", "#FFE4B5",
        "#FFA98F", "#FFB399", "#FFBDA3", "#FFC7AD", "#FFD1B7",
        "#FF9E7D", "#FFA887", "#FFB291", "#FFBC9B", "#FFC6A5",
        "#E1B771", "#E6C17B", "#EBC680", "#F0CB85", "#F5D08A",
        "#E19B50", "#E6A55A", "#EBAA5F", "#EBAF64", "#F0B469",
        "#CD853F", "#CD8F49", "#D29953", "#D7A35D", "#DCAD67",
        "#D2691E", "#D27328", "#D27D32", "#D7873C", "#DC9146",
        "#FFDCE1", "#FFE1E6", "#FFE6EB", "#FFEBF0", "#FFF0F5",
        "#FFCFDA", "#FFD4DF", "#FFD9E4", "#FFDEE9", "#FFE3EE",
        "#FFB6C1", "#FFBBC6", "#FFC0CB", "#FFC5D0", "#FFCAD5",
        "#FF9E9B", "#FFAAAF", "#FFB4B9", "#FFBEC3", "#FFC8CD",
        "#FF88A7", "#FF92B1", "#FF9CBB", "#FFA6C5", "#FFB0CF",
        "#FF5675", "#FF607F", "#FF6A89", "#FF7493", "#FF7E9D",
        "#FFAAFF", "#FFBEFF", "#FFC8FF", "#FFD2FF", "#FFDCFF",
        "#FFAFE6", "#FFB4EB", "#FFB9F0", "#FFBEF5", "#FFC3FA",
        "#FF82FF", "#FF8CFF", "#FF96FF", "#FFA0FF", "#FFAAFF",
        "#FF46C5", "#FF50CF", "#FF5AD9", "#FF64E3", "#FF6EED",
        "#3DFF92", "#47FF9C", "#51FFA6", "#5BFFB0", "#65FFBA",
        "#6FFFC4", "#79FFCE", "#75FFCA", "#A5FFE4", "#AFFFEE",
        "#98EBDC", "#9DF0E1", "#A2F5E6", "#A7FAEB", "#ACFFEF",
        "#AAEBAA", "#B4F0B4", "#BEF5BE", "#C8FAC8", "#D2FFD2",
        "#DCFFDC", "#E1FFE1", "#E6FFE6", "#EBFFEB", "#F0FFF0",
        "#80E12A", "#8AE634", "#94EB3E", "#9EF048", "#A8F552",
        "#B2FA5C", "#BCFF66", "#C1FF6B", "#C6FF70", "#CBFF75",
        "#228B22", "#2C952C", "#369F36", "#40A940", "#4AB34A",
        "#54BD54", "#5EC75E", "#63CC63", "#68D168", "#6DD66D",
        "#008C8C", "#0A9696", "#14A0A0", "#1EAAAA", "#28B4B4",
        "#32BEBE", "#37C3C3", "#3CC8C8", "#41CDCD", "#46D2D2",
        "#ACF3FF", "#B0F7FF", "#B4FBFF", "#B9FFFF", "#C0FFFF",
        "#32F1FF", "#3CFBFF", "#46FFFF", "#96FFFF", "#C8FFFF",
        "#00D7FF", "#00E1FF", "#00EBFF", "#00F5FF", "#00FFFF",
        "#93DAFF", "#98DFFF", "#9DE4FF", "#A2E9FF", "#A7EEFF",
        "#00BFFF", "#0AC9FF", "#14D3FF", "#1EDDFF", "#28E7FF",
        "#00A5FF", "#00AFFF", "#00B9FF", "#00C3FF", "#00CDFF",
        "#BECDFF", "#C8D7FF", "#D2E1FF", "#DCEBFF", "#E8F5FF",
        "#90AFFF", "#9AB9FF", "#A4C3FF", "#AECDFF", "#B8D7FF",
        "#6495ED", "#6E9FED", "#78A9ED", "#82B3ED", "#8CBDED",
        "#96C7ED", "#A0D1F7", "#AADBFF", "#B4E5FF", "#BEEFFF",
        "#0078FF", "#0A82FF", "#148CFF", "#1E96FF", "#28A0FF",
        "#32AAFF", "#3CB4FF", "#46BEFF", "#50C8FF", "#5AD2FF",
        "#0078FF", "#0A82FF", "#148CFF", "#1E96FF"
    ]
}

export let OX_QUIZ_COMMAND = {
    COMMAND_NAME: "ox",
    COMMAND_DESCRIPTION: "OX 퀴즈쇼 족보를 검색합니다.",
    OPTION_NAME: "검색어",
    OPTION_DESCRIPTION: "문제의 일부를 입력하여 검색합니다.",
    REPORT_BUTTON_NAME: "제보하기",
    DISCORD_MAX_LETTER_ERROR: "디스코드 내 최대 글자수 제한이 있어서 결과를 표시 할 수 없습니다. 좀 더 길게 검색해보세요.",
    LOG_CODE: "ox"
}

export let MINIGAME_COMMAND = {
    COMMAND_NAME: "미니게임",
    COMMAND_DESCRIPTION: "곧/다음에 등장하는 미니게임을 봅니다.",
    OPTION_NAME: "타이밍",
    OPTION_DESCRIPTION: "표시할 시간을 결정하세요.",
    EMBED_TITLE: "에 진행될 미니게임",
    FIRST: "첫",
    SECOND: "두",
    PVP: "PvP",
    EMBED_FIELD_TITLE: "번째 미니게임",
    LOG_CODE: "mini"
}

export let FIELD_BOSS_COMMAND = {
    COMMAND_NAME: "필드보스",
    COMMAND_DESCRIPTION: "곧/다음에 등장하는 필드보스의 정보를 보거나 특정 필드보스를 검색합니다.",
    LOG_CODE: "boss",
    MESSAGE: {
        SOON: "곧",
        NEXT: "다음 시간에",
        APPEAR_MESSAGE: "등장할 필드보스의 정보입니다.",
        TIME_MESSAGE: "분에 등장하는 필드보스의 정보입니다.",
        NAME_MESSAGE: "에 대한 검색 결과입니다."
    },
    EMBED_TITLE: "필드보스 정보",
    EMBED_FIELD: {
        NAME: "이름",
        TIME: "등장 시간",
        MAP: "등장 맵",
        MINUTE: "분",
        LEVEL: "레벨",
        COMMENT: "특이 사항"
    },
    SUB_COMMANDS: {
        INSTANT_SEARCH: {
            COMMAND_NAME: "정보",
            COMMAND_DESCRIPTION: "곧/다음에 등장하는 필드보스의 정보를 봅니다.",
            OPTION_NAME: "타이밍",
            OPTION_DESCRIPTION: "표시할 시간을 선택하세요."
        },
        TIME_SEARCH: {
            COMMAND_NAME: "시간검색",
            COMMAND_DESCRIPTION: "특정 시간에 나오는 필드보스를 검색할 수 있습니다.",
            OPTION_NAME: "시간",
            OPTION_DESCRIPTION: "해당 분에 등장하는 보스의 정보를 보여줍니다.",
            OPTION_CHOICES: [
                ['5분', '5'],
                ['15분', '15'],
                ['25분', '25'],
                ['35분', '35'],
                ['40분', '40'],
                ['45분', '45'],
                ['55분', '55']
            ]
        },
        NAME_SEARCH: {
            COMMAND_NAME: "이름검색",
            COMMAND_DESCRIPTION: "특정 보스의 이름을 선택하여 정보를 볼 수 있습니다.",
            OPTION_NAME: "이름",
            OPTION_DESCRIPTION: "이름을 입력하면 해당하는 보스의 정보를 보여줍니다.",
            OPTION_CHOICES: [
                ['그리폰', '그리폰'],
                ['그리피나', '그리피나'],
                ['냉혈한 바포메트', '냉혈한 바포메트'],
                ['데블린 워리어', '데블린 워리어'],
                ['데블린 치프', '데블린 치프'],
                ['둔둔', '둔둔'],
                ['레르노스', '레르노스'],
                ['로로와 무무스', '로로와 무무스'],
                ['마크52 알파', '마크52 알파'],
                ['바야르 수문장', '바야르 수문장'],
                ['분노의 바포메트', '분노의 바포메트'],
                ['아마돈', '아마돈'],
                ['아머드 체키', '아머드 체키'],
                ['아크레온', '아크레온'],
                ['알파터틀', '알파터틀'],
                ['우레우스', '우레우스'],
                ['이카르 마드', '이카르 마드'],
                ['자이언트 터틀', '자이언트 터틀'],
                ['토토와 구구스', '토토와 구구스'],
                ['페카노스', '페카노스']
            ]
        }
    }
}

export let LEGION_WAR_COMMAND = {
    COMMAND_NAME: "군단전",
    COMMAND_DESCRIPTION: "곧/다음에 등장할 군단전의 정보를 봅니다.",
    OPTION_NAME: "타이밍",
    OPTION_DESCRIPTION: "표시할 시간을 선택하세요.",
    EMBED_TITLE: "에 진행될 군단전",
    EMBED_DESCRIPTION: "2개 중 하나가 진행됩니다.",
    FIRST: "첫",
    SECOND: "두",
    EMBED_FIELD_TITLE: "번째 군단전",
    LOG_CODE: "legion"
}

export let REPORT_COMMAND = {
    COMMAND_NAME: "제보",
    COMMAND_DESCRIPTION: "제보를 위한 이메일 정보를 봅니다.",
    // dotenv 환경에서는 Email이 안 들어가지만, Docker에서 미리 정의한 경우에는 될 것으로 보임.
    COMMAND_REPLY: `제보는 ${process.env.EMAIL}으로 부탁드립니다.`,
    LOG_CODE: "custom"
}