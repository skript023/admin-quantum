// stores/menu.ts
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => ({
        items: [
            {
                label: 'Dashboard',
                icon: 'ph ph-gauge',
                route: '/home'
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
                    { label: 'All Users', route: '/users' },
                    { label: 'Roles', route: '/users/roles' },
                ]
            },
            {
                label: 'Reports',
                icon: 'ph ph-file-text',
                route: '/reports'
            },
            { label: 'Messages', icon: 'ph ph-chat-circle-text', route: '/messages' },
            { label: 'Calendar', icon: 'ph ph-calendar-blank', route: '/calendar' },
        ]
    })
})
