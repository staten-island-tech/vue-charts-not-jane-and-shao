<script setup>
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { getDatabase, ref as r, onValue,get, set } from "firebase/database";
import { doc, setDoc, collection, getDoc,query,getDocs  } from "firebase/firestore"; 
import { info } from '@/reactive.js'
import { useRoute, useRouter } from 'vue-router'
import selection from '@/components/selection.vue'


const router = useRouter()
const route = useRoute()
const qt = getDatabase()
let name = ref('')
let sprite = ref('')

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
  <div id="gal">
  <div id="nintendo3DS">
    <div id="bar"></div>
    <div class="topScreen">
      <selection></selection>
    </div>
    <div class="bottomScreen">
      <div id="infoBox">
        <form>
          <br>
          <h2>Login</h2>
          <h3 v-if="name">{{ name.toUpperCase().replaceAll(' ', '-') }}</h3>
          <h3 v-else>Username</h3>
          <input type="text" v-model="name" maxlength="15" placeholder="Enter your username">
          <button id="sButt" @click.prevent="LoginAttempt" :disabled="name == ''">Submit</button>
        </form>
      </div>
    </div>
    <div class="buttons">
      <button class="up">X</button>
      <div>
        <button class="left">Y</button>
        <button class="down">B</button>
        <button class="right">A</button>
      </div>
    </div>
    <div class="d-pad"></div>
    <img src="https://static.thenounproject.com/png/1273647-200.png">
  </div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

#gal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background-image: url(https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/0032398f86ea753194c5eeba97eccda2-1627249600/ExportBackgroundnomoveclound/draw-a-pixel-pokemon-battle-background.gif); /* Just to visualize the extent */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#bar{
  position: absolute;
  top: 50%;
  height: 50%;
  border-radius: 20px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  transform: translate(0%,-100%);
  z-index: -4;
  background-color: black;
  width: 720px;
  border: 0px solid black;
}

#nintendo3DS {
  width: 720px;
  height: 675px;
  background-color: #0095b3;
  border: black 2px solid;
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

#sButt{
  background-color: silver;
  color:whitesmoke;
  text-shadow: #000000 1px 0 1px;;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

input {
  width: calc(60% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
}

button {
  width: calc(60% - 22px);
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
background-color: #0095b3;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #3672b8;
}

.buttons {
  position: absolute;
  top: 52.5%;
  right: -10px;
  display: flex;
  flex-direction: column;
  transform: translate(-5%, 25%)
}

.buttons button {
  width: 40px;
  height: 40px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: #068098;
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
  width: 150px;
  height: 150px;
  background-color: transparent;
  position: relative;
  transform: translate(-0px, -290px);
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

