<template>
    <div class="flex">
      <!-- Sidebar -->
      <aside :class="[ 'fixed top-0 left-0 z-40 h-[100dvh] w-72 bg-base-200 text-base-content flex flex-col transition-transform duration-300 ease-in-out', isDrawerOpen ? 'translate-x-0' : '-translate-x-full']">
            <!-- Top Navigation -->
            <div class="flex-1 overflow-y-auto p-4">
                <div class="flex items-center justify-between mb-6">
                    <!-- Logo + Nama -->
                    <div class="flex items-center space-x-2">
                        <img src="/logo.png" alt="Logo" class="w-6 h-6" />
                        <div>
                            <h3 class="font-semibold leading-tight">Admin Panel</h3>
                            <p class="text-gray-500 leading-tight">Control Center</p>
                        </div>
                    </div>

                    <!-- Tombol Close -->
                    <button v-if="isDrawerOpen"  @click="isDrawerOpen = false" class="btn btn-square btn-ghost">
                        <i class="ph ph-x text-xl"></i>
                    </button>
                </div>
                
                <div class="mt-8">
                    <Sidebar />
                </div>
        
                <!-- Quick Actions -->
                <!-- <div class="mt-8">
                    <p class="text-sm font-semibold mb-2">QUICK ACTIONS</p>
                    <div class="grid grid-cols-2 gap-2">
                    <button class="btn btn-sm btn-outline"><i class="ph ph-file-plus mr-1"></i> New</button>
                    <button class="btn btn-sm btn-outline"><i class="ph ph-user-plus mr-1"></i> Add</button>
                    <button class="btn btn-sm btn-outline"><i class="ph ph-paper-plane-right mr-1"></i> Send</button>
                    <button class="btn btn-sm btn-outline"><i class="ph ph-warning mr-1"></i> Alert</button>
                    </div>
                </div> -->
    
                <!-- System Status -->
                <div class="mt-8">
                    <div class="divider"></div>
                    <p class="text-xs text-gray-500 font-semibold mb-5">SYSTEM STATUS</p>
                    <ul class="space-y-3">
                        <li class="flex justify-between items-center">
                            <span class="flex items-center text-sm"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Server Status</span>
                            <p class="text-xs">99.9%</p>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center text-sm"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Database</span>
                            <p class="text-xs">Healthy</p>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center text-sm"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span> API Response</span>
                            <p class="text-xs">156ms</p>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center text-sm"><span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> Storage</span>
                            <p class="text-xs">78%</p>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center text-sm"><span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> Memory Usage</span>
                            <p class="text-xs">65%</p>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center text-sm"><span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Network</span>
                            <p class="text-xs">Stable</p>
                        </li>
                    </ul>
                </div>
                <div class="mt-8">
                    <div class="divider"></div>
                    <p class="text-xs text-gray-500 font-semibold mb-5">RECENT ACTIVITIES</p>
                    <ul class="space-y-4">
                        <li class="flex items-start space-x-2">
                            <span class="mt-1 w-2 h-2 bg-black rounded-full"></span>
                            <div>
                                <p class="text-sm font-medium">New user registered</p>
                                <p class="text-xs text-gray-500 flex items-center"><i class="ph ph-clock mr-1"></i> 2 min ago</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="mt-1 w-2 h-2 bg-black rounded-full"></span>
                            <div>
                                <p class="text-sm font-medium">Sales report generated</p>
                                <p class="text-xs text-gray-500 flex items-center"><i class="ph ph-clock mr-1"></i> 15 min ago</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="mt-1 w-2 h-2 bg-black rounded-full"></span>
                            <div>
                                <p class="text-sm font-medium">System backup completed</p>
                                <p class="text-xs text-gray-500 flex items-center"><i class="ph ph-clock mr-1"></i> 1 hour ago</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="mt-1 w-2 h-2 bg-black rounded-full"></span>
                            <div>
                                <p class="text-sm font-medium">New message received</p>
                                <p class="text-xs text-gray-500 flex items-center"><i class="ph ph-clock mr-1"></i> 2 hours ago</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="mt-1 w-2 h-2 bg-black rounded-full"></span>
                            <div>
                                <p class="text-sm font-medium">Database maintenance completed</p>
                                <p class="text-xs text-gray-500 flex items-center"><i class="ph ph-clock mr-1"></i> 3 hours ago</p>
                            </div>
                        </li>
                        <li class="flex items-start space-x-2">
                            <span class="mt-1 w-2 h-2 bg-black rounded-full"></span>
                            <div>
                                <p class="text-sm font-medium">User profile updated</p>
                                <p class="text-xs text-gray-500 flex items-center"><i class="ph ph-clock mr-1"></i> 4 hours ago</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Recent Activities -->
            
            <!-- USER PROFILE -->
            <div class="border-t p-4">
                <div class="flex items-center space-x-3">
                    <div class="avatar avatar-online">
                        <div class="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="font-semibold text-sm">Jokowi</p>
                        <p class="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </aside>
  
        <!-- Overlay for mobile -->
        <!-- <div
            class="fixed inset-0 bg-opacity-50 z-50 lg:hidden transition-all duration-300"
            v-show="isDrawerOpen"
            @click="isDrawerOpen = false"
        ></div> -->
  
      <!-- MAIN CONTENT -->
        <div
            :class="[
                'flex-1 flex flex-col transition-all duration-300',
                isDrawerOpen ? 'lg:ml-72' : 'ml-0'
            ]"
            >
            <!-- HEADER -->
            <header class="navbar shadow-md px-4">
                <div class="flex-none mr-5" v-if="!isDrawerOpen">
                    <button @click="toggleDrawer" class="btn btn-square btn-ghost">
                    <i :class="'ph ph-list text-xl'"></i>
                    <!-- !isDrawerOpen ? 'ph ph-x text-xl' : 'ph ph-list text-xl' -->
                    </button>
                </div>
                <div class="flex-1">
                    <h1 class="text-lg font-bold">{{ props.title }}</h1>
                    <p class="text-xs text-base-content/70">Welcome back, Jokowi</p>
                </div>
                <!-- Notification Dropdown -->
                <div class="flex-none">
                    <div class="dropdown dropdown-end">
                        <!-- Trigger -->
                        <label tabindex="0" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <i class="ph ph-bell text-xl"></i>
                            <span class="badge badge-xs badge-error indicator-item"></span>
                        </div>
                        </label>
                        <!-- Dropdown Content -->
                        <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow-lg">
                            <div class="card-body">
                                <div class="flex items-center justify-between">
                                    <h3 class="font-semibold text-sm">Recent Notifications</h3>
                                    <span class="badge badge-error text-xs">3</span>
                                </div>

                                <ul class="divide-y divide-gray-200">
                                <!-- Item 1 -->
                                    <li class="py-2 flex items-start space-x-3">
                                        <div class="bg-blue-100 text-blue-600 rounded-full p-2">
                                            <i class="ph ph-user text-lg"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm font-medium">New user registered</p>
                                            <p class="text-xs text-gray-500 mt-0.5 flex items-center">
                                                <i class="ph ph-clock mr-1"></i> 5 min ago
                                            </p>
                                        </div>
                                    </li>

                                    <!-- Item 2 -->
                                    <li class="py-2 flex items-start space-x-3">
                                        <div class="bg-red-100 text-red-600 rounded-full p-2">
                                            <i class="ph ph-warning text-lg"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm font-medium">System alert: High CPU usage</p>
                                            <p class="text-xs text-gray-500 mt-0.5 flex items-center">
                                                <i class="ph ph-clock mr-1"></i> 10 min ago
                                            </p>
                                        </div>
                                    </li>

                                    <!-- Item 3 -->
                                    <li class="py-2 flex items-start space-x-3">
                                        <div class="bg-purple-100 text-purple-600 rounded-full p-2">
                                            <i class="ph ph-envelope text-lg"></i>
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm font-medium">You have 3 new messages</p>
                                            <p class="text-xs text-gray-500 mt-0.5 flex items-center">
                                                <i class="ph ph-clock mr-1"></i> 20 min ago
                                            </p>
                                        </div>
                                    </li>
                                </ul>

                                <div class="pt-2">
                                    <a href="#" class="btn btn-sm btn-block btn-primary text-xs">
                                        View All Notifications
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Dark mode toggle -->
                <button @click="isDark = !isDark" class="btn btn-ghost btn-circle mx-5">
                    <i v-if="isDark" class="ph ph-sun text-xl"></i>
                    <i v-else class="ph ph-moon text-xl"></i>
                </button>
            </header>

            <!-- CONTENT (unchanged) -->
            <main class="p-6 bg-base-100 min-h-screen">
                <slot />
            </main>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import Sidebar from './Sidebar.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
});
  
Chart.register(...registerables)

const isDrawerOpen = ref(true)
const isDark = ref(false)

watch(isDark, (val) => {
    document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
    localStorage.setItem('theme', val ? 'dark' : 'light')
})

function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
}
  
onMounted(() => {
    const salesCtx = document.getElementById('salesChart') as HTMLCanvasElement
    const trendCtx = document.getElementById('trendChart') as HTMLCanvasElement
  
    if (salesCtx) {
      new Chart(salesCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Revenue',
              backgroundColor: '#f97316',
              data: [3000, 4500, 8000, 10000, 4000, 3000, 4500, 9000, 5000, 10000, 5500, 6500]
            },
            {
              label: 'Sales',
              backgroundColor: '#0ea5e9',
              data: [2000, 3500, 4000, 5000, 3000, 2500, 3300, 4200, 3000, 4300, 3800, 3900]
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      })
    }
  
    if (trendCtx) {
      new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'This Month',
              data: [2000, 3000, 9000, 4000],
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderColor: 'rgba(16, 185, 129, 1)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Last Month',
              data: [1500, 2000, 3000, 2500],
              backgroundColor: 'rgba(71, 85, 105, 0.2)',
              borderColor: 'rgba(71, 85, 105, 1)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      })
    }
})
</script>
  
<style>
canvas {
    width: 100% !important;
    height: auto !important;
}
</style>