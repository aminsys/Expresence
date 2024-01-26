<script setup>

Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var weekNumber = (new Date()).getWeek();

defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="LogoArea">
    <img alt="Expresence logo" class="logo" src="@/assets/icons8-calendar-48.png" width="62" height="62" />
    <div>
      <h3 class="week">Week: {{ weekNumber }}</h3>
      <p>{{ name }}</p>
    </div>

  </div>
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


@media (min-width: 1024px) {}
</style>
