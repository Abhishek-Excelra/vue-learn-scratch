<script setup>
import { onMounted, ref } from 'vue'
 const users = ref([])

 onMounted(async()=>{
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  users.value = data.map(el=>el.name)
 })

</script>
<template>
  <h2>Fetch Users Name</h2>
  <ul>
    <li v-for="value in users" :key="value">{{ value }}</li>
  </ul>
</template>

