  <script setup>
import { onMounted } from 'vue';
import { db } from '@/fireSetup';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { getDatabase, ref as r, set, onDisconnect, onValue, update, get, child } from "firebase/database";
import { info } from '@/reactive';
import gSet from '@/components/gSet.vue'
import { collision } from '@/assets/collisions.js'
import map from '@/assets/map.png'
import foreground from "@/assets/foreground.png"
import knight from '@/assets/knight.png'
const route = useRoute()
let selfInfo = ref('teset')
let selfRef = 'players/' + info.name
const qt = getDatabase()
const reference = r(qt, selfRef);
onDisconnect(reference).remove();
onDisconnect(r(qt, `playerlist/${info.name}`)).remove();
let otherPlayers = []
let showGameSettings = ref(false)
// if (Object.keys(route.params) + '') {
//   console.log(Object.keys(route.params) + '')
//   console.log('ea')
// }

if (!info.name) {
  window.location = "http://localhost:5173/";
}
let playerxPos = 3000
let playeryPos = 3000
function test() {
  console.log(info)
  let test = new Image()
  test.src = knight
  set(reference, {
    username: info.name,
    xPos: 0,
    yPos: 0,
    sprite: info.sprite
  })
  selfInfo.value = {
    username: info.name,
    xPos: 0,
    yPos: 0,
    sprite: info.sprite
  }


  onValue(r(qt, 'players/'), (snapshot) => {
    let tempList = []
    try {
      Object.keys(snapshot.val()).forEach((player) => {
        tempList.push(snapshot.val()[player])
      })
      otherPlayers = tempList
    }
    catch (error) {
      console.log('Take that, Obama')
    }
  });
}

let rows = []
for (let i = 0; i < collision.length; i += 128) {
  rows.push(collision.slice(i, i + 128))
}

onMounted(() => {
  if (info.name) {
    test()
    const canvas = document.querySelector("canvas");
    if (canvas.getContext) {
      const c = canvas.getContext("2d");
      class Sprite {
        constructor({ pos, properties }) {
          this.pos = pos
          this.properties = properties
        }

        draw() {
          c.drawImage(this.properties.image, this.pos.x, this.pos.y)
        }
      }

      class boundary {
        constructor({ pos }) {
          this.pos = pos
          this.w = 64
          this.h = 64
        }
        draw() {
          c.fillStyle = "rgba(0, 0, 0, 0)";
          c.fillRect(this.pos.x, this.pos.y, this.w, this.h)
        }
      }
      const bg = new Image()
      bg.src = map

      const background = new Sprite({
        pos: {
          x: -2500,
          y: -2500
        },
        properties: {
          image: bg
        },
      })

      const fg = new Image()
      fg.src = foreground
      const fore = new Sprite({
        pos: {
          x: -2500,
          y: -2500
        },
        properties: {
          image: fg
        }
      })
      const plyr = new Image()
      plyr.src = knight
      const player = new Sprite({
        pos: {
          x: 3000 + background.pos.x,
          y: 3000 + background.pos.y,
          actualX: 3000,
          actualY: 3000,
        }, properties: {
          image: plyr,
          name: info.name
        }
      })

      let boundList = []
      rows.forEach((x, i) => {
        x.forEach((tile, j) => {
          if (tile == 397) {
            boundList.push(new boundary({
              pos: {
                x: j * 64-2500,
                y: i * 64-2500,
              }
            }))
          }
        })
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
          if(showGameSettings.value != true){
            showGameSettings.value = true} else{
              showGameSettings.value = false
            }
            break
          case 'ArrowDown':
          case 's':
            keys.down = true
            lastKeyPressed = 'down'
            break
          case 'ArrowRight':
          case 'd':
            keys.right = true
            lastKeyPressed = 'right'
            break
          case 'ArrowUp':
          case 'w':
            keys.up = true
            lastKeyPressed = 'up'
            break
          case 'ArrowLeft':
          case 'a':
            keys.left = true
            lastKeyPressed = 'left'
            break
        }
      })


      window.addEventListener('keyup', (event) => {
        switch (event.key) {
          case 'ArrowDown':
          case 's':
            keys.down = false
            break
          case 'ArrowRight':
          case 'd':
            keys.right = false
            break
          case 'ArrowUp':
          case 'w':
            keys.up = false
            break
          case 'ArrowLeft':
          case 'a':
            keys.left = false
            break
        }
      })

      function colliding(obj1,obj2){
        return(obj1.pos.x + 64 >= obj2.pos.x  &&  
          obj1.pos.x <= obj2.pos.x +16
          && obj1.pos.y <= obj2.pos.y + 16 
          && obj1.pos.y + 64 >= obj2.pos.y)
        }
      function animate() {

        window.requestAnimationFrame(animate)
        playerxPos = player.pos.actualX
        playeryPos = player.pos.actualY
        background.draw()
        boundList.forEach((bndry) => {
          bndry.draw() 
        })
        player.draw()
        c.font = "16px DotGothic16";
        c.fillStyle = "rgb(0,0,0)";
        if(player.properties.name != undefined){
          c.fillText(`${player.properties.name}`,player.pos.x+16,player.pos.y+32)
        }
        otherPlayers.forEach((plyaer) => {
          if (plyaer.username != player.properties.name) {
            let otherSprite = new Image()
            otherSprite.src = plyaer.sprite
            c.drawImage(otherSprite, plyaer.xPos + background.pos.x, plyaer.yPos + background.pos.y)
            if(plyaer.username != undefined){
              c.fillText(plyaer.username, plyaer.xPos + 16 + background.pos.x, 32 + plyaer.yPos + background.pos.y)
            }
          }
        })
        fore.draw()
        selfInfo.value.xPos = player.pos.actualX
        selfInfo.value.yPos = player.pos.actualY
        if (info.inLobby) {

          let moving=true
          if (keys.up && lastKeyPressed == 'up') {
            for (let i =0; i<boundList.length;i++){
              let predictBndry = {
            pos: {
              x: boundList[i].pos.x ,
              y: boundList[i].pos.y+12,
            },
          }
          if(colliding(player,predictBndry)==true){
            c.fillStyle='rgb(255,0,0,0.2)'
            c.fillRect(predictBndry.pos.x,predictBndry.pos.y,64,64)
            moving=false
            break
          }
            }if(moving==true){
            player.pos.actualY -= 12
            background.pos.y += 12
            fore.pos.y +=12
            boundList.forEach((boundary)=>{
              boundary.pos.y+=12
            })
            update(reference, { yPos: selfInfo.value.yPos, })
          }}
          else if (keys.down && lastKeyPressed == 'down') {
            for (let i =0; i<boundList.length;i++){
              let predictBndry = {
            pos: {
              x: boundList[i].pos.x ,
              y: boundList[i].pos.y-12,
            },
          }
          if(colliding(player,predictBndry)==true){
            c.fillStyle='rgb(255,0,0,0.2)'
            c.fillRect(predictBndry.pos.x,predictBndry.pos.y,64,64)
            moving=false
            break
          }
            }if(moving==true){
            player.pos.actualY += 12
            background.pos.y -= 12
            fore.pos.y -= 12
            boundList.forEach((boundary)=>{
              boundary.pos.y-=12
            })
            update(reference, { yPos: selfInfo.value.yPos, })
          }}
          else if (keys.left && lastKeyPressed == 'left') {
            for (let i =0; i<boundList.length;i++){
              let predictBndry = {
            pos: {
              x: boundList[i].pos.x+12 ,
              y: boundList[i].pos.y,
            },
          }
          if(colliding(player,predictBndry)==true){
            c.fillStyle='rgb(255,0,0,0.2)'
            c.fillRect(predictBndry.pos.x,predictBndry.pos.y,64,64)
            moving=false
            break
          }
            }if(moving==true){
            player.pos.actualX -= 12
            background.pos.x += 12
            fore.pos.x +=12
            boundList.forEach((boundary)=>{
              boundary.pos.x+=12
            })

            update(reference, { xPos: selfInfo.value.xPos, })
          }}
          else if (keys.right && lastKeyPressed == 'right') {
            for (let i =0; i<boundList.length;i++){
              let predictBndry = {
            pos: {
              x: boundList[i].pos.x-12 ,
              y: boundList[i].pos.y,
            },
          }
          if(colliding(player,predictBndry)==true){
            c.fillStyle='rgb(255,0,0,0.2)'
            c.fillRect(predictBndry.pos.x,predictBndry.pos.y,64,64)
            moving=false
            break
          }
            }
          if(moving==true){
            player.pos.actualX += 12
            background.pos.x -= 12
            fore.pos.x -= 12
            boundList.forEach((boundary)=>{
              boundary.pos.x-=12
            })

            update(reference, { xPos: selfInfo.value.xPos, })}
          }
        }
      }

      animate()
    }

  }
})

function closePopup(){
  showGameSettings.value = false;
}


/* 
function getPosition(){
  get(child(r(getDatabase()), `players/${info.name}`)).then((snapshot) => {
    console.log(snapshot.val())
    playerxPos = snapshot.val().xPos
    playeryPos = snapshot.val().yPos
  })
} */

</script>

<template>
  <main>
    <div class="player-menu">
      <p>Username: {{ info.name }}</p>
      <p>X: {{ playerxPos }}</p>
      <p>Y: {{ playeryPos }}</p>
      <p>Please click "Shift" to access our Game Menu.</p>
      <p>You may also click to update your coordinates.</p>
    </div>
    <div id="canvasBox">
      <canvas width="2225px" height="940">

      </canvas>
    </div>
    <gSet v-if="showGameSettings" @close-popup="closePopup"></gSet>
  </main>
</template>

<style scoped>
p {
  text-align: center;
  font-family: 'VT323', monospace;
}

.player-menu {
  position: absolute;
  top: 20px;
  right: 8vw;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

#canvasBox {
  justify-content: center;
  display: flex;
  opacity: 0.8;
  background-image: url(https://i.pinimg.com/736x/fc/2b/2b/fc2b2b547b98582926b7e7c993987163.jpg);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: -1000;
}

/* canvas {
  border: 5px solid black
} */
</style>