// export default function ({ store, redirect }) {
//   //   check if user is already logged in
//   if (store.getters.isAuthenticated) {
//     if (store.getters.authUser) {
//       const { profile, loggedIn } = store.getters.authUser;

//       //   if user KYC is not completed, take to KYC page
//       if (!loggedIn) {
//         return redirect('/');
//       }

//       if (!profile.isKYC) {
//         return redirect('/profile/kyc');
//       }

//       // else redirect to marketplace
//       return redirect('/dashboard');
//     }
//   }
// }
