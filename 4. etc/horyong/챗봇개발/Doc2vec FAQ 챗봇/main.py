import telegram

api_key = '1399382797:AAHrNElfH4N9GmewAuvdreptEyGeKBBnMFE'

bot = telegram.Bot(token=api_key)

# chat_id = bot.get_updates()[-1].message.chat_id
chat_id = 1098120436
# print(chat_id)
bot.sendMessage(chat_id=chat_id, text="오늘 따뜻한 커피 한잔 어때요?")