<template>
    <div class="char-card">
        <div :style="{backgroundImage: 'url(' + this.$store.state.pilotsImages[id] +')' }" class="char-img"></div>
         <div class="char-details">
            <h2>{{ this.$store.state.pilotsList[id].name }}</h2>
            <p>Birth: {{ this.$store.state.pilotsList[id].birth_year }}</p>
            <p>Homeworld: {{ $store.state.pilotHomeworld }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '@/store/index'

export default {
    // USE GETTERS IF POSSIBLE
    name: 'PilotDetailsView',
    props: ['id'],
    methods: {
        ...mapActions(['getPilotImage', 'getPilotHomeworld'])
    },
    created() {
        //fetch all pilots data here 
        //this.getPilotImage() IF THEY'RE ALREADY LOADED TO BE DISPLAYED IN PILOTSLISTCIEW, NO NEED TO FETCH THEM
        this.getPilotHomeworld(store.state.pilotsList[this.id].homeworld)
        // this.getPilotVehicles()
        // this.getPilotStarships()
        console.log('Pilot Details CREATED')
    },
    mounted() {
        console.log('Pilot Details MOUNTED')
        console.log(store.state.pilotsList[this.id].homeworld)
    },
    unmounted() {
        console.log('Pilot Details UNMOUNTED')
    }
}
</script>

<style> /* MOBILE FIRST */
    .char-card, .char-details {
        display: flex;
        flex-flow: column nowrap;
        align-self: center;
        row-gap: 1.2em;

        color: #ddd;
        font-family: 'Exo', sans-serif;
    }
    
    .char-img {
        width: 400px;
        height: 550px;
        align-self: center;
    }
</style>