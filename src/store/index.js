import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'


const pageURL = 'https://swapi.dev/api/starships/?page='
const imageURL = 'https://starwars-visualguide.com/assets/img/starships/'
const PAGE_PILOT_URL = 'https://swapi.dev/api/people/?page='
const PAGE_PILOT_IMG = 'https://starwars-visualguide.com/assets/img/characters/'

export default createStore({
  state: {
    starshipsList: [],
    page: 1,
    pilotsPage: 1,
    actualImage: '',
    imgNumber: [],
    actualPilotImage:'',
    pilotsImages: [],
    displayLogIn: false,
    displaySignIn: false,
    displayPaswordRequest: false,
    users: [],
    usersEmailList: [],
    actualUser: '',
    actualTryUserEmail: '',
    newUserToSave: false,
    userLogged: false,
    // routePath: null,
    pilotsList: [],
    pageButtons: 'pilots', //MAY NEED TO BE CHANGED WHEN ACCESSED FROM LOGIN & SIGNIN 
    pilotHomeworld: '',
    starshipPilots: []

  },
  getters: {
    generateUsersEmailsList (state){
      return state.usersEmailList = state.users.map(user => user.email)
    },

    userIsLogged (state) {
      console.log(state.userLogged)
      return state.userLogged
    }
  },
  mutations: {
    displayStarships(state, {response, page}) {
      localStorage.setItem('response', response)
      localStorage.setItem('page', page)

      state.page = page
      if (state.starshipsList.length) {
        state.starshipsList = []
        state.imgNumber = []
      }
      response.map(item => {
        item.imgNumber = item.url.slice(32,-1) // old address -->> .dev
        // item.imgNumber = item.url.slice(37) //new address -->> .tech
        state.starshipsList.push(item)
        state.imgNumber.push(item.imgNumber)
      })
      state.starshipsList = response
    },

    displayStarshipImage(state, response) {
      state.actualImage = response
    },

    // toggleLogIn(state, path) {
    toggleLogIn(state) {
      // console.log(path);
      // state.routePath = path
      // console.log(state.routePath);
      state.displaySignIn = false
      state.displayLogIn = !state.displayLogIn
    },

    toggleSignIn(state) {
      state.displayLogIn = false
      state.displaySignIn = !state.displaySignIn
    },

    closeLogSignIn(state) {
      state.displaySignIn = false
      state.displayLogIn = false
      state.displayPaswordRequest = false
    },

    populateUsers(state, data) {
      state.users = data
    },

    addUser(state, newUser) {
      console.log(newUser)
      if (state.usersEmailList.includes(newUser.email)) {
        state.newUserToSave = false
        console.log('This mail to a Jedi already belongs');
      } else {
        // add the new user to the users array
        state.users.push(newUser)
        state.userLogged = true // this flag allows router guard to show web
        state.newUserToSave = true //NEEDED ONLY FOR DB
        state.actualUser = newUser
        state.displaySignIn = false
        // router.push(state.routePath)// NO NEED TO REDIRECT THE USER AS NO PAGE HAS BEEN REQUESTED
 
      }
    },
    
    loginUser(state, email) {
      let isUser = state.usersEmailList.some(item => item === email)
      if (isUser) {
        state.actualTryUserEmail = email
        state.displayPaswordRequest = true
        console.log(state.actualTryUserEmail);
      } else {
        console.log('To a Jedi this email does not belong. Sign Up first you need, or… a Sith may be are you!');
        // ENVIAR ERROR DE SIGN IN NEEDED
      }
    },

    loginPassword(state, password) {
      let registeredUser = state.users.find(item => item.email === state.actualTryUserEmail)
      console.log(registeredUser)
      if (registeredUser.password === password) {
        console.log(`Jedi ${registeredUser.firstName} ready to use the Force is.`)
        state.actualUser = registeredUser
        state.userLogged = true // this flag allows router guard to show web
        state.displayLogIn = false
        state.displayPaswordRequest = false
        // router.push(state.routePath)// NO NEED TO REDIRECT THE USER AS NO PAGE HAS BEEN REQUESTED
      } else {
        console.log(`${registeredUser.firstName} a Jedi with no memory you are!`)
      }
    },

    saveNewUser(state, newUser) {
      if (state.newUserToSave) {
        state.users.push(newUser)
      }
      router.push('/starships')
    },

    togglePageButtons(state, page) {
      console.log(page)
      state.pageButtons = page
    },
    
    displayPilots(state, {responsePilots, pagePilots}) {
      localStorage.setItem('responsePilots', responsePilots)
      localStorage.setItem('pagePilots', pagePilots)

      console.log(state)
      console.log(state.pilotsPage)
      console.log(responsePilots)
      console.log(pagePilots)

      state.pilotsPage = pagePilots
      if (state.pilotsList.length) {
        state.pilotsList = []
        // state.imgNumber = [] // ADD PILOT IMAGE NUMBER TO STATE AND EMPTY IT
      }
      state.pilotsList = responsePilots
      console.log(state.pilotsList)
    },

    displayHomeworld(state, response) { 
      state.pilotHomeworld = response
    },

    displayPilotsImage(state, response) {
      state.pilotsImages = response // AT CERTAIN POINTS IT DOES NOT WORK, AND I WONDER WHY…
      state.pilotsList.map((item, id) => {
        let nmbr = id +1
        item.img = `${PAGE_PILOT_IMG}${nmbr}.jpg`
      })
    },

    displayStarshipsPilots(state, response) {
      console.log('response', response)
      state.starshipPilots = response
      console.log('starshipPilots', state.starshipPilots)
    }
  }, 

  actions: {
    getStarships({ commit }, page) {
      axios(`${pageURL}${page}`)
      .then(response => commit('displayStarships', {response: response.data.results, page: page}))
      // .then(response => commit('displayStarships', response.data.results))
    },

    getStarshipImage({ commit }, id) {
      axios(`${imageURL}${id}.jpg`)
      .then(response => commit('displayStarshipImage', response.config.url))
    },

    getNextPage({ commit }, page) {
      console.log(page)
      if (page < 4) {
        page++
      }
      console.log(page)
      axios(`${pageURL}${page}`)
      .then(response => commit('displayStarships', {response: response.data.results, page: page}))
    },

    getPreviousPage({ commit }, page) {
      console.log(page)
      if (page > 1) {
        page--
      }
      console.log(page)
      axios(`${pageURL}${page}`)
      .then(response => commit('displayStarships', {response: response.data.results, page: page}))
    },

    getUsers({ commit }, URL) {
      console.log(URL)
      fetch(URL)
        .then(response => response.json())
        .then(data => commit('populateUsers', data))
        .catch(console.log('Registered Jedis yet we have not!'))
    },

    postNewUser({ commit }, newUser) {
      commit('saveNewUser', newUser)
    },

    getPilots({ commit }, pagePilots) {
      console.log(pagePilots);
      axios(`${PAGE_PILOT_URL}${pagePilots}`)
      // .then(response => console.log(response.data.results))
        .then(response => commit('displayPilots', {responsePilots: response.data.results, pagePilots}))
    },
    
    getPilotsImage({commit}, pilotsListArray) {
      // TRY REFACTORING, PASSING THE RESPONSE AS PARAMETER ALONG WITH THE COMMIT, THUS NEW LOCAL ARRAY MAY NOT BE NECESSARY <<< it is needed, otherwise an string is formed instead of an array
      let pilotsImageListArray = []
      pilotsListArray.map(item => {
        let id = item.url.slice(29,-1)
        axios(`${PAGE_PILOT_IMG}${id}.jpg`)
          // .then(response => console.log(response.config.url)) // this way I check the full path containing info needed from response
          .then(response => pilotsImageListArray.push(response.config.url))
      })
      commit('displayPilotsImage', pilotsImageListArray)
    },

    fetchStarshipPilots({commit}, starshipPilotsArray) {
      let starshipsPilotsListArray = []
      starshipPilotsArray.map(item => {
        axios(item)
          .then(response => starshipsPilotsListArray.push(response.data.name))
          // .then(response => commit('displayStarshipsPilots', response.data.name))
      })
      console.log('starshipsPilotsListArray', starshipsPilotsListArray )
      commit('displayStarshipsPilots', starshipsPilotsListArray)      
      
    },

    getPilotHomeworld({commit}, homeworld) {
      console.log(homeworld)
      axios(`${homeworld}`)
        .then(response => commit('displayHomeworld', response.data.name))
    }
  },

})