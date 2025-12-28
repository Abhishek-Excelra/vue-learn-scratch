<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Card from '@/components/common/Card/Card.vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const props = defineProps({
  id: String
});

const router = useRouter();
const toast = useToast();

const job = ref(null);
const loading = ref(true);
const deleting = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${props.id}`)
    job.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const goBack = () => window.history.back();

const deleteJob = async () => {
  if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
    return;
  }

  deleting.value = true;
  try {
    await axios.delete(`/api/jobs/${props.id}`);
    toast.success('Job deleted successfully!'); // TODO: uncomment after npm install
    router.push('/jobs');
  } catch (error) {
    toast.error('Failed to delete job. Please try again.'); // TODO: uncomment after npm install
    console.error(error);
  } finally {
    deleting.value = false;
  }
};
</script>
<template>
  <div v-if="loading" class="loader-wrapper">
    <PulseLoader color="#0f172a" size="20px" />
  </div>
  <div v-else-if="job" class="job-detail">
    <button class="job-detail__back" @click="goBack">← Back to Jobs</button>

    <Card class="job-detail__header">
      <div class="job-detail__header-main">
        <h1 class="job-detail__title">{{ job.title }}</h1>
        <div class="job-detail__meta">
          <span class="job-detail__type">{{ job.type }}</span>
          <span class="job-detail__location">📍 {{ job.location }}</span>
          <span class="job-detail__salary">💰 {{ job.salary }}</span>
        </div>
      </div>
      <div class="job-detail__actions">
        <RouterLink :to="`/edit-job/${props.id}`" class="job-detail__edit-btn">Edit Job</RouterLink>
        <RouterLink to="/jobs" class="job-detail__apply-btn">Apply Now</RouterLink>
        <button
          @click="deleteJob"
          class="job-detail__delete-btn"
          :disabled="deleting"
        >
          <PulseLoader v-if="deleting" color="#ffffff" size="14px" />
          <span v-else>Delete Job</span>
        </button>
      </div>
    </Card>

    <div class="job-detail__content">
      <Card class="job-detail__description">
        <h2 class="job-detail__section-title">Job Description</h2>
        <p class="job-detail__text">{{ job.description }}</p>
      </Card>

      <Card class="job-detail__company">
        <h2 class="job-detail__section-title">Company</h2>
        <h3 class="job-detail__company-name">{{ job.company.name }}</h3>
        <p class="job-detail__text">{{ job.company.description }}</p>
        <div class="job-detail__contact">
          <p><strong>Email:</strong> {{ job.company.contactEmail }}</p>
          <p><strong>Phone:</strong> {{ job.company.contactPhone }}</p>
        </div>
      </Card>
    </div>
  </div>
  <div v-else class="job-detail__not-found">
    <h2>Job not found</h2>
    <RouterLink to="/jobs" class="job-detail__apply-btn">Browse Jobs</RouterLink>
  </div>
</template>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.job-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.job-detail__back {
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.95rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: color 160ms ease;
}

.job-detail__back:hover {
  color: #0f172a;
}

.job-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
}

.job-detail__header-main {
  flex: 1;
}

.job-detail__title {
  font-size: 2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.job-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.job-detail__type,
.job-detail__location,
.job-detail__salary {
  padding: 0.375rem 0.75rem;
  background-color: #f1f5f9;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.job-detail__actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.job-detail__edit-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #059669;
  color: #ffffff;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.job-detail__edit-btn:hover {
  background-color: #047857;
  transform: translateY(-1px);
}

.job-detail__apply-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #0f172a;
  color: #ffffff;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.job-detail__apply-btn:hover {
  background-color: #334155;
  transform: translateY(-1px);
}

.job-detail__delete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #dc2626;
  color: #ffffff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;
  min-width: 120px;
}

.job-detail__delete-btn:hover:not(:disabled) {
  background-color: #b91c1c;
  transform: translateY(-1px);
}

.job-detail__delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.job-detail__content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2rem;
}

.job-detail__description,
.job-detail__company {
  padding: 2rem;
}

.job-detail__section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
}

.job-detail__text {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
}

.job-detail__company-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.job-detail__contact {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.job-detail__contact p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0;
}

.job-detail__not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.job-detail__not-found h2 {
  color: #1e293b;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .job-detail__header {
    flex-direction: column;
    align-items: stretch;
  }

  .job-detail__content {
    grid-template-columns: 1fr;
  }

  .job-detail__title {
    font-size: 1.5rem;
  }

  .job-detail__meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
