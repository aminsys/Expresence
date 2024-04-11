import { LogLevel, PublicClientApplication, type AccountInfo, type RedirectRequest } from '@azure/msal-browser';
import { reactive } from 'vue';

export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        authority: import.meta.env.VITE_AUTHORITY,
        redirectUri: import.meta.env.VITE_REDIRECT_URI,
        postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
}

export const graphScopes: RedirectRequest = {
    scopes: ["User.Read"]
};

export const state = reactive({
    user: null as AccountInfo | null
});
export const MSALObj = new PublicClientApplication(msalConfig);