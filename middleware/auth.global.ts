// middleware/auth.ts
// import { isAuthenticated } from '~/authService';
// import { useAuthStore } from '~/store/authentication';
// const { logout, savePreviousRoute } = useAuthStore();
// const { logout, previousRoute } = useAuthStore();

export default defineNuxtRouteMiddleware(async (to, from) => {
  // skip middleware on server
  //   if (process.server) return;
  //   // skip middleware on client side entirely
  //   if (process.client) return;
  //   // or only skip middleware on initial client load
  //   const nuxtApp = useNuxtApp();
  //   if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return;

  console.log('middleware/auth');
  // console.log('process.server', process.server);
  // console.log('process.client', process.client);
  // console.log(
  //   'nuxtApp.isHydrating && nuxtApp.payload.serverRendered',
  //   nuxtApp.isHydrating,
  //   nuxtApp.payload.serverRendered,
  // );
  // console.log('to', to);
  // console.log('from', from);

  // clear console
  // console.clear();
});

// export default function useAuthGuard() {
//   const route = useRoute();

//   if (route.meta.requiresAuth) {
//     //   if (route.meta.requiresAuth && !isAuthenticated()) {
//     // Redirect to login page
//     return { redirect: '/auth/login' };
//   }

//   console.log('route.meta', route.meta);
//   console.log('route.meta.requiresAuth', route.meta.requiresAuth);

//   return { redirect: '/api/test/sonsense' };
// }
