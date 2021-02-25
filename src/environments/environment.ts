// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: "https://api.noworri.com/api/",
  payStackCheckoutUrl: `https://api.noworri.com/api/securewithpaystacktest`,
  payStackReleaseUrl: `https://api.noworri.com/api/initiatereleasetest/`,
  checkTransactionStatusUrl: `https://api.noworri.com/api/chektransactionstatustest`,
  addAccountUrl: `https://api.noworri.com/api/adduseraccounttest/`,
  createTransactionUrl: `https://api.noworri.com/api/newtransactiontest`,
  deleteAccountUrl: `https://api.noworri.com/api/deleteduseraccounttest`,
};
