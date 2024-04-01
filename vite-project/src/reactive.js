import { reactive } from 'vue'

const info = reactive({ 
    inLobby: true,
    name: false, 
    winner: false,
    sprite: false,
  audio: new Audio(`https://vgmtreasurechest.com/soundtracks/omori-original-soundtrack-2020/hkiowwkojq/100.%20Not-So-Empty-House.mp3`)
})

export{
    info
}