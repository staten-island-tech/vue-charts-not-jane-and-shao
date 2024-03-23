<template>
    <div>
<p>awesome</p>
    </div>
</template>

<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update   } from "firebase/database";
import { useRoute } from 'vue-router'
const route = useRoute()

const qt = getDatabase()
let reference = r(qt, `rooms/${route.params.code}`);
console.log(reference)

if(route.params.auth == 'host'){
    set(reference, {
      test: "work"
    })

    onDisconnect(reference).remove();
}
</script>

<style lang="scss" scoped>

</style>