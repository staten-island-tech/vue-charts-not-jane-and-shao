<script setup>
import { db, app } from './fireSetup';
import { doc, setDoc } from "firebase/firestore"; 
import { ref } from 'vue';
import start from './components/start.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider(app);
let state = ref({
  login: true,
  lobby: false
})


const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
console.log(token)
}).catch((error) => {
 console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

</script>

<template>
  <start v-if="state.login"></start>
</template>

<style scoped>
</style>
