<template>
    <Navigation title="System Status">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold">System Status</h1>
        <p class="text-gray-500">Monitor system health and performance</p>
      </div>
  
      <!-- Alert Box -->
    <div class="alert bg-yellow-100 text-yellow-800 mb-6 border border-yellow-300 shadow-sm">
        <i class="ph ph-warning text-xl"></i>
        <div>
            <h3 class="font-semibold">Some Systems Degraded</h3>
            <p class="text-sm">Some services are experiencing issues</p>
        </div>
    </div>

    <!-- Resource Usage Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="rounded-xl p-4 bg-base-100 border shadow-sm relative">
            <div class="absolute top-2 right-2 text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">Normal</div>
            <div class="flex items-center gap-2 mb-2">
                <i class="ph ph-cpu text-lg text-gray-500"></i>
            <span class="font-medium text-sm">CPU Usage</span>
            </div>
            <div class="text-2xl font-bold mb-1">46%</div>
            <progress class="progress progress-success w-full" value="46" max="100"></progress>
        </div>

        <div class="rounded-xl p-4 bg-base-100 border shadow-sm relative">
            <div class="absolute top-2 right-2 text-red-600 text-xs bg-red-100 px-2 py-0.5 rounded">Critical</div>
            <div class="flex items-center gap-2 mb-2">
            <i class="ph ph-hard-drives text-lg text-gray-500"></i>
            <span class="font-medium text-sm">Memory Usage</span>
            </div>
            <div class="text-2xl font-bold mb-1">84%</div>
            <progress class="progress progress-error w-full" value="84" max="100"></progress>
        </div>

        <div class="rounded-xl p-4 bg-base-100 border shadow-sm relative">
            <div class="absolute top-2 right-2 text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">Normal</div>
            <div class="flex items-center gap-2 mb-2">
            <i class="ph ph-device-mobile text-lg text-gray-500"></i>
            <span class="font-medium text-sm">Disk Usage</span>
            </div>
            <div class="text-2xl font-bold mb-1">29%</div>
            <progress class="progress progress-success w-full" value="29" max="100"></progress>
        </div>

        <div class="rounded-xl p-4 bg-base-100 border shadow-sm relative">
            <div class="absolute top-2 right-2 text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded">Normal</div>
            <div class="flex items-center gap-2 mb-2">
            <i class="ph ph-wifi-high text-lg text-gray-500"></i>
            <span class="font-medium text-sm">Network I/O</span>
            </div>
            <div class="text-2xl font-bold mb-1">18%</div>
            <progress class="progress progress-success w-full" value="18" max="100"></progress>
        </div>
    </div>

    <!-- Service Table -->
    <div class="card bg-base-100 shadow-sm border mb-6">
        <div class="card-body">
            <h2 class="card-title text-base mb-4">Services</h2>
            <div class="divide-y">
            <div v-for="service in services" :key="service.name" class="py-4 flex justify-between items-center">
                <div class="flex items-start gap-4">
                    <i :class="service.icon + ' text-xl text-gray-600'"></i>
                    <div>
                        <h3 class="font-semibold text-sm">{{ service.name }}</h3>
                        <p class="text-xs text-gray-500">{{ service.description }}</p>
                    </div>
                    </div>
                    <div class="text-right">
                        <div class="flex items-start gap-6 justify-end">
                            <!-- Kolom 1: Uptime -->
                            <div class="flex flex-col items-end">
                            <p class="text-xs text-gray-500 font-medium">{{ service.uptime }} uptime</p>
                            <p class="text-[10px] text-gray-400">Last 30 days</p>
                            </div>

                            <!-- Kolom 2: Response time -->
                            <div class="flex flex-col items-end">
                            <p class="text-xs text-gray-500 font-medium">Response time</p>
                            <p class="text-[10px] text-gray-400">{{ service.response }}</p>
                            </div>

                            <!-- Kolom 3: Status -->
                            <span
                            class="badge text-xs px-3 py-0.5"
                            :class="{
                                'badge-success': service.status === 'Operational',
                                'badge-warning': service.status === 'Degraded',
                                'badge-error': service.status === 'Down'
                            }"
                            >
                            {{ service.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
      <!-- Recent Incidents -->
      <div class="card bg-base-100 shadow mb-6">
        <div class="card-body">
          <h2 class="card-title">Recent Incidents</h2>
          <ul class="space-y-4">
            <li>
              <p class="font-semibold text-yellow-500">File Storage Performance Degradation</p>
              <p class="text-sm text-gray-500">
                Users may experience slow file upload and download speeds.
              </p>
              <p class="text-xs text-gray-400">6 hours ago</p>
            </li>
            <li>
              <p class="font-semibold text-blue-500">Scheduled Maintenance - Database Optimization</p>
              <p class="text-sm text-gray-500">
                Routine database maintenance completed successfully.
              </p>
              <p class="text-xs text-gray-400">1 day ago</p>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- 90-Day Uptime History -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">90-Day Uptime History</h2>
          <div class="grid grid-cols-90 gap-1 mt-4">
            <div v-for="day in 90" :key="day" class="w-3 h-3 rounded-sm"
                 :class="getRandomStatus()">
            </div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-4">
            <div><span class="w-3 h-3 bg-green-500 inline-block mr-1"></span>Operational</div>
            <div><span class="w-3 h-3 bg-yellow-500 inline-block mr-1"></span>Degraded</div>
            <div><span class="w-3 h-3 bg-red-500 inline-block mr-1"></span>Outage</div>
          </div>
        </div>
      </div>
    </Navigation>
</template>
  
<script setup>
import Navigation from "@/components/Navigation.vue";
  
const services = [
  {
    name: "Web Application",
    description: "Main web application and user interface",
    uptime: "99.9%",
    response: "103ms",
    status: "Operational",
    icon: "ph ph-globe-hemisphere-west"
  },
  {
    name: "API Gateway",
    description: "Core API services and endpoints",
    uptime: "99.8%",
    response: "79ms",
    status: "Operational",
    icon: "ph ph-link"
  },
  {
    name: "Database",
    description: "Primary database cluster",
    uptime: "99.95%",
    response: "33ms",
    status: "Operational",
    icon: "ph ph-database"
  },
  {
    name: "Authentication",
    description: "User authentication and authorization",
    uptime: "99.7%",
    response: "69ms",
    status: "Operational",
    icon: "ph ph-shield-check"
  },
  {
    name: "File Storage",
    description: "File upload and storage services",
    uptime: "98.5%",
    response: "311ms",
    status: "Degraded",
    icon: "ph ph-folder-simple"
  },
  {
    name: "Email Service",
    description: "Email notifications and communications",
    uptime: "99.6%",
    response: "210ms",
    status: "Operational",
    icon: "ph ph-envelope"
  }
];
  // Dummy color status
function getRandomStatus() {
    const statuses = ["bg-green-500", "bg-yellow-500", "bg-red-500"];
    const rand = Math.random();
    if (rand > 0.9) return statuses[2];
    if (rand > 0.75) return statuses[1];
    return statuses[0];
}
</script>
  