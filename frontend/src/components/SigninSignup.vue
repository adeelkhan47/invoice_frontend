<template>
  <div
    class="min-h-screen flex justify-center items-center relative overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <img
        src="https://source.unsplash.com/random/1920x1080"
        class="w-full h-full object-cover opacity-50"
        alt="Background"
      />
    </div>
    <form
      class="w-full bg-white rounded-md relative z-10 p-10 max-w-lg"
      @submit.prevent="submitForm"
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            v-model="email"
            :class="{ 'border-red-500': emailError }"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="john@i.co"
          />
          <p v-if="emailError" class="text-red-500 text-xs italic">
            Please enter a valid email address.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            v-model="password"
            :class="{ 'border-red-500': passwordError }"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p v-if="isSignUp" class="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
          <p v-if="passwordError" class="text-red-500 text-xs italic">
            Please enter a valid password (min length 8).
          </p>
        </div>
      </div>
      <div v-if="isSignUp" class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="confirm-password"
          >
            Confirm Password
          </label>
          <input
            v-model="confirmPassword"
            :class="{ 'border-red-500': confirmPasswordError }"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="confirm-password"
            type="password"
            placeholder="******************"
          />
          <p class="text-gray-600 text-xs italic">
            Make it as same as password
          </p>
          <p v-if="confirmPasswordError" class="text-red-500 text-xs italic">
            Passwords do not match.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {{ isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Log In" }}
        </button>
      </div>
      <p v-if="!isSignUp" class="text-sm text-center text-gray-600">
        Don't have an account?
        <a @click="navigateTo('/signup')" class="cursor-pointer text-blue-500"
          >Sign Up</a
        >
      </p>
      <p v-else class="text-sm text-center text-gray-600">
        Already have an account?
        <a @click="navigateTo('/')" class="cursor-pointer text-blue-500"
          >Sign In</a
        >
      </p>
      <p v-if="errorMsg" class="mt-2 text-red-500 text-xs italic">
        {{ errorMsg }}
      </p>
    </form>
  </div>
</template>

<script>
import { post } from "@/services/http";
import { setToken } from "@/services/localStorage";

export default {
  name: "App",
  watch: {
    $route() {
      if (this.$route.path !== this.previousPath) {
        this.previousPath = this.$route.path;
        if (this.$route.path === "/") {
          this.isSignUp = false;
        } else if (this.$route.path === "/signup") {
          this.isSignUp = true;
        }
      }
    },
  },
  mounted() {
    if (this.$route.path === "/" && this.$route.path !== "/form") {
      this.isSignUp = false;
    }
  },
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
      confirmPassword: "",
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      isLoading: false,
      isSignUp: true,
    };
  },
  methods: {
    async submitForm() {
      try {
        this.errorMsg = "";
        this.emailError = false;
        this.passwordError = false;
        this.confirmPasswordError = false;

        if (!this.email || !this.isValidEmail(this.email)) {
          this.emailError = true;
          return;
        }

        if (!this.password || this.password.length < 8) {
          this.passwordError = true;
          return;
        }

        if (this.isSignUp && this.password !== this.confirmPassword) {
          this.confirmPasswordError = true;
          return;
        }
        const { access_token } = await post(
          `auth/${this.isSignUp ? "signup" : "login"}`,
          {
            email: this.email,
            password: this.password,
          }
        );
        await setToken(access_token);
        this.navigateTo("/form");
      } catch ({
        response: {
          data: { message },
        },
      }) {
        this.errorMsg = message;
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
