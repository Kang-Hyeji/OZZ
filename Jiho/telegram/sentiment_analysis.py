from telegram import Update
from telegram.ext import Updater, MessageHandler, Filters,  CallbackContext
import tensorflow as tf
from tensorflow.keras.models import load_model
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import re
import numpy as np

api_key = '1366398887:AAE82zG_cemZrRrCqrqP3-BG5HMhvvJLTRo'
updater = Updater(token=api_key)
dispatcher = updater.dispatcher
updater.start_polling()
loaded_model = load_model('./sentiment_models/best_model.h5')

train_data = pd.read_table('ratings_train.txt')
train_data.drop_duplicates(subset=['document'], inplace=True) # document 열에서 중복인 내용이 있다면 중복 제거
train_data['document'] = train_data['document'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","")
# 한글과 공백을 제외하고 모두 제거
train_data['document'].replace('', np.nan, inplace=True)
train_data = train_data.dropna(how = 'any')


stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']
okt = Okt()

max_len = 30

X_train = []
for sentence in train_data['document']:
    temp_X = []
    temp_X = okt.morphs(sentence, stem=True) # 토큰화
    temp_X = [word for word in temp_X if not word in stopwords] # 불용어 제거
    X_train.append(temp_X)
print("complete")
tokenizer = Tokenizer()
tokenizer.fit_on_texts(X_train)


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
