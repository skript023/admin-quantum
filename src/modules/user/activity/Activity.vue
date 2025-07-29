<template>
	<Navigation title="User Activity">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-xl font-semibold">User Activity</h2>
				<p class="text-sm opacity-70 mb-4">Monitor user engagement and activity</p>
		
				<div class="mb-4">
					<div class="form-control w-full mb-4">
					<label class="input input-bordered flex items-center gap-2 w-full rounded-full">
						<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4 opacity-70"
						>
						<path
							fill-rule="evenodd"
							d="M9.965 11.026A4.99 4.99 0 0 1 1.5 6.5C1.5 3.443 3.443 1.5 6.5 1.5S11.5 3.443 11.5 6.5c0 1.638-.64 3.14-1.675 4.192l3.44 3.44a.5.5 0 0 1-.708.708l-3.44-3.44Z"
							clip-rule="evenodd"
						></path>
						</svg>
						<input
						type="text"
						class="grow"
						placeholder="Search users..."
						v-model="searchQuery"
						/>
					</label>
				</div>


				<div class="flex gap-2 mb-4">
					<div class="dropdown dropdown-bottom">
						<div tabindex="0" role="button" class="btn btn-sm m-1">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4v8m0-4a2 2 0 110 4m-9 8h.01M18 18h.01"></path>
							</svg>
							All Status
						</div>
						<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
							<li><a @click="selectedStatus = 'all'">All Status</a></li>
							<li><a @click="selectedStatus = 'online'">Online</a></li>
							<li><a @click="selectedStatus = 'offline'">Offline</a></li>
							<li><a @click="selectedStatus = 'away'">Away</a></li>
						</ul>
					</div>
		
					<div class="dropdown dropdown-bottom">
						<div tabindex="0" role="button" class="btn btn-sm m-1">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
							</svg>
							All Memberships
						</div>
						<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
							<li><a @click="selectedMembership = 'all'">All Memberships</a></li>
							<li><a @click="selectedMembership = 'Premium'">Premium</a></li>
							<li><a @click="selectedMembership = 'Free'">Free</a></li>
						</ul>
					</div>
				</div>
			</div>
	
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div class="p-4 rounded-lg bg-green-50 text-green-800 flex flex-col items-start">
					<div class="flex items-center text-lg font-semibold mb-2">
						<div class="w-3 h-3 rounded-full bg-success mr-2"></div>
						Online Users
						</div>
						<span class="text-3xl font-bold">{{ onlineUsersCount }}</span>
					</div>
					<div class="p-4 rounded-lg bg-yellow-50 text-yellow-800 flex flex-col items-start">
						<div class="flex items-center text-lg font-semibold mb-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 12c0 2.493-2.007 4.5-4.5 4.5s-4.5-2.007-4.5-4.5 2.007-4.5 4.5-4.5 4.5 2.007 4.5 4.5zM12 12V3m0 9v9m9-9H3"></path>
							</svg>
							Premium Users
						</div>
						<span class="text-3xl font-bold">{{ premiumUsersCount }}</span>
					</div>
					<div class="p-4 rounded-lg bg-blue-50 text-blue-800 flex flex-col items-start">
						<div class="flex items-center text-lg font-semibold mb-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
						</svg>
						Total Users
					</div>
					<span class="text-3xl font-bold">{{ totalUsersCount }}</span>
				</div>
			</div>
	
			<ul class="space-y-4 max-h-[768px] overflow-y-auto pr-2">
				<li v-for="contact in filteredContacts" :key="contact.id" class="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors duration-200 border border-base-300"
					@click="$emit('select-contact', contact)"
				>
					<div :class="['avatar', { 'avatar-online': contact.status === 'online' }, { 'avatar-offline': contact.status === 'offline' }, { 'avatar-away': contact.status === 'away' }]">
						<div class="w-12 h-12 rounded-full">
							<img v-if="contact.avatar" :src="contact.avatar" :alt="contact.name" />
							<div v-else class="w-full h-full flex items-center justify-center bg-gray-300 text-lg font-bold text-gray-800">
								{{ getInitials(contact.name) }}
							</div>
						</div>
					</div>
					<div class="flex-1">
						<div class="font-semibold text-base flex items-center">
							{{ contact.name }}
							<span v-if="contact.membership === 'Premium'" class="badge badge-success badge-sm ml-2">Premium</span>
							<span v-if="contact.membership === 'Free'" class="badge badge-info badge-sm ml-2">Free</span>
						</div>
						<div class="text-sm opacity-70">{{ contact.email }}</div>
						<div class="text-xs opacity-50 mt-1">{{ contact.lastLogin }}</div>
					</div>
					<div class="flex items-center text-sm opacity-70">
						<div
							:class="[
							'w-2 h-2 rounded-full mr-1',
							{
								'bg-success': contact.status === 'online',
								'bg-warning': contact.status === 'away',
								'bg-gray-400': contact.status === 'offline',
							},
							]"
						></div>
						<span class="capitalize">{{ contact.status }}</span>
					</div>
					<button class="btn btn-ghost btn-sm btn-circle">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
					</svg>
					</button>
				</li>
			</ul>
		</div>
		</div>
	</Navigation>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['select-contact']);

// Data Kontak (diperkaya dengan email, membership, lastLogin)
const contacts = ref([
  	{
      id: 1,
      name: 'Budi Santoso',
      email: 'budi.santoso@ellohim.com',
      status: 'online', // 'online', 'away', 'offline'
      membership: 'Premium', // 'Premium', 'Free'
      lastLogin: 'Last login: 2 minutes ago',
      avatar: 'https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp', // Contoh avatar URL
  	},
  	{
      id: 2,
      name: 'Sari Dewi',
      email: 'sari.dewi@ellohim.com',
      status: 'online',
      membership: 'Free',
      lastLogin: 'Last login: 15 minutes ago',
      avatar: 'https://img.daisyui.com/images/profile/demo/gordon@192.webp', // Contoh avatar URL
  	},
	{
		id: 3,
		name: 'Ahmad Rizki',
		email: 'ahmad.rizki@ellohim.com',
		status: 'offline',
		membership: 'Premium',
		lastLogin: 'Last login: 1 hour ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/kenobee@192.webp',
	},
	{
		id: 4,
		name: 'Maya Kusuma',
		email: 'maya.kusuma@ellohim.com',
		status: 'away',
		membership: 'Free',
		lastLogin: 'Last login: 30 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp',
	},
	{
		id: 5,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
	{
		id: 6,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
	{
		id: 7,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
	{
		id: 8,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
	{
		id: 9,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
	{
		id: 10,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
	{
		id: 11,
		name: 'Citra Kirana',
		email: 'citra.kirana@ellohim.com',
		status: 'online',
		membership: 'Premium',
		lastLogin: 'Last login: 5 minutes ago',
		avatar: 'https://img.daisyui.com/images/profile/demo/leia@192.webp',
	},
]);

// --- Filter & Search States ---
const searchQuery = ref('');
const selectedStatus = ref('all'); // 'all', 'online', 'offline', 'away'
const selectedMembership = ref('all'); // 'all', 'Premium', 'Free'

// --- Computed Properties for Filtering ---
const filteredContacts = computed(() => {
	let filtered = contacts.value;

	// Filter by search query
	if (searchQuery.value) 
	{
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(
			(contact) =>
			contact.name.toLowerCase().includes(query) ||
			contact.email.toLowerCase().includes(query)
		);
	}

	// Filter by status
	if (selectedStatus.value !== 'all') 
	{
		filtered = filtered.filter((contact) => contact.status === selectedStatus.value);
	}

	// Filter by membership
	if (selectedMembership.value !== 'all') 
	{
		filtered = filtered.filter((contact) => contact.membership === selectedMembership.value);
	}

	return filtered;
});

// --- Computed Properties for Stats Cards ---
const onlineUsersCount = computed(() =>
  	contacts.value.filter((contact) => contact.status === 'online').length
);
const premiumUsersCount = computed(() =>
  	contacts.value.filter((contact) => contact.membership === 'Premium').length
);
const totalUsersCount = computed(() => contacts.value.length);

// --- Utility Function ---
const getInitials = (name: string): string => {
	const parts = name.split(' ');
	let initials = '';
	if (parts.length > 0) 
	{
		initials += parts[0].charAt(0).toUpperCase();
	}
	
	if (parts.length > 1) 
	{
		initials += parts[1].charAt(0).toUpperCase();
	}
	return initials;
};
</script>

<style scoped>
/* No specific scoped styles needed if only using DaisyUI and Tailwind */
</style>