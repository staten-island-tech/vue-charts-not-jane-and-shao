<script setup>

import { ref } from 'vue';
 function test(event){
  console.log(event,"hi")
 }
</script>

<template>
  <main>
    <img @keyup="test" src="https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg" ref="image">
  </main>
</template>
