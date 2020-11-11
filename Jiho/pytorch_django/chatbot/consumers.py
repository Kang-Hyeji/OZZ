# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json
# from hanspell import spell_checker
from chatbot.transformer.inference import inference

class ChatConsumer(AsyncJsonWebsocketConsumer):

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        response_message = inference(message)
        # response_message = message
        # response_message = spell_checker.check(response_message).checked
        print(response_message)
        # Send message to room group
        await self.channel_layer.send(
            self.channel_name,
            {
                'type': 'chat_message',
                'message': response_message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))