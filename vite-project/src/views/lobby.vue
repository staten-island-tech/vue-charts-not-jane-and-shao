<template>
    <div v-if="info.name">
        <h5>{{ $route }}</h5>
        <button @click="potato()">eawewa</button>
        <form>
            <button @click.prevent="toast()">host</button>
            <button @click.prevent="showJoin = false; showHost = true">host</button>
            <button @click.prevent="showJoin = true; showHost = false">join</button>
        </form>
    </div>
    <div v-if="showHost" id="joinBox">
        <h1>Host A Game</h1>
        <button v-for="i in ['gameone','gametwo','gamethree']" @click="mode = i">{{ i }}</button>
        <h2>{{ mode }}: {{ rCode.toUpperCase() }}</h2>
        <form>
            <input type="text" v-model="rCode" maxlength="6">
            <button v-if="rCode.length == 6 && mode" id="rl" @click="router.replace({ path: `/${mode}/${rCode.toUpperCase()}/host`, replace: true, testvar: 87 })">test</button><br>
        </form>
    </div>
    <div v-if="showJoin" id="joinBox">
        <h1>Join {{ jCode.toUpperCase() }}</h1>
        <form>
            <input type="text" v-model="jCode" maxlength="6">
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted,onUnmounted,onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { db } from '@/fireSetup'
import { info } from '@/reactive';
import { collection, doc, setDoc, getDoc, onSnapshot, getDocs, deleteDoc  } from "firebase/firestore"; 
const route = useRoute()
const router = useRouter()


console.log(info)
onMounted(async () =>{
    await setDoc(doc(db, "players", name), {
  name: info.name,
});

console.log(name)

window.onbeforeunload = function(event) {
    deleteDoc(doc(db, "players", name))
};


})




let name = route.params.id
let mode = ref('')
let rCode = ref('')
let jCode = ref('')
let showJoin = ref(false)
let showHost = ref(false)

// const pathID = computed(()=>{
//   return `${mode.value}/${rCode.value.toUpperCase()}`
// })

// const hpathID = computed(()=>{
//   return `${mode.value}/${rCode.value.toUpperCase()}/host`
// })
</script>

<style scoped>

#rl{
    background-color: white;
}
#joinBox,#hostBox{
    /* background-image: url(https://i.imgur.com/WItwZfy.png);
    image */
    background-repeat: no-repeat;
    text-align: center;
    border-radius: 10%;
    height: 65vh;
    width:  55vw;
    background-color: teal;
    border: black 2px solid;
     position: absolute;
     top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>