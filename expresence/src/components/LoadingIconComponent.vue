<script setup>
import { ref } from 'vue';

const moreInfo = ref("Please be patient. This might take a minute.");
const showInfo = ref(false);
const seriousError = ref(false);
const seriousErrorInfo = ref("Something is seriously wrong here. Please contact support.");
setTimeout(() => {
    showInfo.value = true;
}, 10000);

setTimeout(() => {
    seriousError.value = true;
    showInfo.value = false;
    var loadingIcon = document.getElementById("loading");
    loadingIcon.classList.remove("lds-spinner");
}, 15000);
</script>
<template>
    <div id="loading" class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div v-if="showInfo">{{ moreInfo }}</div>

    <div v-if="seriousError" class='error-circle'></div>
    <div v-if="seriousError">{{ seriousErrorInfo }}</div>
</template>

<style>
/* Spinner loading icon */
.lds-spinner,
.lds-spinner div,
.lds-spinner div:after {
    box-sizing: border-box;
}

.lds-spinner {
    color: currentColor;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3.2px;
    left: 36.8px;
    width: 6.4px;
    height: 17.6px;
    border-radius: 20%;
    background: currentColor;
}

.lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
}

@keyframes lds-spinner {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

*{box-sizing: border-box}
:root{background: #ccc}
div.error-circle{
    background: red;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: relative;
    margin: 40px auto;
    box-shadow: 0 0 0 10px white, 0 0 24px 12px #B3B3B3, inset 0 0 16px 1px #B3B3B3;
    font-size: xx-large;
}

div.error-circle:before, div.error-circle:after{
    content: ''; 
    position:absolute;
    width: 20px;
    height: 100px;
    left: 64px;
    top: 25px;
    box-shadow: 0 0 16px 1px #B3B3B3;
    background: white
}
div.error-circle:before{
    transform: skew(28deg)
}
div.error-circle:after{
    transform: skew(-28deg);
}

</style>