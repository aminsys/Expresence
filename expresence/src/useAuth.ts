import { ref } from 'vue';
import { MSALObj, state } from './msalConfig';

export function useAuth() {
    const isAuthenticated = ref(false)
    const login = async () => {
        try {
            if(!MSALObj) {
                throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API.")
            }
            await MSALObj.loginRedirect()
            isAuthenticated.value = true

            const loginResponse = await MSALObj.loginRedirect()
            isAuthenticated.value = true
            console.log("Login success: " + loginResponse)
        } catch(error) {
            console.error("Login error: " + error)
        }
    }

    const logout = () => {
        if(!MSALObj) {
            throw new Error("MSAL not initialized. Call initializeMsal() before using MSAL API.")
        }
        MSALObj.logoutRedirect()
        isAuthenticated.value = false
        console.log("Logged out")
    }
    const handleRedirect = async () => {
        try {
            await MSALObj.handleRedirectPromise()
            state.isAuthenticated = MSALObj.getAllAccounts().length > 0
            state.user = MSALObj.getAllAccounts()[0]
        } catch(error) {
            console.log("Redirect error: ", error)
        }
    }

    return { isAuthenticated, login, logout, handleRedirect }
}
