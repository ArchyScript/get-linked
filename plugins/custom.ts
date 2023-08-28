export default defineNuxtPlugin((nuxtApp) => {
  //   console.log('nuxtApp::::', nuxtApp);
  nuxtApp.provide('test', () => {
    console.log('test');
  });
  const sayHello = () => {
    console.log('Hello');
  };

  return {
    provide: {
      showToast: (msg: string) => {
        `Hello ${msg}!`;
      },
      sayHello,
    },
  };
});
