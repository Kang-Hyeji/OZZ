from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.contrib import messages
from django.views.generic import TemplateView


class ChatView(TemplateView):
    template_name = 'chat/chat.html'
