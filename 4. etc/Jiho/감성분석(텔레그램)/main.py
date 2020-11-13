import telegram

api_key = '1366398887:AAE82zG_cemZrRrCqrqP3-BG5HMhvvJLTRo'


bot = telegram.Bot(token=api_key)


# chat_id = bot.get_updates()[-1].message.chat_id
chat_id = 1177162848


bot.sendMessage(chat_id=chat_id, text='호령아 안녕')
