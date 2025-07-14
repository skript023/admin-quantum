<template>
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="card w-full max-w-md bg-base-100 shadow-2xl">
            <div class="card-body">
                <!-- Logo -->
                <div class="flex justify-center mb-6">
                    <div class="w-16 h-16 rounded-lg flex items-center justify-center">
                        <img src="/public/logo.png" alt="Logo" class="w-full h-full object-contain" id="logoImage">
                    </div>
                </div>
                
                <!-- Title -->
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold text-base-content">Admin Login</h1>
                    <p class="text-base-content/70 text-sm mt-2">Masuk ke dashboard admin</p>
                </div>
                
                <!-- Form -->
                <form id="loginForm" class="space-y-4">
                    <!-- Email Field -->
                    <div class="form-control">
                        <label class="label mb-3">
                            <span class="label-text font-medium">Email</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                            </div>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="admin@example.com" 
                                class="input input-bordered w-full pl-10 bg-gray-50 input-focus" 
                                v-model="credential.identity"
                                required>
                        </div>
                    </div>
                    
                    <!-- Password Field -->
                    <div class="form-control">
                        <label class="label mb-3">
                            <span class="label-text font-medium">Password</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="••••••••" 
                                class="input input-bordered w-full pl-10 bg-gray-50 input-focus" 
                                v-model="credential.password"
                                required>
                        </div>
                    </div>
                    
                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between mt-6">
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <input type="checkbox" id="remember" name="remember" class="checkbox checkbox-sm checkbox-primary mr-2">
                                <span class="label-text text-sm">Ingat saya</span>
                            </label>
                        </div>
                        <a href="#" class="link link-primary text-sm font-medium">Lupa password?</a>
                    </div>
                    
                    <!-- Login Button -->
                    <div class="form-control mt-6">
                        <button type="button" class="btn btn-neutral w-full" id="loginBtn">
                            <span class="loading loading-spinner loading-sm hidden" id="loadingSpinner"></span>
                            <span id="btnText">Masuk</span>
                        </button>
                    </div>
                </form>
                
                <!-- Register Link -->
                <div class="text-center mt-6">
                    <p class="text-sm text-base-content/70">
                        Belum punya akun? 
                        <a href="#" class="link link-primary font-medium" onclick="showRegisterMessage()">
                            Hubungi administrator
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Modal -->
    <dialog id="successModal" class="modal">
        <div class="modal-box">
            <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>
            <h3 class="font-bold text-lg text-center">Login Berhasil!</h3>
            <p class="py-4 text-center text-base-content/70">Selamat datang di dashboard admin.</p>
            <div class="modal-action justify-center">
                <button class="btn btn-primary" onclick="closeSuccessModal()">OK</button>
            </div>
        </div>
    </dialog>

    <!-- Contact Admin Modal -->
    <dialog id="contactModal" class="modal">
        <div class="modal-box">
            <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 bg-info rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>
            <h3 class="font-bold text-lg text-center">Hubungi Administrator</h3>
            <p class="py-4 text-center text-base-content/70">Silakan hubungi administrator untuk mendapatkan akses akun.</p>
            <div class="modal-action justify-center">
                <button class="btn btn-primary" onclick="closeContactModal()">Mengerti</button>
            </div>
        </div>
    </dialog>
</template>
<script lang="ts">
import authentication from '@/stores/authentication';


export default {
    data() {
        return {
            theme: 'light', // Default theme
            credential: {} as { identity: string; password: string; }
        };
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', this.theme);
            localStorage.setItem('theme', this.theme);
        },
        login() {
            authentication.login(this.credential).then((response) => {
				if (response)
				{
					this.$router.push('/home');
				}
			})
        }
    }
}
</script>