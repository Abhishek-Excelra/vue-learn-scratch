<script setup>
import { ref } from 'vue';
import JobData from '@/components/Jobs/JobList/jobs.json';
import Card from '@/components/common/Card/Card.vue';

const props = defineProps({
  id: String
});

const job = ref(JobData.jobs.find(j => j.id === props.id));
</script>
<template>
  <div v-if="job">
    <Card>
      <h2 class="font-bold">Apply for {{ job.title }}</h2>
      <p>Job Description :: {{ job.description }}</p>
      <button>Apply</button>
    </Card>
  </div>
</template>
