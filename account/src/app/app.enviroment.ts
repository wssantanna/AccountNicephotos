import { environment } from 'src/environments/environment';

export class API {
    public static readonly BASE_URL = environment.BASE_URL_API;
    public static readonly AUTH_URL = `${environment.BASE_URL_API}/Login`;
    public static readonly REGISTER_URL = `${environment.BASE_URL_API}/Usuario`;
    public static readonly FORGOT_PASSWORD_URL = `${environment.BASE_URL_API}/Login/EsqueciMinhaSenha`;
    public static readonly PROFILE_URL = `${environment.BASE_URL_API}/`;
    public static readonly LOCAL_STORAGE_KEY = environment.LOCAL_STORAGE_KEY;
}

export class AppLegacy {
    public static readonly BASE_URL_REDIRECT_DESKTOP = environment.BASE_URL_REDIRECT_DESKTOP;
    public static readonly BASE_URL_REDIRECT_MOBILE = environment.BASE_URL_REDIRECT_MOBILE;
}

export class Google {
    public static readonly RECAPTCHA_KEY = environment.GOOGLE_RECAPTCHA_KEY;
    public static readonly TRACKING_CODE = environment.GOOGLE_TRACKING_CODE;
}

export class Hotjar {
    public static readonly TRACKING_CODE = environment.HOTJAR_TRACKING_CODE;
}

export class Firebase {
    public static readonly CONFIG = environment.FIREBASE_CONFIG;
}