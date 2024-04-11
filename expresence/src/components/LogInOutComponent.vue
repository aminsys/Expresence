<script setup lang="ts">

import { useAuth } from "@/useAuth";
import { MSALObj, state } from "@/msalConfig";
import { onMounted } from "vue";
import { HttpStatusCode } from "axios";

const { login, handleRedirect } = useAuth();

async function handleLogin() {
    await login();
}

const initialize = async () => {
    try {
        await MSALObj.initialize();
    } catch (error) {
        console.log("Initialization error", error);
    }
}

onMounted(async () => {
    await initialize();
    await handleRedirect();
});

</script>

<template>
    <div class="vue-tempalte">
        <form>
            <router-link to="/home" custom v-slot="{ navigate }">
                <button type="button" @click="navigate(); handleLogin()" role="link">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50"
                        viewBox="0 0 48 48">
                        <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path>
                        <path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path>
                        <path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path>
                        <path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
                    </svg>
                    <span class="text">Sign In with Microsoft ID</span>
                </button>
            </router-link>
        </form>
    </div>
</template>

<style scoped>
label,
input {
    font-size: 25px;
    margin: 10px;
}

button {
    font-size: 50px;
    margin: 10px;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}
</style>