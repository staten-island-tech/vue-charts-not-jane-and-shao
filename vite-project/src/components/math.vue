<template>
    <div>
     <p>{{gameInfo}}</p>
    </div>
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
let nextState = ref('question')
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })


</script>


<style lang="scss" scoped>

</style>