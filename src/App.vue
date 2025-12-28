<script setup>
// import OptionsApp from './components/OptionsApp.vue';
// import CompositionAppLong from './components/CompositionAppLong.vue';
// import CompositionAppShort from './components/CompositionAppShort.vue';
// import FormComposition from './components/FormComposition.vue';
// import FormTodoList from './components/FormTodoList.vue';
// import FetchUsers from './components/FetchUsers.vue';
import Navbar from './components/Jobs/Navbar/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <!-- <OptionsApp /> -->
  <!-- <CompositionAppLong /> -->
  <!-- <CompositionAppShort /> -->
  <!-- <FormCompositi con /> -->
  <!-- <FormTodoList /> -->
  <!-- <FetchUsers /> -->
  <!-- <Jobs /> -->
  <Navbar title="Vue related Jobs" />
  <RouterView />
</template>
