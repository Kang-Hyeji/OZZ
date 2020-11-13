
from konlpy.tag import Okt
import numpy as np
import sqlite3
import os
import pandas as pd 

cur_dir = os.path.dirname(__file__)
db = os.path.join(cur_dir, 'traindata.sqlite')

conn = sqlite3.connect(db)
c = conn.cursor()

train_data = pd.read_table('ratings_train.txt')
train_data.drop_duplicates(subset=['document'], inplace=True) # document 열에서 중복인 내용이 있다면 중복 제거
train_data = train_data.dropna(how = 'any')
train_data['document'] = train_data['document'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","")
# 한글과 공백을 제외하고 모두 제거
train_data['document'].replace('', np.nan, inplace=True)
train_data = train_data.dropna(how = 'any')

stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']
okt = Okt()

X_train = []
for sentence in train_data['document']:
    temp_X = []
    temp_X = okt.morphs(sentence, stem=True) # 토큰화
    temp_X = [word for word in temp_X if not word in stopwords] # 불용어 제거
    c.execute("INSERT INTO x_train (tokens)"\
    " VALUES(?)", ([','.join(temp_X)]))

conn.commit()
conn.close()
print("complete")