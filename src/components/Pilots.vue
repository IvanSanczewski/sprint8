<template>
    <h3 class="pilots-title">PILOTS: </h3>
    <div>
        <ul>
            <li v-for="item, index in $store.state.starshipPilots" :key="index" class="starship-pilot-name">
                <p>{{ item }}</p>
            </li>
        </ul>
  </div>
</template>

<script>
import store from '../store/index'

export default {
    name: 'Pilots',
}
</script>

<style scoped>
h3 {
    margin: 1em;

    color: #fefefe;
    
    font-size: 1.2em;
    font-weight: 700;
    
    text-align: start;
    text-transform: uppercase;
}

p {
    color: #fefefe;
}

</style>