<template>
  <Navigation title="User Activity">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold">User Activity</h1>
      <p class="text-sm opacity-70">Monitor user engagement and activity</p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-2 space-y-2 lg:space-y-0 mt-4">
      <div class="flex-1">
        <input
          type="text"
          v-model="search"
          placeholder="Search users..."
          class="input input-bordered w-full"
        />
      </div>
      <div class="flex space-x-2">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-outline btn-sm">All Status</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
            <li><a @click="status = 'All'">All</a></li>
            <li><a @click="status = 'Online'">Online</a></li>
            <li><a @click="status = 'Offline'">Offline</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <label tabindex="0" class="btn btn-outline btn-sm">All Memberships</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
            <li><a @click="membership = 'All'">All</a></li>
            <li><a @click="membership = 'Premium'">Premium</a></li>
            <li><a @click="membership = 'Free'">Free</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Statistik Card -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div class="p-4 border border-green-300 rounded-xl shadow-sm bg-base-100">
        <h2 class="font-semibold">Online Users</h2>
        <p class="text-3xl font-bold">{{ onlineCount }}</p>
      </div>
      <div class="p-4 border border-yellow-300 rounded-xl shadow-sm bg-base-100">
        <h2 class="font-semibold">Premium Users</h2>
        <p class="text-3xl font-bold">{{ premiumCount }}</p>
      </div>
      <div class="p-4 border border-blue-300 rounded-xl shadow-sm bg-base-100">
        <h2 class="font-semibold">Total Users</h2>
        <p class="text-3xl font-bold">{{ users.length }}</p>
      </div>
    </div>

    <!-- User List -->
    <div class="space-y-4 mt-6">
      <div
        v-for="user in filteredUsers"
        :key="user.email"
        class="card bg-base-100 shadow hover:shadow-md transition"
      >
        <div class="card-body flex flex-col sm:flex-row sm:items-center justify-between">
          <!-- User Info -->
          <div class="flex items-center space-x-4">
            <div class="avatar placeholder">
              <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span class="text-lg">{{ user.initials }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold flex items-center space-x-2">
                <span>{{ user.name }}</span>
                <span
                  v-if="user.membership === 'Premium'"
                  class="badge badge-warning badge-sm"
                >
                  Premium
                </span>
              </div>
              <div class="text-xs opacity-70">
                {{ user.email }}
              </div>
              <div class="text-xs opacity-50">
                Last login: {{ user.lastLogin }}
              </div>
            </div>
          </div>
          <!-- Status -->
          <div class="mt-2 sm:mt-0">
            <span :class="[ 'badge', user.status === 'Online' ? 'badge-success' : 'badge-ghost' ]">
              {{ user.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Navigation>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import { ref, computed } from "vue";

const search = ref("");
const status = ref("All");
const membership = ref("All");

const users = ref([
  { name: "budi_santoso", email: "budi.santoso@ellohim.com", lastLogin: "2 minutes ago", status: "Online", membership: "Premium", initials: "BS" },
  { name: "sari_dewi", email: "sari.dewi@ellohim.com", lastLogin: "15 minutes ago", status: "Online", membership: "Free", initials: "SD" },
  { name: "ahmad_rizki", email: "ahmad.rizki@ellohim.com", lastLogin: "1 hour ago", status: "Offline", membership: "Premium", initials: "AR" },
  { name: "indira_putri", email: "indira.putri@ellohim.com", lastLogin: "3 hours ago", status: "Offline", membership: "Free", initials: "IP" },
  { name: "dani_pratama", email: "dani.pratama@ellohim.com", lastLogin: "5 hours ago", status: "Online", membership: "Premium", initials: "DP" },
  { name: "maya_sari", email: "maya.sari@ellohim.com", lastLogin: "6 hours ago", status: "Offline", membership: "Free", initials: "MS" }
]);

const onlineCount = computed(() => users.value.filter(u => u.status === "Online").length);
const premiumCount = computed(() => users.value.filter(u => u.membership === "Premium").length);

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const matchSearch = u.name.includes(search.value) || u.email.includes(search.value);
    const matchStatus = status.value === "All" || u.status === status.value;
    const matchMembership = membership.value === "All" || u.membership === membership.value;
    return matchSearch && matchStatus && matchMembership;
  });
});
</script>

<style scoped>
.card-title {
  font-size: 1rem;
}
</style>
