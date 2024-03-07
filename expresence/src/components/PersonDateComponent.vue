<script setup>

import LoggedInUser from './LoggedInUserComponent.vue';
import { useDataStore } from '@/stores/DataStore.js';
import { ref, watch, onMounted } from 'vue';

const props = defineProps(['weekObj', 'userName']);
const isMounted = ref(false);
const dataStore = useDataStore();
const loggedInUserData = ref(null);

function getLoggedInUserData(usersDataParam, loggedInUserName) {
    for (let i = 0; i < usersDataParam.length; i++) {
        if (usersDataParam[i].name === loggedInUserName) {
            var data = JSON.parse(JSON.stringify(usersDataParam[i]));
            usersDataParam.splice(i, 1);
            return data;
        }
    }
    return null;
}

function compareDates(apiDate, calendarDate) {
    let d1 = new Date(apiDate);
    d1 = d1.toDateString().slice(0, 10);
    return d1 === calendarDate;
}

watch(props, async () => {
    await dataStore.populateData(props.weekObj[0], props.weekObj[4]);
    loggedInUserData.value = getLoggedInUserData(dataStore.data, props.userName);
});

onMounted(async () => {
    await dataStore.populateData(props.weekObj[0], props.weekObj[4]);
    loggedInUserData.value = getLoggedInUserData(dataStore.data, props.userName);
    isMounted.value = true;
});

</script>

<template>
    <LoggedInUser v-if="isMounted && loggedInUserData !== null" :loggedInUserData="loggedInUserData" :weekObj="weekObj" />
    <tr v-for="person in dataStore.data">
        <td>
            {{ person.name }}
        </td>
        <td v-for="(weekDay, index) in weekObj" :key="index">
            <span v-if="person.days[index].status === 0 && compareDates(person.days[index].dateObject, weekDay)"
                class="gray-dot"></span>
            <span v-else-if="person.days[index].status === 1 && compareDates(person.days[index].dateObject, weekDay)"
                class="green-dot"></span>
            <span v-else-if="person.days[index].status === 2 && compareDates(person.days[index].dateObject, weekDay)"
                class="red-dot"></span>
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
    border-color: #7ad668;
    box-shadow: 0px 0px 4px 1px #94E185;
}

.red-dot {
    height: 25px;
    width: 25px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
    border-color: #ed0c22;
    box-shadow: 0px 0px 4px 1px #706e6e;
}

.gray-dot {
    height: 25px;
    width: 25px;
    background-color: gray;
    border-radius: 50%;
    display: inline-block;
    border-color: #d6d1d2;
    box-shadow: 0px 0px 4px 1px #f4f2f2;
}
</style>