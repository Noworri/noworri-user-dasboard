// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  payStackCheckoutUrl: `https://api.noworri.com/api/securewithpaystacktest`,
  payStackReleaseUrl: `https://api.noworri.com/api/initiatereleasetest/`,
  processPayoutUrl: `https://api.noworri.com/api/processbusinesspayouttest`,
  checkTransactionStatusUrl: `https://api.noworri.com/api/chektransactionstatustest`,
  addAccountUrl: `https://api.noworri.com/api/createrecipienttest/`,
  updateAccountUrl: `https://api.noworri.com/api/updateuseraccounttest/`,
  createTransactionUrl: `https://api.noworri.com/api/newtransactiontest`,
  deleteAccountUrl: `https://api.noworri.com/api/deleteduseraccounttest`,
  getTransactionByIdUrl: `https://api.noworri.com/api/getusertransactiontest/`,
  getTransactionsListUrl: `https://api.noworri.com/api/usertransactionstest/`,
  verifyReleaseCodeUrl: `https://api.noworri.com/api/verifycodetest`,
  cancelTransactionUrl: `https://api.noworri.com/api/cancelescrowtransactiontest/`,
  getBusinessUserPayoutsUrl: `https://api.noworri.com/api/getbusinessuserpayoutstest/`,
  getBusinessTransactionsSummaryUrl: `https://api.noworri.com/api/getusertransactionssummarytest/`,
  updateDeliveyUrl: `https://api.noworri.com/api/updatedeliveryphonetest`,
  getUserAccountDetailsUrl: `https://api.noworri.com/api/getbusinessuseraccountdetailstest/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
