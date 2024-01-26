<script setup>
var date = new Date();
date.setDate(date.getDate());
const person = {

    name: "Anders Fredriksson",
    days: [
        { date: date.toLocaleDateString(), coming: true },
        { date: date.toLocaleDateString(), coming: false },
        { date: date.toLocaleDateString(), coming: true },
        { date: date.toLocaleDateString(), coming: false },
        { date: date.toLocaleDateString(), coming: true }
    ]
}
</script>

<template>
    <td>
        {{ person.name }}
    </td>
    <td>
        <span v-if="person.days[0].coming" class="green-dot"></span>
        <span v-else class="red-dot"></span>
    </td>
    <td>
        <span v-if="person.days[1].coming" class="green-dot"></span>
        <span v-else class="red-dot"></span>
    </td>
    <td>
        <span v-if="person.days[2].coming" class="green-dot"></span>
        <span v-else class="red-dot"></span>
    </td>
    <td>
        <span v-if="person.days[3].coming" class="green-dot"></span>
        <span v-else class="red-dot"></span>
    </td>
    <td>
        <span v-if="person.days[4].coming" class="green-dot"></span>
        <span v-else class="red-dot"></span>
    </td>
</template>

<style>
.green-dot {
    height: 25px;
    width: 25px;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
}

.red-dot {
    height: 25px;
    width: 25px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
}

.person-name {
    width: 25px;
}
.person-date {
    display: inline-block;
    color: green;
}

</style>