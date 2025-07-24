<template>
    <Navigation title="RDR Mod Support">
      <div class="space-y-6">
        <!-- HEADER -->
        <div>
            <h1 class="text-2xl font-bold">RDR Mod Support</h1>
            <p class="text-sm text-gray-500">
                Kelola isu dan bantuan teknis RDR mod menu
            </p>
        </div>
  
        <!-- SEARCH & FILTER -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex items-center w-full md:w-1/2">
                <input v-model="search" type="text" placeholder="Cari tickets..." class="input input-bordered w-full"/>
                <button class="btn btn-ghost btn-circle ml-2">
                    <i class="ph ph-funnel"></i>
                </button>
            </div>
            <div class="flex gap-2">
                <select v-model="selectedStatus" class="select select-bordered">
                    <option value="">Semua Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                </select>
                <select v-model="selectedPriority" class="select select-bordered">
                    <option value="">Semua Prioritas</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>
        </div>
  
        <!-- TICKET LIST -->
        <div class="space-y-4">
            <div v-for="ticket in filteredTickets" :key="ticket.id" class="bg-base-100 border border-base-200 rounded-lg p-5 hover:shadow-md transition">
                <!-- Header line -->
                <div class="flex flex-wrap items-center gap-2 text-sm mb-2">
                    <span class="font-semibold">{{ ticket.code }}</span>
                    <span class="badge" :class="priorityColor(ticket.priority)">
                        {{ ticket.priority }}
                    </span>
                    <span class="badge badge-outline">{{ ticket.status }}</span>
                </div>
    
                <!-- Title -->
                <h3 class="text-lg font-semibold mb-1">
                    {{ ticket.title }}
                </h3>
    
                <!-- Description -->
                <p class="text-gray-600 text-sm mb-3">
                    {{ ticket.description }}
                </p>
    
                <!-- Meta info -->
                <div class="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span class="flex items-center gap-1">
                        <i class="ph ph-cube"></i> {{ ticket.module }}
                    </span>
                    <span class="flex items-center gap-1">
                        <i class="ph ph-user"></i> {{ ticket.author }}
                    </span>
                    <span class="flex items-center gap-1">
                        <i class="ph ph-clock"></i> {{ ticket.time }} yang lalu
                    </span>
                    <span class="flex items-center gap-1">
                        <i class="ph ph-chat-circle"></i> {{ ticket.comments }} komentar
                    </span>
                </div>
            </div>
        </div>
      </div>
    </Navigation>
</template>
  
<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import { ref, computed } from 'vue'
  
interface Ticket {
    id: number
    code: string
    title: string
    description: string
    module: string
    author: string
    time: string
    comments: number
    priority: string
    status: string
}
  
const search = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')

const tickets = ref<Ticket[]>([
    {
      id: 1,
      code: '#TICK-001',
      title: 'RDR Mod Menu tidak muncul setelah inject',
      description:
        'Setelah melakukan inject menggunakan injector, mod menu RDR tidak muncul di game. Sudah dicoba restart game dan Steam berkali-kali tapi mod menu masih tidak keluar. Game running versi 1436.31 dan injector version terbaru.',
      module: 'RDR Injector',
      author: 'rdr.player01@ellohim.com',
      time: '3 jam',
      comments: 1,
      priority: 'High',
      status: 'Open'
    },
    {
      id: 2,
      code: '#TICK-002',
      title: 'Money Drop feature tidak berfungsi di Online',
      description:
        'Feature money drop di RDR mod menu tidak memberikan uang ketika digunakan di Red Dead Online...',
      module: 'RDR Online Features',
      author: 'cowboy.jack@ellohim.com',
      time: '6 jam',
      comments: 1,
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: 3,
      code: '#TICK-003',
      title: 'Teleport function crash game ke desktop',
      description:
        'Ketika menggunakan teleport feature di mod menu, game langsung crash ke desktop tanpa error message...',
      module: 'RDR Teleport System',
      author: 'outlaw.morgan@ellohim.com',
      time: '14 jam',
      comments: 1,
      priority: 'Urgent',
      status: 'Resolved'
    },
    {
      id: 4,
      code: '#TICK-004',
      title: 'Weapon spawner tidak spawn legendary weapons',
      description:
        'Feature weapon spawner di mod menu bisa spawn senjata biasa tapi tidak bisa spawn legendary weapons...',
      module: 'RDR Weapon System',
      author: 'gunslinger.dutch@ellohim.com',
      time: '15 jam',
      comments: 1,
      priority: 'Medium',
      status: 'Open'
    },
    {
      id: 5,
      code: '#TICK-005',
      title: 'God Mode tidak melindungi dari fall damage',
      description:
        'God mode feature aktif melindungi dari gunshot dan animal attacks, tapi karakter masih mati kalau jatuh dari ketinggian...',
      module: 'RDR Protection',
      author: 'fearless.arthur@ellohim.com',
      time: '2 hari',
      comments: 1,
      priority: 'Low',
      status: 'Closed'
    }
])
  
const filteredTickets = computed(() =>
    tickets.value.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.value.toLowerCase()) ||
        t.description.toLowerCase().includes(search.value.toLowerCase())
      const matchStatus = selectedStatus.value
        ? t.status === selectedStatus.value
        : true
      const matchPriority = selectedPriority.value
        ? t.priority === selectedPriority.value
        : true
      return matchSearch && matchStatus && matchPriority
    })
)
  
function priorityColor(priority: string) {
    switch (priority) {
      case 'Low':
        return 'badge-success'
      case 'Medium':
        return 'badge-warning'
      case 'High':
        return 'badge-error'
      case 'Urgent':
        return 'badge-secondary'
      default:
        return ''
    }
}
  </script>
  