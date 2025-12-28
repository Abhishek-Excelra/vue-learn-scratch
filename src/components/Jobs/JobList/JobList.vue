<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Card from '@/components/common/Card/Card.vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const props = defineProps({
  columns: {
    type: Number,
    default: 3
  }
})

const jobs = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get('/api/jobs')
    jobs.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="loader-wrapper">
    <PulseLoader color="#0f172a" size="20px" />
  </div>
  <div v-else class="jobs-wrapper" :style="{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }">
    <Card class="job-card" v-for="job in jobs" :key="job.id">
      <div class="job-card__header">
        <div class="job-card__company">
          <h3 class="job-card__title">{{ job.title }}</h3>
          <p class="job-card__company-name">{{ job.company.name }}</p>
        </div>
        <span class="job-card__type" :class="`job-card__type--${job.type.toLowerCase().replace('-', '')}`">
          {{ job.type }}
        </span>
      </div>

      <div class="job-card__meta">
        <div class="job-card__location">
          <svg class="job-card__icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          {{ job.location }}
        </div>
        <div class="job-card__salary">
          <svg class="job-card__icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
          </svg>
          {{ job.salary }}
        </div>
      </div>

      <p class="job-card__description">
        {{ job.description.substring(0, 150) }}{{ job.description.length > 150 ? '...' : '' }}
      </p>

      <div class="job-card__footer">
        <RouterLink :to="`/job/${job.id}`" class="job-card__apply-btn">
          View Details
        </RouterLink>
      </div>
    </Card>
  </div>
</template>
<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.jobs-wrapper {
  display: grid;
  gap: 1.25rem;
  padding: 0 0.5rem;
}

.job-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  transition: all 200ms ease;
  position: relative;
  overflow: hidden;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0f172a 0%, #334155 100%);
  transform: scaleX(0);
  transition: transform 200ms ease;
}

.job-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.job-card:hover::before {
  transform: scaleX(1);
}

.job-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.job-card__company {
  flex: 1;
  margin-right: 0.75rem;
}

.job-card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.375rem 0;
  line-height: 1.3;
}

.job-card__company-name {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.job-card__type {
  padding: 0.25rem 0.625rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.job-card__type--fulltime {
  background-color: #f0fdf4;
  color: #15803d;
}

.job-card__type--parttime {
  background-color: #fffbeb;
  color: #a16207;
}

.job-card__type--contract {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.job-card__type--internship {
  background-color: #faf5ff;
  color: #7c3aed;
}

.job-card__meta {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.job-card__location,
.job-card__salary {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #475569;
  font-weight: 500;
}

.job-card__icon {
  width: 14px;
  height: 14px;
  margin-right: 0.375rem;
  color: #94a3b8;
}

.job-card__description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.job-card__footer {
  margin-top: auto;
}

.job-card__apply-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 200ms ease;
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.job-card__apply-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 500ms ease;
}

.job-card__apply-btn:hover {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
}

.job-card__apply-btn:hover::before {
  left: 100%;
}

@media (max-width: 1024px) {
  .jobs-wrapper {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .jobs-wrapper {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 0 0.5rem;
  }

  .job-card {
    padding: 1.5rem;
  }

  .job-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .job-card__meta {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .job-card {
    padding: 1.25rem;
  }

  .job-card__title {
    font-size: 1.125rem;
  }
}
</style>
