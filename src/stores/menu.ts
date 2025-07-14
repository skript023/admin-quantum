import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        items: [
        { label: 'Dashboard', icon: 'ph ph-gauge', to: '/home' },
        { label: 'Analytics', icon: 'ph ph-chart-bar', to: '/analytics' },
        { label: 'Users', icon: 'ph ph-users', to: '/users' },
        { label: 'Reports', icon: 'ph ph-file-text', to: '/reports' },
        { label: 'Messages', icon: 'ph ph-chat-circle-text', to: '/messages' },
        { label: 'Calendar', icon: 'ph ph-calendar-blank', to: '/calendar' },
        ]
    })
})
