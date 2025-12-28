<script setup>
import { ref } from 'vue'
import JobData from '@/components/Jobs/JobList/jobs.json'
import Card from '@/components/common/Card/Card.vue';
const jobs = ref(JobData.jobs)
</script>

<template>
  <div class="jobs-wrapper">
    <Card class="job-card" v-for="job in jobs" :key="job.id">
      <div>
        <h4>{{ job.title }}</h4>
        <p>{{ job.description }}</p>
        <a class="btn btn-dark" :href="`/job/${job.id}`">Apply</a>
      </div>
    </Card>
  </div>
</template>
<style scoped>
.jobs-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.job-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: box-shadow 160ms ease, transform 160ms ease;
}

.job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.job-card h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
}

.job-card p {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
}

.job-card button {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #0f172a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 160ms ease;
}

.job-card button:hover {
  background-color: #334155;
}
</style>
