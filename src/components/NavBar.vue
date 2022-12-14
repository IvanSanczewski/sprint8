<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <router-link to="/starships" @click="toggleBtnsType('starships')">Starships</router-link>
    <router-link to="/pilots" @click="toggleBtnsType('pilots')">Pilots</router-link>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['togglePageButtons']),
    toggleBtnsType(pageType) {
      console.log(pageType);
      this.$store.commit('togglePageButtons', pageType)
    }
  }
}
</script>

<style>

</style>