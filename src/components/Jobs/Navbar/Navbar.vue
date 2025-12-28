<script setup>
  import { ref } from 'vue';
  import { defineProps } from 'vue';
  import './Navbar.css'

  defineProps({
    title: String,
  })
  const navLinks = ref([
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'About', path: '/about' },
  ])
</script>
<template>
  <nav class="navbar">
    <h1 class="navbar__title">{{ title }}</h1>
    <ul class="navbar__links">
     <li class="navbar__item" v-for="value in navLinks" :key="value.name">
      <a class="navbar__link" :href="value.path">{{ value.name }}</a>
     </li>
    </ul>
  </nav>
</template>
