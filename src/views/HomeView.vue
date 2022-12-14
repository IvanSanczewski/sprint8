<template>
  <div class="films">
    <img src="@/assets/films-horizontal/sw_1_h.webp" alt="The Phantom Menace">
    <img src="@/assets/films-horizontal/sw_2_h.webp" alt="Attack of the Clones">
    <img src="@/assets/films-horizontal/sw_3_h.jpeg" alt="Revenge of the Sith">
  </div>
</template>

<script>

export default {
  name: 'HomeView',
}
</script>

<style>
.films {
  margin: 0 auto;
  
  width: 50%;

  display: flex;
  flex-flow: column nowrap;
  row-gap: 1.5em;
}
</style>