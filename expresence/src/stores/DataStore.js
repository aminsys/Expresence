import {defineStore} from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore("DataStore", {
    // state
    state: () => {
        return {
            data: [],
        };
    },

    actions: {
        async populateData(){
            this.data = (await axios.get("/src/static-api.com.json")).data;
        },
    }

    // getters
});