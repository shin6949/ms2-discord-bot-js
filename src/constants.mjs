export let COMMON_CONSTANTS = {
    SOON: "곧",
    NEXT: "다음",
    ERROR_MESSAGE: "처리 중 오류가 발생하였습니다.",
    BAN_MESSAGE: "차단된 사용자로 사용이 불가능합니다."
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
                [ '그리폰', '그리폰' ],
                [ '그리피나', '그리피나' ],
                [ '냉혈한 바포메트', '냉혈한 바포메트' ],
                [ '데블린 워리어', '데블린 워리어' ],
                [ '데블린 치프', '데블린 치프' ],
                [ '둔둔', '둔둔' ],
                [ '레르노스', '레르노스' ],
                [ '로로와 무무스', '로로와 무무스' ],
                [ '마크52 알파', '마크52 알파' ],
                [ '바야르 수문장', '바야르 수문장' ],
                [ '분노의 바포메트', '분노의 바포메트' ],
                [ '아마돈', '아마돈' ],
                [ '아머드 체키', '아머드 체키' ],
                [ '아크레온', '아크레온' ],
                [ '알파터틀', '알파터틀' ],
                [ '우레우스', '우레우스' ],
                [ '이카르 마드', '이카르 마드' ],
                [ '자이언트 터틀', '자이언트 터틀' ],
                [ '토토와 구구스', '토토와 구구스' ],
                [ '페카노스', '페카노스' ]
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