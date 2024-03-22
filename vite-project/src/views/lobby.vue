<script setup>
import { onMounted } from 'vue';
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { getDatabase, ref as r, set, onDisconnect,onValue, update   } from "firebase/database";
import { info } from '@/reactive';

let selfInfo = ref('test')
let selfRef = 'players/' + info.name
const qt = getDatabase()
const reference = r(qt, selfRef);

onDisconnect(reference).remove();
let otherPlayers = []

function test(){
  console.log(reference)
    set(reference, {
      username: info.name,
      xPos: Math.floor(Math.random() * 50),
      yPos: Math.floor(Math.random() * 50),
    })
selfInfo.value = {
      username: info.name,
      xPos: Math.floor(Math.random() * 50),
      yPos: Math.floor(Math.random() * 50),
    }


onValue(r(qt, 'players/'), (snapshot) => {
  let otherPlayers = []
  Object.keys(snapshot.val()).forEach((player)=> {
    otherPlayers.push(snapshot.val()[player])
  })
  console.log(otherPlayers)
});
  }



onMounted(() => {
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

    otherPlayers.forEach((playertest)=>{ playertest.draw() })
    
    let lastKeyPressed = ''
    window.addEventListener('keydown', (event) => {
  switch (event.key) {
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
      player.draw()
      selfInfo.value.xPos = player.position.x
      selfInfo.value.yPos = player.position.y
      if (keys.up && lastKeyPressed == 'up') {
        player.position.y -= 3
        update(reference, {yPos: selfInfo.value.yPos,})
      }
      else if (keys.down && lastKeyPressed == 'down') {
        console.log(background.position.x,background.position.y)
        player.position.y += 3
        update(reference, {yPos: player.position.y,})
      }
      else if (keys.left && lastKeyPressed == 'left') {
        console.log(background.position.x,background.position.y)
        player.position.x -= 3
        update(reference, {xPos: selfInfo.value.xPos,})
      }
      else if (keys.right && lastKeyPressed == 'right') {
        console.log(background.position.x,background.position.y)
        player.position.x += 3
        update(reference, {xPos: selfInfo.value.xPos,})
      }
    }
    animate()
  }
  }})



</script>

<template>
  <main>
    <canvas width="1024" height="576">

    </canvas>
  </main>
</template>