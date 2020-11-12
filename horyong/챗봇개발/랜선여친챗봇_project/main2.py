from telegram.ext import Updater, MessageHandler, Filters, CallbackContext
from telegram import Update
from emoji import emojize

updater = Updater(token='1367868931:AAGu9lH6nlcAU61D1GAEXIDFT6kZPDw5tQM')
dispatcher = updater.dispatcher
updater.start_polling()

def handler(update: Update, context: CallbackContext):
    text = update.effective_message.text
    chat_id = update.effective_message.chat_id

    if "모해" in text:
        context.bot.send_message(chat_id=chat_id, text='오빠생각 ㅎㅎ')
    elif '아잉' in text:
        context.bot.send_message(chat_id=chat_id, text=emojize('아잉:heart_eyes:',use_aliases=True))
    elif '사진' in text:
        context.bot.send_photo(chat_id=chat_id,photo=open('img/mj.jpg','rb'))
    else:
        context.bot.send_message(chat_id=chat_id, text='몰라')

echo_handler = MessageHandler(Filters.text, handler)
dispatcher.add_handler(echo_handler)