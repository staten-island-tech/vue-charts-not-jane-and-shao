<script setup>
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { getDatabase, ref as r, onValue,get } from "firebase/database";
import { doc, setDoc, collection, getDoc,query,getDocs  } from "firebase/firestore"; 
import { info } from '@/reactive.js'
import { useRoute, useRouter } from 'vue-router'


const router = useRouter()
const route = useRoute()

let name = ref('Noah')
async function LoginAttempt(){

info.name = name.value.toUpperCase()
router.replace({ path: '/lobby' })
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