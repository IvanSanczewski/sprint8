<template>
     <div v-if="$store.state.pilotsList.length === 0" class="loading">
        FETCHING HAS NO HYPERDRIVE FEATURE, PLEASE WAIT…
    </div>
    <div class="pilots-list">
        <ul>
            <li v-for="item, index in $store.state.pilotsList" :key="index" class="character-link">
                <router-link class="link" :to="{ name: 'PilotDetailsView', params:{ id: index} }"> 
                    <div :style="{backgroundImage: 'url(' + item.img +')' }" class="list-char-img"></div>
                    <h3 class="char-name"> {{item.name}}</h3>
                </router-link>
            </li>
        </ul>
    </div>
    <Pages />
</template>

<script>
import { mapActions } from 'vuex'
import Pages from '@/components/Pages.vue'
import store from '@/store/index'

export default {
    name: 'PilotsListView',
    props: ['id'],
    components: { Pages },
    methods: {
        ...mapActions(['getPilotsImage'])
    },
    created() {
        console.log(store.state.pilotsList)
        this.getPilotsImage(store.state.pilotsList)
    }
}
</script>

<style>
.character-link {
    display: flex;
    flex-flow: column nowrap;
    
    color: #efefef;
    background: #333;
    
    border-radius: .5em ;
}

.list-char-img {
    width: 250px;
    height: 300px;

    background-size: cover;
    background-repeat: no-repeat;

    border-top-left-radius: .5em ;
    border-top-right-radius: .5em ;
}

.char-name {
    padding: .5em;
}
</style>