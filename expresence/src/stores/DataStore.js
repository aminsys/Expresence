import {defineStore} from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore("DataStore", {
    // state
    state: () => {
        return {
            data: [],
            persons: []
        };
    },

    actions: {
        async populateData(fromDate, toDate, header){
           
                this.data = (await axios.get("https://expresence-api-2-api-service.azure-api.net/days?fromDate="+fromDate+"&toDate="+toDate, header)).data;         
            },
        async addNewUser(user, header){
            (await axios.post("https://expresence-api-2-api-service.azure-api.net/persons", user, header));
        },

        async getAllPersons(header){
            this.persons = (await axios.get("https://expresence-api-2-api-service.azure-api.net/persons", header)).data;
        }
    }

    // getters
});