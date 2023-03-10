import { ref } from 'vue'
import { defineStore } from 'pinia'

import type MessageItem from '@/interfaces/message-item'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<MessageItem[]>([])
  const wait = ref<boolean>(false)

  function newMessage (message: MessageItem): void {
    messages.value.push(message)

    if (message.duration) {
      setTimeout(() => removeMessage(message), message.duration)
    }
  }

  function removeMessage (message: MessageItem): void {
    messages.value = messages.value.filter(
      (item: MessageItem): boolean => item.id !== message.id
    )
  }

  function waitAction () {
    wait.value = true
  }

  function unwaitAction () {
    wait.value = false
  }

  return { messages, wait, removeMessage, newMessage, waitAction, unwaitAction }
})
