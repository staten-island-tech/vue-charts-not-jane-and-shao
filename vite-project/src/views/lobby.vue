<script setup>
import { onMounted } from 'vue';
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { getDatabase, ref as r, set, onDisconnect,onValue, update   } from "firebase/database";
import { info } from '@/reactive';
import gSet from '@/components/gSet.vue'
import {collision} from '@/assets/collisions.js'

console.log(collision)
const route = useRoute()
let selfInfo = ref('teset')
let selfRef = 'players/' + info.name
const qt = getDatabase()
const reference = r(qt, selfRef);

console.log(reference)
onDisconnect(reference).remove();
onDisconnect(r(qt,`playerlist/${info.name}`)).remove();
let otherPlayers = []
let showGameSettings = ref(false)
if(Object.keys(route.params) + ''){
  console.log(Object.keys(route.params) + '')
  console.log('ea')
}

if(!info.name){
  window.location = "http://localhost:5173/";
}

function test(){

  let a = new Image()
  a.src = 'https://static.wikia.nocookie.net/clubpenguin/images/4/46/Goofy_penguin_-_copia.webp/revision/latest/scale-to-width-down/250?cb=20231231150128&path-prefix=es'

  console.log(reference)
    set(reference, {
      username: info.name,
      xPos: 0,
      yPos: 0,
      sprite: a
    })
selfInfo.value = {
      username: info.name,
      xPos: 0,
      yPos: 0,
      sprite: a
    }



    onValue(r(qt, 'players/'), (snapshot) => {
  let tempList = []
try{
    console.log(info.inLobby)
  Object.keys(snapshot.val()).forEach((player)=> {
    console.log(  ) 
      tempList.push(snapshot.val()[player])
  })
  otherPlayers = tempList 
  console.log(otherPlayers)
}
catch(error){
  console.log('Take that, Obama')
}
});
  }

let rows = []
console.log(collision.length)
for (let i=0;i<collision.length; i+=128){
  rows.push(collision.slice(i,i+128))
}

console.log(rows)

onMounted(() => {
  console.log(otherPlayers)
  if(info.name){
    console.log(info.name)
  test()




  let bgtest = new Image()
  bgtest.src = `map.png`
  let playertest = new Image()
  playertest.src = `player.png`
  
  const canvas = document.querySelector("canvas");
  if (canvas.getContext) {
    const c = canvas.getContext("2d");
    class Sprite { 
      constructor({ position, properties }) {
        this.position = position
        this.properties = properties
      }
    
      draw() {
        c.drawImage(this.properties.image, this.position.x, this.position.y)
      }
    }

    class boundary {
      constructor({pos}){
        this.pos = pos
        this.w = 64
        this.h = 64
      }
      draw() {
        c.fillStyle = 'red'
        c.fillRect(this.pos.x,this.pos.y,this.w,this.h)
      }
    }
    let boundList = []
    rows.forEach((x, i)=>{ 
      x.forEach((tile, j)=>{
        if (tile==397){
          boundList.push(new boundary({pos: {
            x: i * 64,
            y: j * 64,
          }}))
        }
      })
    })
    console.log(boundList)
    const background = new Sprite({
      position: {
        x: -2500,
        y: -2500
      },
      properties: {
        image : bgtest
      },
    })

    const player = new Sprite({
      position: {
        x: 3340+background.position.x,
        y: 3000+background.position.y,
        actualX: 3240,
        actualY: 2900,
      }, properties: { image: playertest,
      name:info.name} 
    })
    console.log(player.properties.name)
    const keys = {
      up: false,
      down: false,
      left: false,
      right: false,
    }

    
    let lastKeyPressed = ''
    window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Shift':
        showGameSettings.value = true
      break
    case 'ArrowDown':
    case 's':
      keys.down=true
      lastKeyPressed = 'down'
      break
    case 'ArrowRight':
    case 'd':
      keys.right=true
      lastKeyPressed = 'right'
      break
    case 'ArrowUp':
    case 'w':
      keys.up=true
      lastKeyPressed = 'up'
      break
    case 'ArrowLeft':
    case 'a':
      keys.left=true
      lastKeyPressed = 'left'
      break
  }
})
  

  window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowDown':
    case 's':
      keys.down=false
      break
    case 'ArrowRight':
    case 'd':
      keys.right=false
      break
    case 'ArrowUp':
    case 'w':
      keys.up=false
      break
    case 'ArrowLeft':
    case 'a':
      keys.left=false
      break
}
})
function animate() {
      
      window.requestAnimationFrame(animate)
      background.draw()
      c.font = "16px serif";
      player.draw()
       otherPlayers.forEach((plyaer)=>{
        if (plyaer.username!=player.properties.name){
        c.drawImage(player.properties.image, plyaer.xPos+background.position.x+100, plyaer.yPos+background.position.y+100)
        c.fillText(plyaer.username, plyaer.xPos+285+background.position.x, plyaer.yPos+background.position.y)
      }
      })

      selfInfo.value.xPos = player.position.actualX
      selfInfo.value.yPos = player.position.actualY
      if(info.inLobby){
      if (keys.up && lastKeyPressed == 'up') {
        player.position.actualY-= 5
        background.position.y += 5
        update(reference, {yPos: selfInfo.value.yPos,})
      }
      else if (keys.down &&  lastKeyPressed == 'down') {
        player.position.actualY += 5
        background.position.y -= 5
        update(reference, {yPos: selfInfo.value.yPos,})
      }
      else if (keys.left && lastKeyPressed == 'left') {
        player.position.actualX -= 5
        background.position.x += 5
        update(reference, {xPos: selfInfo.value.xPos,})
      }
      else if (keys.right && lastKeyPressed == 'right') {
        player.position.actualX += 5
        background.position.x -= 5
        update(reference, {xPos: selfInfo.value.xPos,})
      }}
    }
    boundList.forEach((bndry)=>{
      c.fillStyle = "blue";
      c.fillRect(bndry.pos.x,bndry.pos.y,bndry.w,bndry.h)
      
      })
    animate()
  }

  }})



</script>

<template>
  <main>
    <div id="canvasBox">
    <canvas width="1920" height="1080">

    </canvas>
  </div>
    <gSet id="settings" v-if="showGameSettings"></gSet>
  </main>
</template>

<style scoped>  

#settings{
  display: flexbox;
  border: 3px black solid;
  justify-content: center;
  background-color: white;
  position: fixed;
  width: 100%;
    top: 100%;
    left: 50%;
    -webkit-transform: translate(50%, 0%);
    transform: translate(-50%, -100%);
}
#canvasBox{
  /* align-items: center; */
  justify-content: center;
  display: flex;
  opacity:0.8;
    background-image: url(https://i.pinimg.com/736x/fc/2b/2b/fc2b2b547b98582926b7e7c993987163.jpg);
    position:fixed;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:-1000;
}
canvas{
  border: 5px solid black 
}
</style>