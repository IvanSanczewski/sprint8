<template>  
  <div v-if="$store.state.actualImage.length === 0">
    <div class="no-image"></div>
    <p>{{ this.$store.state.starshipsList[id].name }}</p>
    <p>{{ this.$store.state.starshipsList[id].model}}</p>
    <p>{{ this.$store.state.starshipsList[id].manufacturer}}</p>
    <p>{{ this.$store.state.starshipsList[id].starship_class}}</p>
    <p>{{ this.$store.state.starshipsList[id].cargo_capacity}}</p>
    <p>{{ this.$store.state.starshipsList[id].consumables}}</p>
    <p>{{ this.$store.state.starshipsList[id].cost_in_credits}}</p>
    <p>{{ this.$store.state.starshipsList[id].hyperdrive_rating}}</p>
    <p>{{ this.$store.state.starshipsList[id].max_atmosphering_speed}}</p>
    <p>{{ this.$store.state.starshipsList[id].crew}}</p>
    <p>{{ this.$store.state.starshipsList[id].passengers}}</p>
  </div>
  <div v-else class="starship-container">
    <div
      :style="{backgroundImage: 'url(' + this.$store.state.actualImage +')' }"
      class="starship-img">
    </div> 

    <div class="starship-details">
      <div class="starship-name">{{ this.$store.state.starshipsList[id].name }}</div>
      
      <p>{{ this.$store.state.starshipsList[id].model}}</p>
      <p>Manufacturer: {{ this.$store.state.starshipsList[id].manufacturer}}</p>
      <p>Class: {{ this.$store.state.starshipsList[id].starship_class}}</p>
      <p>Cargo: {{ this.$store.state.starshipsList[id].cargo_capacity}}</p>
      <p>Autonomy: {{ this.$store.state.starshipsList[id].consumables}}</p>
      <p>Total Crew: {{ this.$store.state.starshipsList[id].crew}}</p>
      <p>Hyperdrive: {{ this.$store.state.starshipsList[id].hyperdrive_rating}}</p>
      <p>Atmosphering Max Speed: {{ this.$store.state.starshipsList[id].max_atmosphering_speed}}</p>
    </div> 
    <Pilots /> 
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import store from '@/store/index'
import Pilots from '@/components/Pilots.vue' 

export default {
  name: 'StarshipDetailsView',
  components: { Pilots }, 
  props: ['id'],
  methods: {
    // ...mapActions(['getStarshipImage']),
    ...mapActions(['getStarshipImage', 'fetchStarshipPilots']),
    // ...mapMutations(['populateStarshipPilots']) // PERFORMED FROM DISPLAYPILOTS MUTATION 
  },
  created() {
    this.getStarshipImage(store.state.imgNumber[this.id])
    this.fetchStarshipPilots(store.state.starshipsList[this.id].pilots)
    // this.populateStarshipPilots(store.state.starshipsList[this.id].pilots)
  },
  // MAY BE THIS ONE IS CAUSING THE NO PICTURE TO BE SHOWN???
  unmounted() {
    console.log('ship unmounted');
    store.state.actualImage =''
  }
}
</script>

<style>
  .starship-container{
    width: 70%;
    max-width: 1200px;
    margin: auto;
    
    display: flex;
    flex-flow: column;
  }

  .starship-img{
    width: 100%;
    height: 600px;
    
    background-repeat: no-repeat;
    background-size: cover;    
    background-position: center;

    border-bottom: 3px solid rgb(250, 70, 70);
  }
  
  @media screen and (max-width: 768px) {
    .starship-img{
      width: 100%;
      max-height: 300px;
    }  
  }
  
  .starship-details {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    
    color: #ddd;
    font-family: 'Exo', sans-serif;
  }
  
  .starship-name {
    margin: 1em;
    font-size: 1.2em;
    font-weight: 700;
    
    text-align: start;
    text-transform: uppercase;
  }

  .starship-details>p {
    text-align: start;
  }

  .no-image{
    background-repeat: repeat ;
    background-image: url("@/assets/no-picture.jpeg")
  }
</style>

