<script setup>

var date = new Date();
date.setDate(date.getDate());

const personData = [

    {
        name: "Leif Beckman",
        days: [
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: true }
        ]
    },
    {
        name: "Thomas Clancy",
        days: [
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: true }
        ]
    },
    {
        name: "Naguib Mahfouz",
        days: [
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: false }
        ]
    },
    {
        name: "Haruki Murakami",
        days: [
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: true },
            { date: date.toLocaleDateString(), coming: false },
            { date: date.toLocaleDateString(), coming: false }
        ]
    }
];
</script>

<template>
    <tr v-for="person in personData">
        <td>
            {{ person.name }}
        </td>
        <td v-for="(days, index) in person.days" :key="index">
            <span v-if="days.coming" class="green-dot"></span>
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