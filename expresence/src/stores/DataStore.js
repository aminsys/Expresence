import {defineStore} from 'pinia';
import axios from 'axios';
import { state } from '@/msalConfig';

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
           
                this.data = (await axios.get("http://localhost:5224/api/v1/persons-with-days?fromDate="+fromDate+"&toDate="+toDate, 
                header)).data;
                // this.data = (await axios.get("https://mocki.io/v1/cdd3be2d-6c28-4244-be77-e5a38c299844")).data 

                // console.log(this.data);          
            },
        async addNewUser(user, header){
            (await axios.post("http://localhost:5224/api/v1/persons", user, header));
        },

        async getAllPersons(header){
            this.persons = (await axios.get("http://localhost:5224/api/v1/persons", header)).data;
            // this.persons = (await axios.get("https://mocki.io/v1/f5fb3afd-3ab1-41cc-afd2-304d44902637", header)).data;
            // console.log(this.persons);
        }
    }

    // getters
});