<script setup>
import { db,app } from '@/fireSetup';
import { doc, setDoc } from "firebase/firestore"; 
import { ref, computed  } from 'vue';
import start from '@/components/start.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider(app);



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
let code = ref('test')
const pathID = computed(()=>{
  return `${code.value}/lobby`
})
</script> 

<template>
  <form>
    <input type="text" v-model="code">
    <p>{{ code }}</p>
  </form>
  <RouterLink :to="pathID">test</RouterLink><br>
</template>

<style scoped>
</style>
