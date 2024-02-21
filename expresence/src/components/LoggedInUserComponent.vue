<script setup>
const props = defineProps(['loggedInUserData', 'userWeekObj']);


function compareDates(apiDate, calendarDate) {
    let d1 = new Date(apiDate);
    d1 = d1.toDateString().slice(0,10);
    return d1 === calendarDate;
}

</script>

<template>
    <tr>
        <td class="logged-in-username">
            {{ loggedInUserData.name }}
        </td>
        <td v-for="(weekDay, index) in loggedInUserData.days" :key="index">
            <div v-if="weekDay">
                <span v-if="weekDay.coming && compareDates(weekDay.date, userWeekObj[index])" class="green-dot-loggedInUser"></span>
                <span v-else class="red-dot-loggedInUser"></span>
            </div>
            <span v-else class="red-dot-loggedInUser"></span>
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
</style>