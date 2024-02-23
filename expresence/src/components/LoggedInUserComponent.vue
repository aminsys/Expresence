<script setup>
const props = defineProps(['loggedInUserData', 'weekObj']);


function compareDates(apiDate, calendarDate) {
    if (apiDate === null) {
        return false;
    }
    let d1 = new Date(apiDate);
    d1 = d1.toDateString().slice(0, 10);
    return d1 === calendarDate;
}

const toggleStatus = (loggedInUserData, index) => {
    loggedInUserData.days[index].status === 2 ? 
    loggedInUserData.days[index].status = 1 : 
    loggedInUserData.days[index].status++;
}

</script>

<template>
    <tr>
        <td class="logged-in-username">
            {{ loggedInUserData.name }}
        </td>
        <td v-for="(weekDay, index) in weekObj" :key="index">
            <span
                v-if="loggedInUserData.days[index].status === 0 && compareDates(loggedInUserData.days[index].dateObject, weekDay)"
                    class="gray-dot-loggedInUser" @click="toggleStatus(loggedInUserData, index)"></span>
            <span
                v-else-if="loggedInUserData.days[index].status === 1 && compareDates(loggedInUserData.days[index].dateObject, weekDay)"
                class="green-dot-loggedInUser" @click="toggleStatus(loggedInUserData, index)"></span>
            <span
                v-else-if="loggedInUserData.days[index].status === 2 && compareDates(loggedInUserData.days[index].dateObject, weekDay)"
                class="red-dot-loggedInUser" @click="toggleStatus(loggedInUserData, index)"></span>
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