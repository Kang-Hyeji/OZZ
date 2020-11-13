import telegram

api_key = '1367868931:AAGu9lH6nlcAU61D1GAEXIDFT6kZPDw5tQM'

bot = telegram.Bot(token=api_key)

# chat_id = bot.get_updates()[-1].message.chat_id
chat_id = 1098120436
# print(chat_id)

bot.sendMessage(chat_id=chat_id, text="호령아 안녕?")