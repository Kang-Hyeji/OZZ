import sqlite3
import os
import urllib.request
from konlpy.tag import Okt
import numpy as np
import pandas as pd 
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

# os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
# os.environ["CUDA_VISIBLE_DEVICES"] = ""
# SEED = 1 # seed 숫자를 지정한다.
# import random
# random.seed(SEED) # Python
# np.random.seed(SEED) # numpy
# import tensorflow as tf
# tf.compat.v1.set_random_seed(SEED) # Tensorflow
# os.environ['PYTHONHASHSEED'] = str(SEED)

# # GPU 사용을 못하게 한다.
# config = tf.compat.v1.ConfigProto(intra_op_parallelism_threads=1,inter_op_parallelism_threads=1)
# sess = tf.compat.v1.Session(graph=tf.compat.v1.get_default_graph(), config=config)
# tf.compat.v1.keras.backend.set_session(sess)


test_data = pd.read_table('ratings_test.txt')
test_data.drop_duplicates(subset = ['document'], inplace=True) # document 열에서 중복인 내용이 있다면 중복 제거
test_data['document'] = test_data['document'].str.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣 ]","") # 정규 표현식 수행
test_data['document'].replace('', np.nan, inplace=True) # 공백은 Null 값으로 변경
test_data = test_data.dropna(how='any') # Null 값 제거
# print('전처리 후 테스트용 샘플의 개수 :',len(test_data))
stopwords = ['의','가','이','은','들','는','좀','잘','걍','과','도','를','으로','자','에','와','한','하다']
okt = Okt()

cur_dir = os.path.dirname(__file__)
db = os.path.join(cur_dir, 'traindata.sqlite')

conn = sqlite3.connect(db)
c = conn.cursor()
# for sentence in test_data['document']:
#     temp_X = []
#     temp_X = okt.morphs(sentence, stem=True) # 토큰화
#     temp_X = [word for word in temp_X if not word in stopwords] # 불용어 제거
#     c.execute("INSERT INTO x_test (tokens)"\
#     " VALUES(?)", ([','.join(temp_X)]))

# conn.commit()
# conn.close()
# print("complete")

c.execute("SELECT tokens FROM x_train")
result = c.fetchall()
X_train = [list(i) for i in result]
print(len(X_train))
vocab_size = 19417
tokenizer = Tokenizer()
tokenizer.fit_on_texts(X_train)
tokenizer = Tokenizer(vocab_size, oov_token = 'OOV') 
tokenizer.fit_on_texts(X_train)

c.execute("SELECT tokens FROM x_test")
result = c.fetchall()
X_test = [list(i) for i in result]
print(len(X_test))

conn.commit()
conn.close()

X_test = tokenizer.texts_to_sequences(X_test)
max_len = 30
y_test = np.array(test_data['label'])
X_test = pad_sequences(X_test, maxlen = max_len)

loaded_model = load_model('./sentiment_models/04-0.3389.hdf5')
print("\n 테스트 정확도: %.4f" % (loaded_model.evaluate(X_test, y_test)[1]))