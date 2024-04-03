<script setup>
import personDate from './PersonDateComponent.vue';
import loadingIcon from './LoadingIconComponent.vue';
import { ref, watch, onMounted } from 'vue';
import { useDataStore } from '@/stores/DataStore.js';
import { state } from '@/msalConfig';


const props = defineProps(['weekObj']);

const dataStore = useDataStore();
var controlledUserDates = ref(null);
const isMounted = ref(false);
var loggedInUserData = null;

// var credentials = btoa('JD Salinger' + ':' + 'admin@gmail.com');

var credentials = btoa(state.user.name + ':' + state.user.username);

var header = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
    }
};

function compareDates(apiDate, calendarDate) {
    let d1 = new Date(calendarDate).toLocaleString().slice(0, 10);
    return d1 === apiDate;
}

function toggleStatus(index) {
    controlledUserDates.value[index].status === 2 ?
        controlledUserDates.value[index].status = 1 :
        controlledUserDates.value[index].status++;
    controlledUserDates.value[index].dateObject = new Date(props.weekObj[index]).toLocaleString().slice(0, 10);
    // Update sessionStorage's values
    sessionStorage.setItem(props.weekObj[0], JSON.stringify(controlledUserDates.value));

    // Add code to update status on database.
}

function addNewDates(weekDates) {
    var newArray = [];
    for (let i = 0; i < weekDates.length; i++) {
        let date = new Date(weekDates[i]).toLocaleString().slice(0, 10);
        newArray.push({ dateObject: date, status: 0 });
    }
    return newArray;
}


function fillInMissingDates(userDates, weekDates) {
    var newArray = [];
    // If user's array is emtpy:
    if(userDates.length === 0){
        newArray = addNewDates(weekDates);
    }
    // If calendar is not on the same week as the user's data:
    else if (userDates[0].dateObject !== new Date(weekDates[0]).toLocaleString().slice(0, 10)
        && userDates.length === weekDates.length) {
        newArray = addNewDates(weekDates);
        return newArray;
    }
    // If the user ONLY has some days defined in a week:
    if (userDates.length !== weekDates.length) {

        for (let i = 0; i < weekDates.length; i++) {
            let date = new Date(weekDates[i]).toLocaleString().slice(0, 10);
            if (!userDates.some(d => d.dateObject === date)) {
                newArray.push({ dateObject: date, status: 0 });
            }
            else {
                let index = userDates.findIndex((item) => item.dateObject === date);
                newArray.push({ dateObject: date, status: userDates[index].status });
            }
        }
        return newArray;
    }
    else {
        return userDates;
    }
}

function getLoggedInUserData(dataStoreParam, loggedInUserName) {
    var data = null;
    for (let i = 0; i < dataStoreParam.length; i++) {
        if (dataStoreParam[i].name === loggedInUserName) {
            data = JSON.parse(JSON.stringify(dataStoreParam[i]));
            dataStoreParam.splice(i, 1);
            return data;
        }
    }

    if (data === null) {
        return {
            name: loggedInUserName,
            days: [
                { dateObject: props.weekObj[0], status: 0 },
                { dateObject: props.weekObj[1], status: 0 },
                { dateObject: props.weekObj[2], status: 0 },
                { dateObject: props.weekObj[3], status: 0 },
                { dateObject: props.weekObj[4], status: 0 }
            ]
        }
    }
}

async function checkIfUserExists() {
    try {
        await dataStore.getAllPersons(header);
        if (!dataStore.persons.includes(state.user.username)) {
            console.log("User doesn't exist");
            await dataStore.addNewUser({
                "name": state.user.name,
                "emailAddress": state.user.username
            });
        }
        else {
            console.log("User ALREADY exists in database: " + state.user.username);
        }
    }
    catch (error) {
        console.log("Error while check if user exist: " + error);
    }
}


watch(props, async () => {
    var fromDate = new Date(props.weekObj[0]).toLocaleDateString();
    var toDate = new Date(props.weekObj[4]).toLocaleDateString();
    await dataStore.populateData(fromDate, toDate, header);
    loggedInUserData = getLoggedInUserData(dataStore.data, state.user.name);
    controlledUserDates.value = JSON.parse(sessionStorage.getItem(props.weekObj[0]));
    if (controlledUserDates.value === null) {
        controlledUserDates.value = fillInMissingDates(loggedInUserData.days, props.weekObj);
        let date = new Date(controlledUserDates.value[0].dateObject).toDateString().slice(0, 15);
        sessionStorage.setItem(date, JSON.stringify(controlledUserDates.value));
    }
});

onMounted(async () => {
    var fromDate = new Date(props.weekObj[0]).toLocaleDateString();
    var toDate = new Date(props.weekObj[4]).toLocaleDateString();
    await checkIfUserExists();
    await dataStore.populateData(fromDate, toDate, header);
    loggedInUserData = getLoggedInUserData(dataStore.data, state.user.name);
    controlledUserDates.value = JSON.parse(sessionStorage.getItem(props.weekObj[0]));
    if (controlledUserDates.value === null) {
        controlledUserDates.value = fillInMissingDates(loggedInUserData.days, props.weekObj);
        let date = new Date(controlledUserDates.value[0].dateObject).toDateString().slice(0, 15);
        sessionStorage.setItem(date, JSON.stringify(controlledUserDates.value));
    }
    isMounted.value = true;
});

</script>

<template>
    <div class="loading">
        <loadingIcon v-if="!isMounted"></loadingIcon>
    </div>
    <tr v-if="isMounted">
        <td class="logged-in-username">
            {{ state.user.name }}
        </td>
        <td v-for="(weekDay, index) in weekObj" :key="index">
            <span
                v-if="compareDates(controlledUserDates[index].dateObject, weekDay) && controlledUserDates[index].status === 0"
                class="gray-dot-loggedInUser" @click="toggleStatus(index)"></span>
            <span
                v-else-if="compareDates(controlledUserDates[index].dateObject, weekDay) && controlledUserDates[index].status === 1"
                class="green-dot-loggedInUser" @click="toggleStatus(index)"></span>
            <span
                v-else-if="compareDates(controlledUserDates[index].dateObject, weekDay) && controlledUserDates[index].status === 2"
                class="red-dot-loggedInUser" @click="toggleStatus(index)"></span>
            <span v-else class="gray-dot-loggedInUser" @click="toggleStatus(index)">??</span>
        </td>
    </tr>
    <personDate v-if="isMounted" :weekObj="weekObj" :dataStore="dataStore"></personDate>
</template>

<style>
.logged-in-username {
    font-size: 140%;
    font-weight: bold;
    color: white;
}

.green-dot-loggedInUser {
    height: 40px;
    width: 40px;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
    border-color: #78D965;
    box-shadow: 0px 0px 4px 1px #94E185;
}

.red-dot-loggedInUser {
    height: 40px;
    width: 40px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
    border-color: #C42C3B;
    box-shadow: 0px 0px 4px 1px #C9404D;
}

.gray-dot-loggedInUser {
    height: 40px;
    width: 40px;
    background-color: gray;
    border-radius: 50%;
    display: inline-block;
    border-color: #d6d1d2;
    box-shadow: 0px 0px 4px 1px #f4f2f2;
}

[class$="-dot-loggedInUser"]:hover {
    cursor: pointer;
}

.loading {
    position: fixed;
    left: 40%;
    top: 50%;
    text-align: center;
}
</style>