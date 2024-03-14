<script setup>

import { ref } from "vue";
import { useUserStore } from "@/stores/UserStore.js";

const userStore = useUserStore();

function isSignInBtnActive(){
    if(userStore.userData.fullname.length < 3){
        return true;
    }
    return false;
}

function logIn(){
    sessionStorage.setItem("fullname", userStore.userData.fullname);
    userStore.userData.isLoggedIn = true;
}

</script>

<template>
    <div class="vue-tempalte">
        <form>
            <div>
                <label>Full Name</label>
                <router-link to="/home" custom v-slot="{ navigate }">
                    <input v-model.trim="userStore.userData.fullname" placeholder="Enter your full name" @keydown.enter.prevent = "navigate(); logIn()" />
                </router-link>
            </div>
            <router-link to="/home" custom v-slot="{ navigate }">
                <button :disabled="isSignInBtnActive()" type="button" @click="navigate(); logIn()" role="link">Sign In</button>
            </router-link>
        </form>
    </div>
</template>

<style scoped>
label, input {
  font-size: 25px;
  margin: 10px;
}

button {
    font-size: 25px;
    margin: 10px;
    padding: 5px;
}
</style>