from telegram.ext import Updater, MessageHandler, Filters, CallbackContext
from telegram import Update
from eunjeon import Mecab
import numpy as np
import pandas as pd
import re
import csv
import os
import warnings
from gensim.models import doc2vec, Doc2Vec
from gensim.models.doc2vec import TaggedDocument


updater = Updater(token='1399382797:AAHrNElfH4N9GmewAuvdreptEyGeKBBnMFE')
dispatcher = updater.dispatcher
updater.start_polling()

tokenizer = Mecab()

# noun_mecab = ['NNG','NNP','SL','VV']
def tokenizer_mecab(doc):
    token_doc = ['/'.join(word) for word in tokenizer.pos(doc)]
    #  if word[1] in noun_mecab
    return token_doc

df_faq = pd.read_csv('test.csv')

df_faq[['user','service']]

pre_faqs = []
for i in range(len(df_faq)):
     pre_faqs.append( [i, tokenizer_mecab(df_faq['user'][i]), df_faq['service'][i]])

d2v_faqs = Doc2Vec.load('d2v_faqs_size124_min1_batch3_epochs100_nounonly_dm0_window3.model')

def tokenizer_input(text):
    test_string = text
    token_test = tokenizer_mecab(test_string)
    # return token_test

    topn = 5
    test_vector = d2v_faqs.infer_vector(token_test)
    result = d2v_faqs.docvecs.most_similar([test_vector], topn=topn)
    print(result)
    for i in range(topn): 
        print("{}위. {}, {} {} {}".format(i + 1, result[i][1], result[i][0], df_faq['user'][result[i][0]],df_faq['service'][result[i][0]]))
    return df_faq['service'][result[0][0]]


def handler(update: Update, context: CallbackContext):
    text = update.effective_message.text
    chat_id = update.effective_message.chat_id

    faq_result = tokenizer_input(text)
    context.bot.send_message(chat_id=chat_id, text=faq_result)

echo_handler = MessageHandler(Filters.text, handler)
dispatcher.add_handler(echo_handler)