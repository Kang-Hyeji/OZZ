from eunjeon import Mecab
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from .attention import AttentionLayer

from tensorflow.keras.models import model_from_json
import pickle

def load_model(model_filename, model_weights_filename):
    with open(model_filename, 'r', encoding='utf8') as f:
        model = model_from_json(f.read(), custom_objects={'AttentionLayer': AttentionLayer})
    model.load_weights(model_weights_filename)
    return model

def load_pickle(pickle_filename):
    with open(pickle_filename, "rb") as fr:
        pickle_data = pickle.load(fr)
    return pickle_data

# tokenizer_text = Tokenizer()

def user_output(input_stc):

    encoder_model = load_model('./chatbot_data/encoder_model.json', './chatbot_data/encoder_model_weights.h5')
    decoder_model = load_model('./chatbot_data/decoder_model.json', './chatbot_data/decoder_model_weights.h5')

    index_to_title = load_pickle("./chatbot_data/index_to_title.pickle")
    title_to_index = load_pickle("./chatbot_data/title_to_index.pickle")
    tokenizer_text = load_pickle("./chatbot_data/tokenizer_text.pickle")


    tokenizer = Mecab()
    token_stc = []
    for line in tokenizer.pos(input_stc):
        token_stc.append(line[0])

    encode_stc = tokenizer_text.texts_to_sequences([token_stc])
    pad_stc = pad_sequences(encode_stc, maxlen=34, padding='post')
    en_out, en_hidden, en_cell = encoder_model.predict(pad_stc)

    predicted_seq = np.zeros((1, 1))
    predicted_seq[0, 0] = title_to_index["<start>"]

    decoded_stc = []

    while True:
        output_words, h, c = decoder_model.predict([predicted_seq, en_out, en_hidden, en_cell])
        predicted_word = index_to_title[np.argmax(output_words[0, 0])]

        if predicted_word == "<end>":
            break

        decoded_stc.append(predicted_word)

        predicted_seq = np.zeros((1, 1))
        predicted_seq[0, 0] = np.argmax(output_words[0, 0])

        en_hidden = h
        en_cell = c
        # print(decoded_stc)
    return "".join(decoded_stc)


# input_stc = input()
# print(user_output(input_stc))

