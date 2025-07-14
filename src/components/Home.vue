<template>
    <div class="flex">
      <!-- Sidebar -->
        <aside
            :class="[
                'fixed z-40 top-0 left-0 w-72 bg-base text-base-content min-h-screen p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out',
                isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            ]"
            >
            <!-- Top Navigation -->
            <div>
                <div class="flex items-center space-x-2 mb-6">
                    <img src="/logo.png" alt="Logo" class="w-6 h-6" />
                    <div>
                        <h2 class="text-lg font-semibold leading-tight">Admin Panel</h2>
                        <p class="text-xs text-gray-500 leading-tight">Control Center</p>
                    </div>
                </div>

                <div class="mt-8">
                    <p class="text-xs text-gray-500 font-semibold mb-2">NAVIGATION</p>
                    <ul class="menu space-y-1 w-full">
                        <li><a class="active"><i class="ph ph-gauge mr-2"></i> Dashboard</a></li>
                        <li><a><i class="ph ph-chart-bar mr-2"></i> Analytics</a></li>
                        <li><a><i class="ph ph-users mr-2"></i> Users</a></li>
                        <li><a><i class="ph ph-file-text mr-2"></i> Reports</a></li>
                        <li><a><i class="ph ph-chat-circle-text mr-2"></i> Messages</a></li>
                        <li><a><i class="ph ph-calendar-blank mr-2"></i> Calendar</a></li>
                    </ul>
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="p-4 border border-green-300 rounded-xl shadow-sm bg-white">
                        <div class="flex justify-between items-start">
                            <!-- Icon box -->
                            <div class="bg-green-50 text-green-600 p-2 rounded-lg">
                            <i class="ph ph-shopping-cart text-2xl"></i>
                            </div>

                            <!-- Growth indicator -->
                            <div class="flex items-center text-green-500 text-sm font-medium">
                            <i class="ph ph-trend-up mr-1"></i> +12.5%
                            </div>
                        </div>

                        <!-- Stat value -->
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-gray-800">2,345</h3>
                            <p class="text-sm text-green-500 mt-1">New Orders</p>
                        </div>
                    </div>
                    <div class="p-4 border border-red-300 rounded-xl shadow-sm bg-base">
                        <div class="flex justify-between items-start">
                            <!-- Icon box -->
                            <div class="bg-red-50 text-red-600 p-2 rounded-lg">
                            <i class="ph ph-sign-out text-2xl"></i>
                            </div>

                            <!-- Growth indicator -->
                            <div class="flex items-center text-red-500 text-sm font-medium">
                            <i class="ph ph-trend-down mr-1"></i> -2.1%
                            </div>
                        </div>

                        <!-- Stat value -->
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-gray-800">2,345</h3>
                            <p class="text-sm text-red-500 mt-1">Bounce Rate</p>
                        </div>
                    </div>
                    <div class="p-4 border border-blue-300 rounded-xl shadow-sm bg-base">
                        <div class="flex justify-between items-start">
                            <!-- Icon box -->
                            <div class="bg-blue-50 text-blue-600 p-2 rounded-lg">
                            <i class="ph ph-user-plus text-2xl"></i>
                            </div>

                            <!-- Growth indicator -->
                            <div class="flex items-center text-green-500 text-sm font-medium">
                            <i class="ph ph-trend-down mr-1"></i> +8.2%
                            </div>
                        </div>

                        <!-- Stat value -->
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-gray-800">1,234</h3>
                            <p class="text-sm text-blue-500 mt-1">User Registrations</p>
                        </div>
                    </div>
                    <div class="p-4 border border-purple-300 rounded-xl shadow-sm bg-base">
                        <div class="flex justify-between items-start">
                            <!-- Icon box -->
                            <div class="bg-blue-50 text-purple-600 p-2 rounded-lg">
                            <i class="ph ph-users text-2xl"></i>
                            </div>

                            <!-- Growth indicator -->
                            <div class="flex items-center text-red-500 text-sm font-medium">
                            <i class="ph ph-trend-down mr-1"></i> -15.3%
                            </div>
                        </div>

                        <!-- Stat value -->
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-gray-800">12,456</h3>
                            <p class="text-sm text-purple-500 mt-1">Unique Visitors</p>
                        </div>
                    </div>
                </div>
        
                <!-- CHARTS AND WIDGETS -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card bg-base-100 shadow">
                    <div class="card-body">
                        <h2 class="card-title">Sales Overview</h2>
                        <p class="text-sm text-base-content/70">Monthly sales and revenue data</p>
                        <canvas id="salesChart" class="mt-4 w-full h-40"></canvas>
                    </div>
                    </div>
        
                    <div class="card bg-base-100 shadow">
                    <div class="card-body">
                        <h2 class="card-title">Sales Trend</h2>
                        <p class="text-sm text-base-content/70">Weekly comparison between this month and last month</p>
                        <canvas id="trendChart" class="mt-4 w-full h-40"></canvas>
                    </div>
                    </div>
                </div>
        
                <!-- TASK LIST + CALENDAR -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div class="card bg-base-100 shadow">
                        <div class="card-body">
                            <h2 class="card-title">Task List</h2>
                            <input type="text" placeholder="Add new task..." class="input input-bordered w-full mb-4" />
                            <ul class="space-y-2">
                            <li class="flex justify-between items-center p-3 bg-base-200 rounded">
                                <span><i class="ph ph-circle-fill text-error mr-2"></i> Review quarterly report</span>
                                <span class="badge badge-error">High</span>
                            </li>
                            <li class="flex justify-between items-center p-3 bg-base-200 rounded">
                                <span><i class="ph ph-circle-fill text-warning mr-2"></i> Update website content</span>
                                <span class="badge badge-warning">Medium</span>
                            </li>
                            <li class="flex justify-between items-center p-3 bg-base-200 rounded">
                                <span><i class="ph ph-circle-fill text-error mr-2"></i> Call supplier about delivery</span>
                                <span class="badge badge-error">High</span>
                            </li>
                            <li class="flex justify-between items-center p-3 bg-base-200 rounded">
                                <span><i class="ph ph-circle-fill text-warning mr-2"></i> Prepare presentation slides</span>
                                <span class="badge badge-warning">Medium</span>
                            </li>
                            <li class="flex justify-between items-center p-3 bg-base-200 rounded">
                                <span><i class="ph ph-circle-fill text-success mr-2"></i> Schedule team meeting</span>
                                <span class="badge badge-success">Low</span>
                            </li>
                            </ul>
                        </div>
                    </div>
        
                    <div class="card bg-base-100 shadow">
                        <div class="card-body">
                            <h2 class="card-title">Calendar</h2>
                            <!-- You can use a calendar plugin or a simple grid -->
                            <div class="mt-4 text-sm">
                            <p class="text-center font-semibold">July 2025</p>
                            <!-- Simplified calendar or use Vue calendar lib -->
                            <!-- Upcoming Events List -->
                            <div class="mt-4 space-y-2">
                                <div class="flex justify-between"><span><i class="ph ph-circle-fill text-primary mr-1"></i>Team Meeting</span><span>July 15</span></div>
                                <div class="flex justify-between"><span><i class="ph ph-circle-fill text-error mr-1"></i>Project Deadline</span><span>July 22</span></div>
                                <div class="flex justify-between"><span><i class="ph ph-circle-fill text-warning mr-1"></i>Review Session</span><span>July 28</span></div>
                                <div class="flex justify-between"><span><i class="ph ph-circle-fill text-info mr-1"></i>Client Call</span><span>July 5</span></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import {
    Chart,
    registerables
  } from 'chart.js'
  
  Chart.register(...registerables)
  
  const isDrawerOpen = ref(false)
  
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