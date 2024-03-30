<template>
    <div>
      <div v-for="players in gameInfo.players">{{ players.name }}: {{ players.points }}</div>
    </div>
    <button v-if="route.params.auth == 'host'" @click.prevent="console.log('close your eyes and youll leave this dream')">OYASUMI</button>
</template>

<script setup>
import { info } from "@/reactive";
import { useRoute } from 'vue-router'
import { ref,onMounted } from "vue";
let potato = ["a","b","c","d"]
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { connectFirestoreEmulator } from "firebase/firestore";
const route = useRoute()
const qt = getDatabase()

const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })

  onMounted(async () =>{
      await get(child(r(getDatabase()), `rooms/${route.params.code}/players/${props.selfNumber}`)).then((snapshot) => {
        if(snapshot.val().choice == props.gameInfo.question.answer){
          update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
            points: props.gameInfo.players[props.selfNumber].points + 1500,
            choice: false
          })
        }
        else{
          update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
            health: 'dead',
            choice: false,
          })
        }
      })
  })

</script>

<style lang="scss" scoped>

</style>