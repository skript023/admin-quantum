<template>
    <p class="text-gray-500 font-semibold mb-2">NAVIGATION</p>
    <ul class="menu space-y-1 w-full">
        <li v-for="item in menu.items" :key="item.label">
            <RouterLink
            :to="item.to"
            class="w-full"
            :class="{
                'menu-active': isActive(item.to),
            }"
            >
            <i :class="`${item.icon} mr-2`"></i> {{ item.label }}
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