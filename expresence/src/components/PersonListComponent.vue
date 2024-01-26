<script setup>
import {ref} from 'vue';
import PersonDate from './PersonDateComponent.vue';

const personNames = // ref([{name: "Anders And"}, {name: "Kalle Anka"}, { name: "Donald Duck"}]);
ref([
    "Anders And",
    "Kalle Anka",
    "Donald Duck"
])
</script>

<template>
    <table class="label">
        <PersonDate />
    </table>
</template>

<style>
.label {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: aliceblue;
}
</style>