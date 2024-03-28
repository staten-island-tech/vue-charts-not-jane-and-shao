<script setup>
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { getDatabase, ref as r, onValue,get, set } from "firebase/database";
import { doc, setDoc, collection, getDoc,query,getDocs  } from "firebase/firestore"; 
import { info } from '@/reactive.js'
import { useRoute, useRouter } from 'vue-router'


const router = useRouter()
const route = useRoute()
const qt = getDatabase()
let name = ref('Noah')

async function LoginAttempt(){
await get(r(qt), '/').then((snapshot) => { 
  if(!Object.keys(snapshot.val().playerlist).includes(name.value.toUpperCase())){
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
  </form>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

body{
  background-color: beige;
}
#infoBox{
  font-family: "DotGothic16", sans-serif;
  background: greenyellow;
  display: flex;
  height: 50vh;
  justify-content: center;
  text-align: center;
  border: 2px black solid;
  padding: 1%;
  margin: 0 auto 0 auto;
  width: 80vw
}
</style>