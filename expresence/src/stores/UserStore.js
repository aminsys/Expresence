import {defineStore} from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore("UserStore", {
    // state
    state: () => {
        return {
            userData: { 
                fullname: "",
                password: "",
                isLoggedIn: true 
            },
        };
    },

    actions: {
            setFullName(fullname){
                userData.fullname = fullname;
            }
    }

    // getters
});