<script setup>
import { ref, watch, onMounted } from 'vue';
const props = defineProps(['loggedInUserData', 'weekObj']);

var controlledUserDates = ref(null);
const isMounted = ref(false);

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

function addNewDates(weekDates){
    var newArray = [];
    for(let i = 0; i < weekDates.length; i++){
        let date = new Date(weekDates[i]).toLocaleString().slice(0, 10);
        newArray.push({ dateObject: date, status: 0 });
    }
    return newArray;
}


function fillInMissingDates(userDates, weekDates){
    var newArray = [];
    // If calendar is not on the same week as the user's data:
    if(userDates[0].dateObject !== new Date(weekDates[0]).toLocaleString().slice(0, 10)
    && userDates.length === weekDates.length){
        newArray = addNewDates(weekDates);
        return newArray;
    }
    if(userDates.length !== weekDates.length){
        
        for(let i = 0; i < weekDates.length; i++){
            let date = new Date(weekDates[i]).toLocaleString().slice(0, 10);
            if(!userDates.some(d => d.dateObject === date)){
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

watch(props, async () => {
    controlledUserDates.value = JSON.parse(sessionStorage.getItem(props.weekObj[0]));
    if(controlledUserDates.value === null){
        controlledUserDates.value = fillInMissingDates(props.loggedInUserData.days, props.weekObj);
        let date = new Date(controlledUserDates.value[0].dateObject).toDateString().slice(0, 15);
        sessionStorage.setItem(date, JSON.stringify(controlledUserDates.value));
    }
});

onMounted(async () => {
    controlledUserDates.value = JSON.parse(sessionStorage.getItem(props.weekObj[0]));
    if(controlledUserDates.value === null){
        controlledUserDates.value = fillInMissingDates(props.loggedInUserData.days, props.weekObj);
        let date = new Date(controlledUserDates.value[0].dateObject).toDateString().slice(0, 15);
        sessionStorage.setItem(date, JSON.stringify(controlledUserDates.value));
    }
    isMounted.value = true;
});

</script>

<template>
    <tr v-if="isMounted">
        <td class="logged-in-username">
            {{ loggedInUserData.name }}
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
            <span
                v-else class="gray-dot-loggedInUser" @click="toggleStatus(index)">??</span>
        </td>        
    </tr>
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

</style>