import {defineStore} from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore("DataStore", {
    // state
    state: () => {
        return {
            data: [],
            // persons: []
        };
    },

    actions: {
        async populateData(fromDate, toDate){
            this.data = (await axios.get("https://mocki.io/v1/3e0d9cab-22d0-4439-9b03-feeee8c52f06")).data;
            },
    }

    // getters
});