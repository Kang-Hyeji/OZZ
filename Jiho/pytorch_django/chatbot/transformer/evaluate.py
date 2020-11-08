
from chatspace import ChatSpace

spacer = ChatSpace()



def decoding_from_result(enc_input, y_pred, dec_output=None, tokenizer=None):
    list_of_input_ids = enc_input.tolist()
    list_of_pred_ids = y_pred.max(dim=-1)[1].tolist()
    input_token = tokenizer.decode_token_ids(list_of_input_ids)
    pred_token = tokenizer.decode_token_ids(list_of_pred_ids)

    # print("input: ", input_token)
    # print("pred: ", pred_token)
    if dec_output is not None:
        real_token =  tokenizer.decode_token_ids(dec_output.tolist())
        # print("real: ", real_token)
        # print("")
        return None
    else:
        # 핑퐁의 띄어쓰기 교정기 적용
        pred_str = ''.join([token.split('/')[0] for token in pred_token[0][:-1]])
        pred_str = spacer.space(pred_str)
        # print("pred_str: ", pred_str)
        # print("")
        return pred_str

