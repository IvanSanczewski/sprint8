<template>
    <!-- backdrop container activates if signin or login are true -->
    <div v-if="$store.state.displayLogIn || $store.state.displaySignIn" @click.self="$store.commit('closeLogSignIn')" class="backdrop">
        <!-- login container -->
        <div v-if="$store.state.displayLogIn" class="login-signin-modal">
            <p class="close" @click="$store.commit('closeLogSignIn')" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
            <div class="form-logo">
                <img src="@/assets/Star_Wars_Logo_gold.png" alt="star wars small yellow logo">
            </div>
            <form class="user-login-form" @submit.prevent="checkUser">
                <p>ENTER YOUR EMAIL ADDRESS</p>
                <input type="text" value="I@user.com" placeholder="Email Address" ref="existingEmail">
                <span v-show="emailErr" :class="{ emailErr }"> {{ emailErrMsg }}</span>
                <span v-show="emptyEmailErr" :class="{ emptyEmailErr }"> {{ emptyEmailErrMsg }}</span>
                <button>A JEDI SURE YOU ARE?</button>
            </form>
            <form v-if="$store.state.displayPaswordRequest" class="password-login-form" @submit.prevent="checkPassword">
                <input type="password" placeholder="Type your password" ref="existingPassword">
                <span v-show="passwordErr" :class="{ passwordErr }"> {{ passwordErrMsg }}</span>
                <button>USE THE FORCE</button>
            </form>
        </div>
        <!-- signin container -->
        <div v-if="$store.state.displaySignIn" class="login-signin-modal">
            <p class="close" @click="$store.commit('closeLogSignIn')" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
            <div class="form-logo">
                <img src="@/assets/Star_Wars_Logo_gold.png" alt="star wars small yellow logo">
            </div>
            <!-- commit mutation can be triggered from template, but also from a method which is triggered from a function declared in the template -->
            <!-- <form class="signin-card-form" @submit.prevent="$store.commit('addUser', this.$refs.firstName.value)"> -->
            <form class="signin-form" @submit.prevent="validateUser">
                <p>CREATE YOUR ACCOUNT</p>
                <input type="text" value="Ivan" placeholder="First Name" ref="firstName">
                <span v-show="firstNameErr" :class="{ firstNameErr }"> {{ firstNameErrMsg }}</span>

                <input type="text" value="Sánchez" placeholder="Last Name" ref="lastName" >
                <span v-show="lastNameErr" :class="{ lastNameErr }"> {{ lastNameErrMsg }}</span>
                
                <input type="text" value="1@2.a" placeholder="Email Address" ref="email">
                <span v-show="emailErr" :class="{ emailErr }"> {{ emailErrMsg }}</span>
                <span v-show="emptyEmailErr" :class="{ emptyEmailErr }"> {{ emptyEmailErrMsg }}</span>
                
                <!-- v-bind type to toggled attribute  -->
                <input :type="passwordType" value="1234" placeholder="Password" ref="password">
                <span v-show="passwordErr" :class="{ passwordErr }"> {{ passwordErrMsg }}</span>
                <p class="show-password"><input type="checkbox" @click="toggleInputType">Show password</p>
                <button>BECOME A JEDI</button>
            </form>
        </div>
    </div>

</template>

<script>
import store from '@/store/index'
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'SignLogIn',
    data() {
        return {
            firstNameErr: false,
            firstNameErrMsg: 'Please provide your first name',
            
            lastNameErr: false,
            lastNameErrMsg: 'Please provide your Last name',
            
            emptyEmailErr: false,
            emptyEmailErrMsg: 'Please provide your email',
            
            emailErr: false,
            mailRegEx: /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/,
            emailErrMsg: 'The provided email is invalid, please provide a valid one',
            
            passwordErr: false,
            passwordErrMsg:'Your password must be 8 to 20 characters and contain at least one lowercase, one uppercase, one number and one special character',
            passwordType: 'password',

            users_db_URL: 'http://localhost:3000/users',
            newUser: {},



        }
    },
    methods: {
        ...mapMutations(['closeLogSignIn','addUser', 'loginUser', 'loginPassword']),
        ...mapActions(['getUsers', 'postNewUser']),
        validateUser() {
            let firstName, lastName, email, password
            //first name validation
            if (this.$refs.firstName.value.trim() === '' || this.$refs.firstName.value.trim() === null) {
                this.firstNameErr = true
            } else {
                firstName = this.$refs.firstName.value.trim()
                console.log(firstName);
                this.firstNameErr = false
            }
            //last name validation
            if (this.$refs.lastName.value.trim() === '' || this.$refs.lastName.value.trim() === null) {
                this.lastNameErr = true
            } else {
                lastName = this.$refs.lastName.value.trim()
                console.log(lastName);
                this.lastNameErr = false
            }
            //email validation
            if (this.$refs.email.value.trim() === '' || this.$refs.email.value.trim() === null) {
                this.emptyEmailErr = true
                this.emailErr = false
                console.log('mail vacío')
            } else if (!this.mailRegEx.test(this.$refs.email.value.trim())) {
                this.emailErr = true
                this.emptyEmailErr = false
                console.log('mail erróneo')
            } else {
                email = this.$refs.email.value.trim()
                console.log(email)
                console.log('mail correcto')
                this.emailErr = false
                this.emptyEmailErr = false
            }
            // password validation
            if (this.$refs.password.value.trim() === '' || this.$refs.password.value.trim() === null) {
                this.passwordErr = true
            } else {
                password = this.$refs.password.value.trim()
                console.log(password);
                this.passwordErr = false
            }

            if (!this.firstNameErr && !this.lastNameErr && !this.emailErr && !this.passwordErr) {
                this.newUser = { firstName,lastName, email, password }
                this.$store.commit('addUser', this.newUser) 
                console.log(this.newUser);
            }
        },        
        checkUser() {
            let email
            if (this.$refs.existingEmail.value.trim() === '' || this.$refs.existingEmail.value.trim() === null) {
                this.emptyEmailErr = true
                this.emailErr = false
                console.log('mail vacío')
            } else if (!this.mailRegEx.test(this.$refs.existingEmail.value.trim())) {
                this.emailErr = true
                this.emptyEmailErr = false
                console.log('mail erróneo')
            } else {
                email = this.$refs.existingEmail.value.trim()
                console.log(email)
                console.log('mail correcto')
                this.emailErr = false
                this.emptyEmailErr = false
                this.$store.commit('loginUser', email)
            }
        },
        checkPassword() {
            let password = this.$refs.existingPassword.value.trim()
            if (password === '' || password === null) {
                this.passwordErr = true
            } else {
                this.$store.commit('loginPassword', password)
                this.passwordErr = false
            }
        },
        toggleInputType() {
            (this.passwordType === 'password')? this.passwordType = 'text' : this.passwordType = 'password'
        } 
    },
    mounted() {
        console.log('Modal mounted')
        this.$store.dispatch('getUsers', this.users_db_URL)
    },
    updated() {
        console.log('Modal updated')
    },
}
</script>

<style>
    .backdrop {
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.7);   
        width: 100vw;
        height: 100vh;
    }

    .login-signin-modal {
        margin: 200px auto;
        padding: 3em;
        width: fit-content;
        max-width: 55%;
        
        /* color: #edd700; */
        color: rgb(255, 197, 0);
        background: #151515;
        border-radius: .5em;
        
        display: flex;
        flex-flow: column nowrap;
        row-gap: 1em;
        
        position: relative;
    }
    
    .close {
        position: absolute;
        top: -.15em;
        right: -.35em;
        font-size: 1.5em;
    }

    .form-logo>img {
        width: 150px
    }
    
    .user-login-form, .password-login-form {
        display: flex;
        flex-flow: column nowrap;
        row-gap: 1em
    }
    
    .user-login-form>p {
        font-size: x-large;
    }

    button, input {
        padding: .6em;
        font-size: .8em ;
        border: none;
        border-radius: .3em;
        letter-spacing: 0.06em;
    }

    input {
        color: #555;
        background: white;
    }

    button, input:focus {
        color: white;
        background: #555;
    }

    .signin-form {
        display: flex;
        flex-flow: column nowrap;
        /* align-items: flex-start; */
        row-gap: 1em;
    }

    .signin-form>p {
        font-size: x-large
    }

    .show-password {
        margin: 0;
        text-align: start
    }
    
    .show-password>input {
        margin: 0 1em 0 0;
    }

    /* error styles */
    .firstNameErr {
        color: white;
        background: rgb(215, 62, 93);
    }

    .lastNameErr {
        color: white;
        background: rgb(215, 62, 93);
    }

    .emailErr {
        color: white;
        background: rgb(215, 62, 93);
    }

    .emptyEmailErr {
        color: white;
        background: rgb(215, 62, 93);
    }

    .passwordErr {
        width: 19%;
        color: white;
        background: rgb(215, 62, 93);
    }
</style>