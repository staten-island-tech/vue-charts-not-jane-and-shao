<script setup>
import { db,app } from '@/fireSetup';
import { doc, setDoc } from "firebase/firestore"; 
import { ref, computed  } from 'vue';
import start from '@/components/start.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged  } from "firebase/auth";

const provider = new GoogleAuthProvider(app);

let signIn = ref(false)

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
  signIn.value = user
  } else {

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
  }
});

let name = ref('test')
const pathID = computed(()=>{
  return `/lobby/${name.value}`
})
</script> 

<template>
  <form v-if="signIn">
    <input type="text" v-model="name" maxlength="20">
    <p>Hello There, {{ signIn.displayName }}! </p>
    <RouterLink :to="pathID">test</RouterLink><br>
  </form>
</template>

<style scoped>
</style>
