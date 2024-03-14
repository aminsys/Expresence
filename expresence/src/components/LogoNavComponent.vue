<script setup>
import { ref } from 'vue';
import Calendar from '../components/CalendarComponent.vue';
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
const name = sessionStorage.getItem("fullname"); // api call in the future?!
const isLoggedIn = userStore.userData.isLoggedIn;

function logOut(){
  userStore.userData.isLoggedIn = false;
  userStore.userData.fullname = "";
  sessionStorage.clear();
}

Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var weekNumber = (new Date()).getWeek();

</script>

<template>
  <div id="nav">
    <router-link to="/home">Home</router-link> | 
    <router-link to="/about">About</router-link> |
    <router-link v-if="!isLoggedIn" to="/">Log In</router-link>
    <router-link v-if="isLoggedIn" to="/" custom v-slot="{ navigate }">
      <a class="logOut" @click="logOut(); navigate();">Log out</a>
    </router-link>
  </div>

  <div class="LogoArea">
    <img alt="Expresence logo" class="logo" src="@/assets/icons8-calendar-48.png" width="62" height="62" />
    <div>
      <h3 class="week">Week: {{ weekNumber }}</h3>
      <p>{{ name }}</p>
    </div>

  </div>
  <Calendar :userName="name" />
</template>

<style scoped>
h3 {
  font-size: 2rem;
}

.LogoArea {
  display: flex;
  justify-content: space-between;
  border: 1px RGBA(255, 255, 255, 0.2) dashed;
  border-radius: 2rem;
  padding: 12px;
}


@media (min-width: 1024px) {
}

#nav {
    padding: 10px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .logOut:hover {
    cursor: pointer;
  }
</style>
