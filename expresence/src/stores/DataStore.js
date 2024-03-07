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
            // this.data = (await axios.get("http://localhost:5224/api/v1/days?fromDate=" + fromDate + "&toDate=" + toDate)).data;
            // this.persons = (await axios.get("http://localhost:5224/api/v1/persons")).data;
            // Olga
            // this.data = (await axios.get("https://mocki.io/v1/c8414017-e6d8-431a-b696-b2117ca5c013")).data;
        },
    }

    // getters
});