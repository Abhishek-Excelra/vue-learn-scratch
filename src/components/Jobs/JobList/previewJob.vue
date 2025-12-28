<script setup>
import Card from '@/components/common/Card/Card.vue';

</script>
<template>
  <Card>
    <h2 class="font-bold">Apply for {{ job.title }}</h2>
    <p>Job Description :: {{ job.description }}</p>
    <button>Apply</button>
  </Card>
</template>
