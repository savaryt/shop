// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyD_vKgRklasYxYmczXa6dXL9-osnDuM_cg',
    authDomain: 'shop-swiss.firebaseapp.com',
    databaseURL: 'https://shop-swiss.firebaseio.com',
    projectId: 'shop-swiss',
    storageBucket: 'shop-swiss.appspot.com',
    messagingSenderId: '174248387639'
  },
  functions: {
    root: 'http://localhost:5000/shop-swiss/us-central1/'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
