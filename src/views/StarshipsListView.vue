<template>
    <div v-if="$store.state.starshipsList.length === 0" class="loading">
        FETCHING HAS NO HYPERDRIVE FEATURE, PLEASE WAIT…
    </div>
    <div class="starships-list">
        <ul>
            <li v-for="item, index in $store.state.starshipsList" :key="index" class="starship-link">
                <router-link class="links" :to="{ name: 'StarshipDetailsView', params:{ id: index}}">
                    <h3>{{ item.name }}</h3>
                    <h5>{{ item.model }}</h5>
                </router-link>
            </li>
        </ul>
    </div>
    <Pages />
</template>

<script>
// import StarshipDetailsView from './StarshipDetailsView.vue'
import Pages from '@/components/Pages.vue'

export default {
    name: 'StarshipsListView',
    components: { Pages },
}
</script>

<style>
.loading {
    margin: 1em auto;

    max-width: 45%;
    
    font-size: 3em;
    font-weight: 900;
}

.starships-list {
    color: white;
}

ul {

    display: flex;
    flex-flow: column wrap;
    align-items: center;
    row-gap: 1.5em;

    list-style: none;
    text-transform: uppercase;
}

.starship-link {
    width: 55%;

    /* padding: .8em 0 .8em 1em; */
    padding: 1.5em;
    text-align: start;
    background: #222222;

    border-radius: .5em;

    cursor: pointer;
}

.links {
    display: flex;
    flex-direction: column;
    row-gap: .8 em;
}



</style>