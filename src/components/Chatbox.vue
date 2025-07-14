<template>
    <div class="card w-96 bg-base-100 shadow-xl mx-auto my-8">
        <div class="card-body">
            <h2 class="card-title text-lg">Select Contact</h2>
            <p class="text-sm opacity-70 mb-4">Choose who you want to chat with</p>
    
            <ul class="space-y-4">
                <li
                    v-for="contact in contacts"
                    :key="contact.id"
                    class="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-base-200 transition-colors duration-200"
                    @click="$emit('select-contact', contact)"
                >
                    <div class="avatar relative">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300 text-lg font-bold">
                            {{ getInitials(contact.name) }}
                        </div>
                        <div
                            :class="[
                            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                            {
                                'bg-success': contact.status === 'online',
                                'bg-warning': contact.status === 'away',
                                'bg-gray-400': contact.status === 'offline',
                            },
                            ]"
                        ></div>
                    </div>
                    <div>
                        <div class="font-semibold text-base">{{ contact.name }}</div>
                        <div class="text-sm opacity-70">{{ contact.description }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  
</template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Data pesan contoh
  const messages = ref([
    {
      sender: 'Obi-Wan Kenobi',
      avatar: 'https://img.daisyui.com/images/profile/demo/kenobee@192.webp',
      time: '12:45',
      text: 'You were the Chosen One!',
      status: 'Delivered',
      align: 'start',
      bubbleClass: 'chat-bubble-primary',
    },
    {
      sender: 'Anakin',
      avatar: 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp',
      time: '12:46',
      text: 'I hate you!',
      status: 'Seen at 12:46',
      align: 'end',
      bubbleClass: 'chat-bubble-secondary',
    },
    {
      sender: 'Obi-Wan Kenobi',
      avatar: 'https://img.daisyui.com/images/profile/demo/kenobee@192.webp',
      time: '12:47',
      text: 'Bring balance to the Force... not leave it in darkness!',
      status: 'Delivered',
      align: 'start',
      bubbleClass: '', // Default bubble
    },
    {
      sender: 'Anakin',
      avatar: 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp',
      time: '12:48',
      text: 'You underestimate my power!',
      status: 'Seen at 12:48',
      align: 'end',
      bubbleClass: 'chat-bubble-accent',
    },
  ]);
  
  // Untuk input pesan baru
  const newMessageText = ref('');
  
  // Fungsi untuk menangani pengiriman pesan
  const handleSendMessage = () => {
    if (newMessageText.value.trim()) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
  
      messages.value.push({
        sender: 'Anda', // Asumsikan Anda adalah pengirimnya
        avatar: 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp', // Avatar Anda
        time: `${hours}:${minutes}`,
        text: newMessageText.value.trim(),
        status: 'Sending...',
        align: 'end',
        bubbleClass: 'chat-bubble-info', // Contoh warna untuk pesan Anda
      });
  
      newMessageText.value = ''; // Kosongkan input setelah dikirim
  
      // Simulasi status 'Delivered' setelah beberapa saat
      setTimeout(() => {
        messages.value[messages.value.length - 1].status = 'Delivered';
      }, 500);
    }
  };
  </script>