# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .sentiment_analysis import sentiment_predict
from .seq2seq_model import user_output
from hanspell import spell_checker


class ChatConsumer(WebsocketConsumer):

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        # response_message = sentiment_predict(message)
        response_message = user_output(message)
        response_message = spell_checker.check(response_message).checked
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