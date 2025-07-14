<template>
    <p class="text-gray-500 font-semibold mb-2">NAVIGATION</p>
    <ul class="menu space-y-1 w-full">
        <li v-for="(item, index) in menu.items" :key="index">
            <details  v-if="item.children" open>
                <summary>{{ item.label }}</summary>
                <ul class="ml-4 mt-1 space-y-1">
                    <li v-for="(child, idx) in item.children" :key="idx">
                        <RouterLink :to="child.route">{{ child.label }}</RouterLink>
                    </li>
                </ul>
            </details>
            <RouterLink
                v-else
                :class="{ 'menu-active': isActive(item.route) }"
                :to="item.route"
            >
                <i :class="item.icon + ' mr-2'"></i>{{ item.label }}
            </RouterLink>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useRoute } from 'vue-router'

const menu = useMenuStore()
const route = useRoute()

// Fungsi cek apakah menu aktif berdasarkan path
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>