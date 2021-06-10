// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    BASE_URL_REDIRECT_MOBILE: 'https://m.nicephotos.com.br',
    BASE_URL_REDIRECT_DESKTOP: 'https://www.nicephotos.com.br',
    BASE_URL_API: 'https://api.prd.nicephotos.com.br/account/v1',
    LOCAL_STORAGE_KEY: 'Nicephotos_User_Data',
    GOOGLE_RECAPTCHA_KEY: '6Lf2piEUAAAAAB0-RmMJFUMNW838gdE9bRMwIKFK',
    GOOGLE_TRACKING_CODE: 'G-5K53TF46P0',
    HOTJAR_TRACKING_CODE: '2190653',
    FIREBASE_CONFIG: {
        apiKey: "AIzaSyBMAklkCWf4lWWW53I2ZZI5hNcIQ6Hx8Z8",
        authDomain: "nicephotos-stg.firebaseapp.com",
        projectId: "nicephotos-stg",
        storageBucket: "nicephotos-stg.appspot.com",
        messagingSenderId: "257506656023",
        appId: "1:257506656023:web:ba1a2ba472e086b6108152"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
