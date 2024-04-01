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
let name = ref('')

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
  <div id="nintendo3DS">
    <div class="topScreen">
      <!-- Placeholder for the top screen -->
    </div>
    <div class="bottomScreen">
      <div id="infoBox">
        <form>
          <br>
          <h2>Login</h2>
          <h3>{{ name }}</h3>
          <input type="text" v-model="name" maxlength="15" placeholder="Enter your username">
          <button @click.prevent="LoginAttempt" :disabled="name == ''">Submit</button>
        </form>
      </div>
    </div>
    <div class="buttons">
      <button class="up"></button>
      <div>
        <button class="left"></button>
        <button class="down"></button>
        <button class="right"></button>
      </div>
    </div>
    <div class="d-pad"></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

#nintendo3DS {
  width: 720px;
  height: 700px;
  background-image: url('https://i.imgur.com/WHwJbon.png');
  background-color: #000000;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'DotGothic16', sans-serif
}

.topScreen, .bottomScreen {
  width: calc(60% - 0px);
  height: 45%;
  background-color: #9fc7f6;
  margin: 20px auto;
}

.bottomScreen {
  position: relative;
  display: flex;
}

#infoBox {
  padding: 20px;
  flex: 1;
}

form {
  text-align: center;
}

input {
  width: calc(60% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
}

button {
  width: calc(60% - 22px);
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4b92db;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3672b8;
}

.buttons {
  position: absolute;
  top: 50%;
  right: -10px;
  display: flex;
  flex-direction: column;
  transform: translate(-5%, 25%)
}

.buttons button {
  width: 40px;
  height: 40px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-color: #cccccc;
  margin: 5px;
}

.buttons button.up {
  margin: 0 auto 5px;
}

.buttons button.left {
  margin: 0 5px;
  transform: translateX(30%)
}

.buttons button.right {
  margin: 0 5px;
  transform: translateX(-30%)
}

.buttons button.down {
  margin: 0 5px;
  transform: translateY(110%)
}

.buttons button:hover {
  background-color: #999999;
}

.d-pad {
  width: 120px;
  height: 120px;
  background-color: transparent;
  position: relative;
  transform: translate(15px, -200px);
}

.d-pad::before,
.d-pad::after {
  content: '';
  position: absolute;
  background-color: #666666;
}

.d-pad::before {
  width: 60%;
  height: 20%;
  top: 40%;
  left: 20%;
}

.d-pad::after {
  width: 20%;
  height: 60%;
  top: 20%;
  left: 40%;
}
</style>

