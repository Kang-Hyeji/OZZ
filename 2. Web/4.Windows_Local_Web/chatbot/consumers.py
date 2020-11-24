# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from chatbot.hanspell import spell_checker
from chatbot.transformer.inference import inference
from eunjeon import Mecab


class ChatConsumer(WebsocketConsumer):

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        tokenizer = Mecab()
        message_list = []
        for line in tokenizer.pos(message):
            message_list.append(line[0])

        # 여기에 작성하시오.
        if "감사" in message_list:
            response_message = "네 준비되면 불러드리겠습니다"
        elif "메뉴" in message_list and "커피" in message_list:
            response_message = "아메리카노, 카페라떼, 카푸치노,바닐라라떼가 있습니다."
        elif "다른" in message_list and "음료" in message_list:
            response_message = "레몬에이드, 자몽차, 레몬차, 자비칩프라프치노, 초코라떼가 있습니다."
        elif "차" in message_list and "종류" in message_list:
            response_message = "레몬차, 자몽차가 있습니다."
        elif "티" in message_list and "종류" in message_list:
            response_message = "레몬차, 자몽차가 있습니다."
        elif "차" in message_list and "추천" in message_list:
            response_message = "레몬차, 자몽차가 있습니다."
        elif "티" in message_list and "추천" in message_list:
            response_message = "레몬차, 자몽차가 있습니다."
        elif "디저트" in message_list and "메뉴" in message_list:
            response_message = "베이글, 센드위치가 있습니다."
        elif "디저트" in message_list and "추천" in message_list:
            response_message = "베이글, 센드위치가 있습니다."
        elif "디저트" in message_list and "는" in message_list:
            response_message = "베이글, 센드위치가 있습니다."
        elif "메뉴" in message_list:
            response_message = "아메리카노, 카페라떼, 카푸치노, 바닐라라떼, 레몬에이드, 자몽차, 레몬차, 자비칩프라프치노, 초코라떼, 베이글, 센드위치가 있습니다."
        elif "결제" in message_list and "완료" in message_list:
            response_message = "결제되었습니다 핸드폰 알람으로 알려드릴께요"
        else:
            response_message = inference(message)
        # response_message = inference(message)
        # response_message = message

        # 핑퐁의 띄어쓰기 교정기 적용
        # response_message = spacer.space(response_message)
        response_message = spell_checker.check(response_message).checked

        idontkwon_list = [
            "네 샌드위치는 생과일로 많이 답니다",
            "네 샌드위치는 생과일로 제조합니다",
            "총 세 단원입니다",
            "생과일로 생과일로 생과일로 생과일로 제조합니다",
            "오트밀 라테는 4500원입니다 공유원입니다",
            "네 그럼 머그잔에 준비해드리겠습니다",
            "네 샌드위치는 그치노는 고구마 됩니다",
            "네 광주로 계산하시나요",
            "네도 조각으로 포인트 등록 결제 도와드리겠습니다",
            "그럼 카페라테로 준비되어 두 개 합쳐진 음료로 모두 됩니다"
        ]

        if response_message in idontkwon_list:
            response_message = "무슨 말인지 모르겠어요 다시 한번 말해주시겠어요?"
        print(response_message)

        # Send message to room group
        async_to_sync(self.channel_layer.send)(
            self.channel_name,
            {
                'type': 'chat_message',
                'message': response_message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
