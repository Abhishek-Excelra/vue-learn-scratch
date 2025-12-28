<script setup>
import JobList from '@/components/Jobs/JobList/JobList.vue';


</script>
<template>
  <h2 class="mt-5 mb-5 bg-dark text-white">Home</h2>
  <div class="home-body">
    <p>This is Job Listing Page </p>
    <p>You will get all the jobs here</p>
    <p> Just click on the job to apply</p>
  </div>
  <JobList />
</template>

<style scoped>
  h2 {
    color: red;
  }
  .home-body {
    background-color: grey;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }
</style>
