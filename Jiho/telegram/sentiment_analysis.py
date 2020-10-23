from telegram import Update
from telegram.ext import Updater, MessageHandler, Filters,  CallbackContext
from tensorflow.keras.models import load_model
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import sqlite3
import os

api_key = '1366398887:AAE82zG_cemZrRrCqrqP3-BG5HMhvvJLTRo'
updater = Updater(token=api_key)
dispatcher = updater.dispatcher
updater.start_polling()
loaded_model = load_model('./sentiment_models/01-0.3744.hdf5')

max_len = 30
# 빈도수 2회 이하인 단어 제거 후 단어 집합의 크기()
vocab_size = 19417
cur_dir = os.path.dirname(__file__)
db = os.path.join(cur_dir, 'traindata.sqlite')

#  DB에서 저장된 X_train 가져오기  
conn = sqlite3.connect(db)
c = conn.cursor()
c.execute("SELECT tokens FROM x_train")
result = c.fetchall()
X_train = [list(i) for i in result]
print(len(X_train))

tokenizer = Tokenizer()
tokenizer.fit_on_texts(X_train)
tokenizer = Tokenizer(vocab_size, oov_token = 'OOV') 
tokenizer.fit_on_texts(X_train)

okt = Okt()
stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']


def sentiment_predict(new_sentence):
  new_sentence = okt.morphs(new_sentence, stem=True) # 토큰화
  new_sentence = [word for word in new_sentence if not word in stopwords] # 불용어 제거
  encoded = tokenizer.texts_to_sequences([new_sentence]) # 정수 인코딩
  pad_new = pad_sequences(encoded, maxlen = max_len) # 패딩
  score = float(loaded_model.predict(pad_new)) # 예측
  return score

def handler(update: Update, context: CallbackContext):
    text = update.message.text
    chat_id = update.message.chat_id
    print(text)
    score = sentiment_predict(text)
    print(score)

    if(score > 0.5):
        prob = round(score * 100, 2)
        print(prob)
        sentence = str(prob) + "% 확률로 긍정 리뷰입니다"
        context.bot.send_message(chat_id=chat_id, text=sentence)
    else:
        prob = round((1 - score) * 100, 2)
        print(prob)
        sentence = str(prob)+ "% 확률로 부정 리뷰입니다."
        context.bot.send_message(chat_id=chat_id, text=sentence)

   

echo_handler = MessageHandler(Filters.text, handler)
dispatcher.add_handler(echo_handler)
