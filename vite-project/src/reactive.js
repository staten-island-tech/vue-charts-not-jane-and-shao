import { reactive } from 'vue'

const info = reactive({ 
    inLobby: true,
    name: false, 
    winner: false,
})

export{
    info
}