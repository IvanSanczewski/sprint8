<template>
    <!-- display in starships page -->
    <div v-if="$store.state.pageButtons === 'starships'" class="page-btn-container">
        <span @click="$store.dispatch('getPreviousPage', this.$store.state.page )" class="page-btn">PREVIOUS STARSHIPS</span>
        <span @click="$store.dispatch('getNextPage', this.$store.state.page )" class="page-btn">NEXT STARSHIPS</span>
    </div>

    <!-- display in pilots page -->
    <div v-if="$store.state.pageButtons === 'pilots'" class="page-btn-container">
        <span @click="$store.dispatch('getPreviousPilotsPage', this.$store.state.pilotPage )" class="page-btn">PREVIOUS PILOT</span>
        <span @click="$store.dispatch('getNextPilotsPage', this.$store.state.pilotPage )" class="page-btn">NEXT PILOT</span>
    </div>
</template>

<script>
// import store from '@/store/index'
import store from '@/store/index'
import { mapActions } from 'vuex'

export default {
    name: 'Pages',
    methods: {
        ...mapActions(['getPreviousPage', 'getNextPage', 'getPreviousPage', 'getNextPilotsPage'])
    },
    // CAN BE DELETED AS IT WAS A TEST TO CHECK THE HOOD AND VAR ALLOWED CALLS
    mounted() {
        // console.log(state.page)
        console.log(store.state.page)
        console.log(store.state.pageButtons)
        console.log(store.state.pilotsPage)
        // console.log(this.store.state.page)
    }
}
</script>

<style>
    .page-btn-container { 
        margin: 5em auto; 
    }

    .page-btn {
        margin: 1em;
        padding: 1em;;

        width: auto;
        height: 85px;

        color: #dedede;
        font-weight: 700;

        border: 2px solid #dedede;
        border-radius: .5em;

        cursor: pointer
    }
    .page-btn:hover {
        color: black;
        background: #dedede;
    }

</style>