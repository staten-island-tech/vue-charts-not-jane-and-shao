<template>
    <div>
        <H1 v-if="1">7</H1>
    </div>
</template>

<script setup>
import { doc, setDoc } from "firebase/firestore"
import { db,app } from '@/fireSetup';
import { ref, onMounted, onUnmounted } from 'vue'
import { info } from "@/reactive";

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()    
const router = useRouter()

let params = route.params
console.log(params)


onMounted(async () =>{
    console.log(route.params.id)
await setDoc(doc(db, route.params.id, info.name), {
  name: info.name,
})

})
//     if(info.name){
//     await setDoc(doc(db, "players", info.name), {
//   name: info.name,
//     })}})


</script>

<style lang="scss" scoped>

</style>