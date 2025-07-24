// stores/menu.ts
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        items: [
            {
                label: 'Dashboard',
                icon: 'ph ph-gauge',
                route: '/dashboard'
            },
            {
                label: 'Analytics',
                icon: 'ph ph-chart-bar',
                route: '/analytics'
            },
            {
                label: 'Users',
                icon: 'ph ph-users',
                children: [
                    { label: 'Users Activity', route: '/user/activity' },
                    { label: 'Roles', route: '/users/roles' },
                ]
            },
            {
                label: 'Tiket Support',
                icon: 'ph ph-ticket',
                route: '/ticket'
            },
            { label: 'Messages', icon: 'ph ph-chat-circle-text', route: '/messages' },
            { label: 'Calendar', icon: 'ph ph-calendar-blank', route: '/calendar' },
        ]
    })
})
