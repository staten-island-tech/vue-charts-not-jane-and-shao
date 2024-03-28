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
    <h2>WELCOME!</h2>
    <h3 v-if="name == '' ">{{ 'Input Your Name!' }}</h3>
    <h3 v-else>{{ name }}</h3>
    <input type="text" v-model="name" maxlength="16">
    <button @click.prevent="LoginAttempt()">Submit</button>
  </form>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

body{
  background-color: darkorchid;
}
#infoBox{
  font-family: "DotGothic16", sans-serif;
  background: beige ;
  display: flex;
  height: 60vh;
  font-size: 50px;
  justify-content: center;
  text-align: center;
  border: 2px black solid;
  padding: 1%;
  margin: 0 auto;
  margin-top: 10vh;
  width: 50vw
}
</style>