import {defineStore} from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore("DataStore", {
    // state
    state: () => {
        return {
            data: []
        };
    },

    actions: {
        async populateData(fromDate, toDate){
                this.data = (await axios.get("http://localhost:5224/api/v1/persons-with-days?fromDate="+fromDate+"&toDate="+toDate)).data;            
            },
    }

    // getters
});