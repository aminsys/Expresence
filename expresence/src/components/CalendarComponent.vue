<script setup>
import { ref } from 'vue';
import personDate from './PersonDateComponent.vue';

const props = defineProps(['userName']);

let weekCounter = 0;

const weekDates = ref(getCurrentWeekDates(weekCounter));

function clickSevenDaysAhead() {
  weekCounter += 7;
  weekDates.value = getCurrentWeekDates(weekCounter);
}

function clickSevenDaysBehind() {
  weekCounter -= 7;
  weekDates.value = getCurrentWeekDates(weekCounter);
}


function getCurrentWeekDates(days) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the start date of the current week (Sunday)
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDay + 1 + parseInt(days));

  // Calculate the end date of the current week (Saturday)
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + (5 - currentDay + parseInt(days)));

  // Create an array to store the dates of the current week
  const weekDates = [];
  let currentDatePointer = new Date(startDate);

  // Iterate from the start date to the end date and add each date to the array
  while (currentDatePointer <= endDate) {
    let d = new Date(currentDatePointer);
    weekDates.push(d.toDateString().slice(0,15));
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
  }

  return weekDates;
}

</script>

<template>
  <div class="calendar">
    <div class="calendar-btn">
      <button class="btn" @click="clickSevenDaysBehind"> &lt; </button>
      <button class="btn" @click="clickSevenDaysAhead"> &gt; </button>
    </div>

    <table>
      <tr>
        <th>Name</th>
        <th>{{ weekDates[0].slice(0,10) }}</th>
        <th>{{ weekDates[1].slice(0,10) }}</th>
        <th>{{ weekDates[2].slice(0,10) }}</th>
        <th>{{ weekDates[3].slice(0,10) }}</th>
        <th>{{ weekDates[4].slice(0,10) }}</th>
      </tr>
      <personDate :weekObj="weekDates" :userName="userName"></personDate>
    </table>
  </div>
</template>


<style>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

td,
th {
  padding: 5px;
  text-align: center;
}

tr:nth-child(even) {
  background-color: #625a5a;
  color: black;
}

.calendar-btn {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  height: 50px;
  width: 50px;
  background-color: lightskyblue;
  border-radius: 50%;
  font-weight: bold;
  border-color: rgb(194, 222, 240);
  box-shadow: 0px 0px 4px 1px #41c6d2;
}
</style>
