import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/user/auth'; 

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
    const token = sessionStorage.getItem("token"); // get token from cookies
  
    if (token) {
      // check if value exists
      authenticated.value = true; // update the state to authenticated
    }
  
    // if token exists and url is /login redirect to homepage
    if (token && to?.name === 'login') {
      return navigateTo('/');
    }
  
    // if token doesn't exist redirect to log in
    if (!token && to?.name !== 'login') {
      abortNavigation();
      return navigateTo('/login');
    }
  });