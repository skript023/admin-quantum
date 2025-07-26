<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import Chatbox from '@/components/Chatbox.vue';
import Chatmenu from '@/components/Chatmenu.vue';
import Navigation from '@/components/Navigation.vue';
import { onMounted, ref } from 'vue';

// State untuk mengontrol tampilan
const showChatMenu = ref(true); // Mulai dengan menampilkan ChatMenu
const selectedContact = ref<any>(null); // Untuk menyimpan kontak yang dipilih

const handleContactSelection = (contact: any) => {
    selectedContact.value = contact;
    showChatMenu.value = false; // Sembunyikan ChatMenu, tampilkan Chatbox
    console.log('Selected contact:', contact);
    // Di sini Anda bisa memuat data chat untuk kontak yang dipilih ke Chatbox
    // Misalnya, Anda bisa meneruskan `selectedContact` sebagai prop ke Chatbox
};

// Fungsi untuk kembali ke Chat Menu (jika diperlukan, misalnya tombol back di Chatbox)
const goBackToMenu = () => {
    showChatMenu.value = true;
    selectedContact.value = null;
};

Chart.register(...registerables)

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

<template>
    <Navigation title="Admin Dashboard">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div class="p-4 border border-green-300 rounded-xl shadow-sm bg-base">
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
                    <h3 class="text-lg font-semibold">2,345</h3>
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
                    <h3 class="text-lg font-semibold">2,345</h3>
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
                    <h3 class="text-lg font-semibold">1,234</h3>
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
                    <h3 class="text-lg font-semibold">12,456</h3>
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
                <Chatmenu v-if="showChatMenu" @select-contact="handleContactSelection" />
                <Chatbox v-else :selectedContact="selectedContact" @back-to-menu="goBackToMenu" />
            </div>
        </div>
    </Navigation>
</template>