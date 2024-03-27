<template>
    <div>
<p>{{ info.name     }}</p>
    </div>
</template>

<script setup>
import { info } from '@/reactive';
import { ref, onMounted } from 'vue'

onMounted(() => {
  console.log('wajio 7 ')
})
</script>

<style scoped>

</style>