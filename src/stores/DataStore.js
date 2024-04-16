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
           
                this.data = (await axios.get("https://expresence-api-220240404101112.azurewebsites.net/persons-with-days?fromDate="+fromDate+"&toDate="+toDate, header)).data;         
            },
        async addNewUser(user, header){
            await axios.post("https://expresence-api-220240404101112.azurewebsites.net/persons", user, header);
        },

        async getAllPersons(header){
            this.persons = (await axios.get("https://expresence-api-220240404101112.azurewebsites.net/persons", header)).data;
        },

        async updateDay(day, header){
            return (await axios.put("https://expresence-api-220240404101112.azurewebsites.net/days", day, header)).data;
        }
    }

    // getters
});