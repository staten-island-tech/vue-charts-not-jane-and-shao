<template>
    <div>
<p>{{die}}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
    let i = 0
 let die = ref({
    d1: 0,
    d2: 0,
    d3: 0,
 })

 dUpdate()

 while(i < 3){
    console.log('tes')
 }

 function dUpdate(){
    i++
    setTimeout(increment, 1250);
 }

 function increment(){
    console.log(i)
    die.value[`d${i}`] = 2
    if(i < 3){
        dUpdate()
    }
 }
</script>

<style lang="scss" scoped>

</style>