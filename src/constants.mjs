export let COMMON_CONSTANTS = {
    SOON: "곧",
    NEXT: "다음"
}

export let OX_QUIZ_COMMAND = {
    COMMAND_NAME: "ox",
    COMMAND_DESCRIPTION: "OX 퀴즈쇼 족보를 검색합니다.",
    OPTION_NAME: "검색어",
    OPTION_DESCRIPTION: "문제의 일부를 입력하여 검색합니다."
}

export let MINIGAME_COMMAND = {
    COMMAND_NAME: "미겜",
    COMMAND_DESCRIPTION: "곧/다음에 등장하는 미니게임을 봅니다.",
    OPTION_NAME: "타이밍",
    OPTION_DESCRIPTION: "표시할 시간을 결정하세요."
}

export let FIELD_BOSS_COMMAND = {
    COMMAND_NAME: "필보",
    COMMAND_DESCRIPTION: "곧/다음에 등장하는 필드보스의 정보를 보거나 특정 필드보스를 검색합니다.",
    SUB_COMMANDS: {
        INFORMATION: {
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
            OPTION_DESCRIPTION: "이름을 입력하면 해당하는 보스의 정보를 보여줍니다."
        }
    }
}

export let LEGION_WAR_COMMAND = {
    COMMAND_NAME: "군단",
    COMMAND_DESCRIPTION: "곧/다음에 등장할 군단전의 정보를 봅니다.",
    OPTION_NAME: "타이밍",
    OPTION_DESCRIPTION: "표시할 시간을 선택하세요."
}

let REPORT_COMMAND = {
    COMMAND_NAME: "제보",
    COMMAND_DESCRIPTION: "제보를 위한 이메일 정보를 봅니다."
}

export {REPORT_COMMAND}