# MS2 OX Discord Bot JS Version
메이플스토리 2의 OX 퀴즈쇼의 족보 정보를 제공하는 Discord 봇의 JavaScript 버전

## 구조
이 BOT은 3개의 계층으로 이루어져야 작동합니다. 
- 1단계: DB(mariaDB)  
퀴즈 정답, 일부 서버 특화 기능 리스트, 로그 데이터 등이 저장되는 데이터베이스 입니다.
- 2단계: API Server  
Bot의 요청을 받으면, DB에서 데이터를 읽어와서 JSON 형태로 가공하여, Bot 에 데이터를 제공하거나, DB에 데이터를 저장함.
- 3단계: Bot  
Discord 서버와 통신하며 요청을 제공 받고, 결과를 제공함.

## 제작 이유
기존 버전은 Python 3으로 구동되었으나 2022년 5월부터 Discord의 봇 정책이 변경되어 채팅 내용의 전부를 읽어오지 않고, 봇을 언급(mention)하거나 슬래시 명령(Slash Commands)을 통해서만 봇 인스턴스에 데이터를 전달 받을 수 있음. 
하지만, Python 의 Discord 라이브러리는 슬래시 명령 지원이 확실치 않아 JavaScript 의 discord.js 라이브러리로 변경하고자 함.

## Need to set variables
- DISCORD_BOT_TOKEN: Discord Developers Portal에서 발급 받은 Bot의 Token
- CLIENT_ID: Discord Developers Portal에서 발급 받은 Application의 Client ID
- API_SERVER_URL: Bot 이 참조할 API 서버의 주소
- API_TOKEN: API 에 접근하기 위한 토큰 값