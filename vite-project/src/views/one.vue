<template>
    <div>
        <H1 v-if="params.mode == 'host'">{{ params.id }}</H1>
    </div>
</template>

<script setup>
import { doc, setDoc } from "firebase/firestore"
import { db,app } from '@/fireSetup';

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

let params = route.params
console.log(params)

</script>

<style lang="scss" scoped>

</style>