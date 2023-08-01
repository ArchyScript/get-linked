// import { getKycStatus } from '../utils/kyc';

// export default function ({ store, redirect }) {
//   //   check if user has completed kyc
//   if (store.getters.isAuthenticated) {
//     const { profile, kyc } = store.state.auth.user;
//     const { isKYC, userType } = profile;

//     const hasNoName = !kyc.first_name || !kyc.last_name;
//     if (hasNoName) {
//       return redirect('/profile/kyc');
//     }

//     if (!isKYC) {
//       const isBuyer = String(userType).toLowerCase() === 'buyer';
//       const {
//         hasNoRepValues,
//         hasNotCompletedCompanyKyc,
//         hasNotCompletedDocumentPhase,
//       } = getKycStatus(kyc, isBuyer);

//       // if user KYC is not completed, take to KYC page
//       if (
//         hasNoRepValues ||
//         hasNotCompletedCompanyKyc ||
//         hasNotCompletedDocumentPhase
//       ) {
//         return redirect('/profile/kyc');
//       }
//     }
//   }
// }
