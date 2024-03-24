<script setup>
import { onMounted } from 'vue';
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { getDatabase, ref as r, set, onDisconnect,onValue, update   } from "firebase/database";
import { info } from '@/reactive';
import gSet from '@/components/gSet.vue'

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



function test(){
  set(r(qt,`playerlist/${info.name}`), {
      username: info.name,
    })

  let a = new Image()
  a.src = 'https://i.pinimg.com/474x/88/fa/47/88fa47e3672b20b1962dbb11f0f81ce5.jpg'

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


  

onMounted(() => {
  console.log(otherPlayers)
  if(info.name){

  test()




  let bgtest = new Image()
  bgtest.src = 'https://i.redd.it/n3398r4desh81.jpg'
  let playertest = new Image()
  playertest.src = 'https://i.pinimg.com/474x/88/fa/47/88fa47e3672b20b1962dbb11f0f81ce5.jpg'

  const canvas = document.querySelector("canvas");
  if (canvas.getContext) {
    const c = canvas.getContext("2d");
    class Sprite { 
      constructor({ position, image }) {
        this.position = position
        this.image = image
      }

      draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
      }
    }



    const background = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: bgtest,
    })

    const player = new Sprite({
      position: {
        x: 50,
        y: 50,
      }, image: playertest,
    })

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
    console.log(10000 > ((player.position.x - 250)**2 + (player.position.y - 150)**2))
      if(3600000000 > ((player.position.x - 250)**2 + (player.position.y - 150)**2)){
        showGameSettings.value = true
      }
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
       otherPlayers.forEach((plyaer)=>{
        c.drawImage(playertest, plyaer.xPos, plyaer.yPos)
      })

      selfInfo.value.xPos = player.position.x
      selfInfo.value.yPos = player.position.y
      if(info.inLobby){
      if (keys.up && lastKeyPressed == 'up') {
        player.position.y -= 6
        update(reference, {yPos: selfInfo.value.yPos,})
      }
      else if (keys.down && lastKeyPressed == 'down') {
        player.position.y += 6
        update(reference, {yPos: player.position.y,})
      }
      else if (keys.left && lastKeyPressed == 'left') {
        player.position.x -= 6
        update(reference, {xPos: selfInfo.value.xPos,})
      }
      else if (keys.right && lastKeyPressed == 'right') {
        player.position.x += 6
        update(reference, {xPos: selfInfo.value.xPos,})
      }}
    }
    animate()
  }

  }})



</script>

<template>
  <main>
    <div id="canvasBox">
    <canvas width="1024" height="576">

    </canvas>
  </div>
    <gSet v-if="showGameSettings"></gSet>
  </main>
</template>

<style scoped>  
#canvasBox{
  background: green;
}
</style>