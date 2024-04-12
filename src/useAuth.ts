import { ref } from 'vue';
import { MSALObj, graphScopes, state } from './msalConfig';

export function useAuth() {
    const isAuthenticated = ref(false)
    
    const login = async () => {
        try {
            if(!MSALObj) {
                throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API.")
            }

            const loginResponse = await MSALObj.loginRedirect(graphScopes)
            isAuthenticated.value = true
            console.log("Login success: " + loginResponse)
        } catch(error) {
            console.error("Login error: " + error)
            isAuthenticated.value = false
        }
    }

    const logout = async () => {
        if(!MSALObj) {
            throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API.")
        }
        await MSALObj.logoutRedirect()
        isAuthenticated.value = false
        console.log("Logged out")
    }
    
    const handleRedirect = async () => {
        try {
            await MSALObj.handleRedirectPromise()
            isAuthenticated.value = MSALObj.getAllAccounts().length > 0
            state.user = MSALObj.getAllAccounts()[0]
        } catch(error) {
            console.log("Redirect error: ", error)
            isAuthenticated.value = false
        }
    }

    return { isAuthenticated, login, logout, handleRedirect }
}
