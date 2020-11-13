from telegram import Update
from telegram.ext import Updater, MessageHandler, Filters,  CallbackContext
from emoji import emojize

api_key = '1366398887:AAE82zG_cemZrRrCqrqP3-BG5HMhvvJLTRo'
updater = Updater(token=api_key)
dispatcher = updater.dispatcher
updater.start_polling()


def handler(update: Update, context: CallbackContext):
    text = update.message.text
    chat_id = update.message.chat_id

    if '모해' in text:
        context.bot.send_message(chat_id=chat_id, text='오빠 생각 ㅎㅎ')
    elif '아잉' in text:
        context.bot.send_message(chat_id=chat_id, text=emojize(
            '아잉:heart_eyes:', use_aliases=True))
    elif '몇시에' in text:
        context.bot.send_message(chat_id=chat_id, text='7시에 보자')
    elif '사진' in text:
        context.bot.send_photo(chat_id=chat_id, photo=open('img/mj.jpg', 'rb'))
    else:
        context.bot.send_message(chat_id=chat_id, text='몰라')


echo_handler = MessageHandler(Filters.text, handler)
dispatcher.add_handler(echo_handler)
