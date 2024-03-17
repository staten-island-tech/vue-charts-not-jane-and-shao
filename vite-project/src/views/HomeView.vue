<script setup>
import { db,app } from '@/fireSetup';
import { ref as r } from "firebase/database"; 
import { ref, computed, onMounted, onUnmounted, onBeforeUnmount  } from 'vue';
import start from '@/components/start.vue';
import { collection, doc, setDoc, getDoc, onSnapshot, getDocs  } from "firebase/firestore"; 
import * as firebase from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged  } from "firebase/auth";
import { info } from '@/reactive';


const provider = new GoogleAuthProvider(app);
let nameList = ref([])
let signIn = ref(false)

const auth = getAuth();


onAuthStateChanged(auth, (user) => {
  if (user) {
  signIn.value = user
  info.token = user.uid
  } else {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    info.token = user.uid
}).catch((error) => {
 console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
}); 


let name = ref('noah')
const pathID = computed(()=>{
  return `/lobby/${info.token}`
})




onMounted(async () =>{
  //   console.log('ea')
  //   const qs = await getDocs(collection(db, 'players')
  // )
// console.log(qs)
// qs.forEach((doc) => {
//   console.log(doc.data().name)
// })


onBeforeUnmount(() => {
  info.name = name.value
})

onSnapshot(collection(db,'players'), qs => {
  qs.forEach((doc) => {
  nameList.value.push(doc.data().name)
})
})
console.log(nameList.value)
})

async function nameTest(){
  const playersRef = collection(db, "players");
  onChildAdded(playersRef, (data) => {
  console.log('ea')
});

  await setDoc(doc(playersRef, "test"), {
    name: "Me", state: "NY"});



// const res = await db.collection('cities').doc('LA').set(data);
//   const docRef = doc(db, "i", "i");
// const docSnap = await getDoc(docRef);
// console.log(docSnap.data())

} 
</script> 


<template>
  <button @click="console.log(info)">test</button>
  <form v-if="signIn">
    <input type="text" v-model="name" maxlength="20">
    <p>Hello There, {{ signIn.displayName }}! </p>
    <RouterLink v-if="name && !nameList.includes(name.toLowerCase())" :to="pathID">noah</RouterLink><br>
  </form>
</template>

<style scoped>
</style>
