from konlpy.tag import Mecab
import numpy as np
import pickle
import re
import pandas as pd
import csv
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import xlrd

cafe_data = pd.read_csv ("C:\\Users\\hwasa\\OneDrive\\바탕 화면\\OZZ\\chat_bot_1")
# cafe_data.head()

# 단어 아니면 삭제
cafe_data['SENTENCE'] = cafe_data['SENTENCE'].str.replace("[^\w]|br", " ")

pre_cafe_data = cafe_data.loc[0:6673,["SPEAKER","SENTENCE"]]

# 점원과 고객이 한말 두개 따로 나누기.
# Q and A 형식으로 dataframe 만들기.
user = pre_cafe_data[pre_cafe_data["SPEAKER"] == "고객"]["SENTENCE"]
service = pre_cafe_data[pre_cafe_data["SPEAKER"] == "점원"]["SENTENCE"]

user.name="user"
service.name="service"

service = pd.DataFrame(service).reset_index(drop=True)
user = pd.DataFrame(user).reset_index(drop=True)
result_data = pd.concat([user, service], axis=1)
# result_data

tokenizer = Mecab()

# yeswords = ['NNG', 'NNP', 'NNB', 'NNBC', 'NR', 'NP', 'VV', 'VA', 'VX', 'VCP', 'VCN', 'MM', 'MAG', 'MAJ', 'IC']

encoder_input = []
for line in result_data["user"]:
    token = []
    words = tokenizer.pos(line)
    for word in words:
        # if word[1] in yeswords:
        token.append(word[0])
    encoder_input.append(token)

decoder_input = []
for line in result_data["service"]:
    token = []
    words = tokenizer.pos(line)
    for word in words:
        # if word[1] in yeswords:
        token.append(word[0])
    token.insert(0, "<start>")
    decoder_input.append(token)

decoder_output = []
for line in result_data["service"]:
    token = []
    words = tokenizer.pos(line)
    for word in words:
        # if word[1] in yeswords:
        token.append(word[0])
    token.append("<end>")
    decoder_output.append(token)
            
tokenizer_text = Tokenizer()
tokenizer_text.fit_on_texts(encoder_input)
encoder_input = tokenizer_text.texts_to_sequences(encoder_input)

tokenizer_title = Tokenizer()
tokenizer_title.fit_on_texts(decoder_input)
tokenizer_title.fit_on_texts(decoder_output)
decoder_input = tokenizer_title.texts_to_sequences(decoder_input)
decoder_output = tokenizer_title.texts_to_sequences(decoder_output)

print(len(encoder_input))
print(encoder_input[:3])
print(decoder_input[:3])
print(decoder_output[:3])

encoder_input = pad_sequences(encoder_input, padding="post")
decoder_input = pad_sequences(decoder_input, padding="post")
decoder_output = pad_sequences(decoder_output, padding="post")

title_to_index = tokenizer_title.word_index
index_to_title = tokenizer_title.index_word

