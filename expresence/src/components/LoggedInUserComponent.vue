<script setup>
import { ref, watch, onMounted } from 'vue';
const props = defineProps(['loggedInUserData', 'weekObj']);

var controlledUserDates = ref(null);
const isMounted = ref(false);

function toggleStatus(index) {
    controlledUserDates.value[index].status === 2 ? 
    controlledUserDates.value[index].status = 1 : 
    controlledUserDates.value[index].status++;
    controlledUserDates.value[index].dateObject = props.weekObj[index];

    // Add code to update status on database.
}


async function checkMatchingDates(userDates, weekDates){
    const newArray = [];
    if(userDates.length !== weekDates.length){
        const newUserDates = convertDatesToText(userDates);
        for(let i = 0; i < weekDates.length; i++){
            if(!newUserDates.includes(weekDates[i])){
                newArray.push({ dateObject: null, status: 0 });
            }
            else {
                let index = newUserDates.findIndex((item) => item === weekDates[i]);
                newArray.push({ dateObject: weekDates[i], status: userDates[index].status });
            }
        }
        return newArray;
    }
    else {
        return userDates;
    }
}

function convertDatesToText(dates){
    const newDates = [];
    for(let i = 0; i < dates.length; i++){
        newDates.push(new Date(dates[i].dateObject).toString().slice(0, 10));
    }
    return newDates;
}

watch(props, async () => {
    controlledUserDates.value = await checkMatchingDates(props.loggedInUserData.days, props.weekObj);
});

onMounted(async () => {
    controlledUserDates.value = await checkMatchingDates(props.loggedInUserData.days, props.weekObj);
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
                v-if="controlledUserDates[index].dateObject === weekDay && controlledUserDates[index].status === 0"
                class="gray-dot-loggedInUser" @click="toggleStatus(index)"></span>
            <span
                v-else-if="controlledUserDates[index].dateObject === weekDay && controlledUserDates[index].status === 1"
                class="green-dot-loggedInUser" @click="toggleStatus(index)"></span>
            <span
                v-else-if="controlledUserDates[index].dateObject === weekDay && controlledUserDates[index].status === 2"
                class="red-dot-loggedInUser" @click="toggleStatus(index)"></span>
            <span
                v-else class="gray-dot-loggedInUser" @click="toggleStatus(index)"></span>       
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