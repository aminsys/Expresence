<script setup>

import LoggedInUser from './LoggedInUserComponent.vue';
import {useDataStore} from '@/stores/DataStore.js';
import {ref, watch, onMounted} from 'vue';

const props = defineProps(['weekObj']);
const isMounted = ref(false);
const dataStore = useDataStore();
const loggedInUserData = ref(null);

function getLoggedInUserData(usersDataParam, loggedInUserName){
    for(let i = 0; i < usersDataParam.length; i++){
        if(usersDataParam[i].name === loggedInUserName){
            var data = JSON.parse(JSON.stringify(usersDataParam[i]));
            usersDataParam.splice(i, 1);
            return data;
        }
    }
    return null;
}

function compareDates(apiDate, calendarDate) {
    let d1 = new Date(apiDate);
    d1 = d1.toDateString().slice(0,10);
    return d1 === calendarDate;
}

watch(props, async() =>{
    dataStore.populateData();
});

onMounted(async () => {
    await dataStore.populateData();
    loggedInUserData.value = getLoggedInUserData(dataStore.data,"Han Kang");
    isMounted.value = true;
});

</script>

<template>
    <LoggedInUser v-if="isMounted && loggedInUserData" :loggedInUserData="loggedInUserData" />
    <tr v-for="person in dataStore.data">
        <td>
            {{ person.name }}
        </td>
        <td v-for="(weekDay, index) in weekObj" :key="index">
            <div v-if="person.days[index]"> <!-- Check if array is not out of bounds -->
                <span v-if="person.days[index].coming && compareDates(person.days[index].date, weekDay)" class="green-dot"></span>
                <span v-else class="red-dot"></span>
            </div>
            <span v-else class="red-dot"></span>
        </td>
    </tr>
</template>

<style>
.green-dot {
    height: 25px;
    width: 25px;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
    border-color: #78D965;
    box-shadow: 0px 0px 4px 1px #94E185;
}

.red-dot {
    height: 25px;
    width: 25px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
    border-color: #C42C3B;
    box-shadow: 0px 0px 4px 1px #C9404D;
}
</style>