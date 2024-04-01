import { reactive } from 'vue'

const info = reactive({ 
    inLobby: true,
    name: false, 
    winner: false,
    sprite: '',
})

export{
    info
}