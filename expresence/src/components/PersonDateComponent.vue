<script setup>

import { ref, watch, onMounted } from 'vue';

const props = defineProps(['weekObj', 'dataStore']);
const isMounted = ref(false);

function compareDates(apiDate, calendarDate) {
    if (apiDate === null) {
        return false;
    }
    let d1 = new Date(calendarDate).toLocaleString().slice(0, 10);
    return apiDate === d1;
}


function fillInMissingDates(usersData, weekDates) {
    if (usersData.length !== weekDates.length) {
        for (let p = 0; p < usersData.length; p++) { // Per person
            for (let i = 0; i < weekDates.length; i++) { // Per day
                let date = new Date(weekDates[i]).toLocaleString().slice(0, 10);
                if (!usersData[p].days.some(item => item.dateObject === date)) {
                    usersData[p].days.splice(i, 0, { dateObject: date, status: 0 });
                }
            }
        }
    }
}


watch(props, async () => {
    fillInMissingDates(props.dataStore.data, props.weekObj);
});

onMounted(async () => {
    fillInMissingDates(props.dataStore.data, props.weekObj);
    isMounted.value = true;
});

</script>

<template>
    <tr v-if="isMounted" v-for="person in props.dataStore.data">
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
            <span v-else class="gray-dot">?</span>
        </td>
    </tr>
</template>

<style scoped>
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