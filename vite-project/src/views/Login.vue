<script setup>
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { getDatabase, ref as r, onValue,get, set } from "firebase/database";
import { doc, setDoc, collection, getDoc,query,getDocs  } from "firebase/firestore"; 
import { info } from '@/reactive.js'
import { useRoute, useRouter } from 'vue-router'
import selection from '@/components/selection.vue';

const router = useRouter()
const route = useRoute()
const qt = getDatabase()
let name = ref('Noah')

async function LoginAttempt(){
await get(r(qt), '/').then((snapshot) => { 
  if(!Object.keys(snapshot.val().playerlist).includes(name.value.toUpperCase().replaceAll(' ', '-'))){
    info.name = name.value.toUpperCase().replaceAll(' ', '-')
    set(r(qt,`playerlist/${info.name}`), {
      username: info.name,
    })
router.replace({ path: '/lobby' })
  }
  else{
    console.log('name taken!')
  }
})
} 



</script>

<template>

<div id="infoBox">
  <form>
    <h2>Login</h2>
    <h3>{{ name }}</h3>
    <input type="text" v-model="name" maxlength="15">
    <button @click.prevent="LoginAttempt()">Submit</button>
    <selection></selection>
  </form>
</div>
</template>

<style>
#infoBox{
  background: greenyellow;
  display: flex;
  height: 50vh;
  justify-content: center;
  text-align: center;
  border: 2px black solid;
  padding: 1%;
}
</style>