<template>
    <div>
        <p>{{gameInfo.question.prompt.toUpperCase()}}</p>
          <!-- <p>{{gameInfo.question.a}}</p>
          <p>{{gameInfo.question.b}}</p>
          <p>{{gameInfo.question.c}}</p>
          <p>{{gameInfo.question.d}}</p> -->
        <button v-for="i in potato" @click.prevent="choice(i)">{{gameInfo.question[i]}}</button>
    </div>
</template>

<script setup>
import { info } from "@/reactive";
import { useRoute } from 'vue-router'
import { ref,onMounted } from "vue";
let potato = ["a","b","c","d"]
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
const route = useRoute()
const qt = getDatabase()


function choice(choice){
  console.log(choice)
}

const props = defineProps({
        gameInfo: Object,
    })

async function getQuestionInfo(){
  if(route.params.auth = 'host'){
    let num = Math.floor((Math.random() * 23)); 
  try{
  const response = await fetch(`https://theone-hofj.onrender.com/gp/${num}`)
  const data = await response.json(); 
  console.log(data) 
  update(r(qt, `rooms/${route.params.code}/question`), {
     prompt: data.question,
     a: data.a,
     b: data.b,
     c: data.c,
     d: data.d,
     answer: data.answer,
  });

}
catch(error){
  console.log(error)
}
}
}
    onMounted(() => {
  console.log('ea')
  getQuestionInfo()
})
</script>

<style lang="scss" scoped>

</style>