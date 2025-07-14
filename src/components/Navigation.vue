<template>
    <div class="flex">
      <!-- Sidebar -->
        <aside
            :class="[
                'fixed z-40 top-0 left-0 w-72 bg-base text-base-content p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out',
                'overflow-y-auto max-h-screen', // ✅ Tambahkan ini
                isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            ]"
            >
            <!-- Top Navigation -->
            <div>
                <div class="flex items-center space-x-2 mb-6">
                    <img src="/logo.png" alt="Logo" class="w-6 h-6" />
                    <div>
                        <h3 class="font-semibold leading-tight">Admin Panel</h3>
                        <p class="text-gray-500 leading-tight">Control Center</p>
                    </div>
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
            <div class="mt-6 border-t pt-4 min-h-full min-w-full">
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
        <div
            class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            v-show="isDrawerOpen"
            @click="isDrawerOpen = false"
        ></div>
  
      <!-- MAIN CONTENT -->
        <div
            :class="[
                'flex-1 flex flex-col transition-all duration-300',
                isDrawerOpen ? 'lg:ml-72' : 'ml-0'
            ]"
            >
            <!-- HEADER -->
            <header class="navbar bg-base-100 shadow-md px-4">
                <div class="flex-none mr-5">
                    <button @click="toggleDrawer" class="btn btn-square btn-ghost">
                    <i :class="isDrawerOpen ? 'ph ph-x text-xl' : 'ph ph-list text-xl'"></i>
                    </button>
                </div>
                <div class="flex-1">
                    <h1 class="text-lg font-bold">Admin Dashboard</h1>
                    <p class="text-xs text-base-content/70">Welcome back, Jokowi</p>
                </div>
            </header>

            <!-- CONTENT (unchanged) -->
            <main class="p-6 bg-base-100 min-h-screen">
                <slot />
            </main>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import Sidebar from './Sidebar.vue'
  
Chart.register(...registerables)

const isDrawerOpen = ref(true)

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