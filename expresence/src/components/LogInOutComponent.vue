<script setup lang="ts">

import { useAuth } from "@/useAuth";
import { MSALObj, state } from "@/msalConfig";
import { onMounted } from "vue";

const { login, handleRedirect } = useAuth();

/*function isSignInBtnActive(){
    if(userStore.userData.fullname.length < 3){
        return true;
    }
    return false;
}*/

async function handleLogin(){
    await login();
}

const initialize = async () => {
    try {
        await MSALObj.initialize();
    } catch(error) {
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
            <!--div>
                <label>Full Name</label>
                <router-link to="/home" custom v-slot="{ navigate }">
                    <input v-model.trim="userStore.userData.fullname" placeholder="Enter your full name" @keydown.enter.prevent = "handleLogin()" />
                </router-link>
            </div-->
            <router-link to="/home" custom v-slot="{ navigate }">
                <button type="button" @click="navigate(); handleLogin()" role="link">Sign In with Microsoft ID</button>
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