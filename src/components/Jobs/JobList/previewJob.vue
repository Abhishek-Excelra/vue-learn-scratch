<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
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
    toast.success('Job deleted successfully!');
    router.push('/jobs');
  } catch (error) {
    toast.error('Failed to delete job. Please try again.');
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
    <!-- Back Button -->
    <button class="job-detail__back" @click="goBack">← Back</button>

    <!-- Job Header -->
    <div class="job-detail__header">
      <div class="job-detail__title-section">
        <h1 class="job-detail__title">{{ job.title }}</h1>
        <p class="job-detail__company-name">{{ job.company.name }}</p>
      </div>

      <div class="job-detail__meta">
        <span class="meta-badge">{{ job.type }}</span>
        <span class="meta-badge">📍 {{ job.location }}</span>
        <span class="meta-badge">💰 {{ job.salary }}</span>
      </div>

      <div class="job-detail__actions">
        <RouterLink :to="`/edit-job/${props.id}`" class="btn btn--edit">Edit</RouterLink>
        <RouterLink to="/jobs" class="btn btn--apply">Apply</RouterLink>
        <button @click="deleteJob" class="btn btn--delete" :disabled="deleting">
          <PulseLoader v-if="deleting" color="#ffffff" size="12px" />
          <span v-else>Delete</span>
        </button>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="job-detail__grid">
      <div class="job-detail__description">
        <h2 class="section-title">Description</h2>
        <p class="job-detail__text">{{ job.description }}</p>
      </div>

      <div class="job-detail__company">
        <h2 class="section-title">Company</h2>
        <h3 class="company-name">{{ job.company.name }}</h3>
        <p class="company-description">{{ job.company.description }}</p>

        <div class="contact-info">
          <p><strong>Email:</strong> {{ job.company.contactEmail }}</p>
          <p><strong>Phone:</strong> {{ job.company.contactPhone }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="not-found">
    <h2>Job not found</h2>
    <RouterLink to="/jobs" class="btn btn--apply">Browse Jobs</RouterLink>
  </div>
</template>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.job-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.job-detail__back {
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: color 200ms ease;
}

.job-detail__back:hover {
  color: #0f172a;
}

.job-detail__header {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 2rem;
  margin-bottom: 2rem;
}

.job-detail__title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.job-detail__company-name {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.job-detail__meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.meta-badge {
  padding: 0.5rem 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  font-size: 0.85rem;
  font-weight: 500;
  color: #475569;
}

.job-detail__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
  min-width: 100px;
  text-align: center;
}

.btn--edit {
  background: #059669;
  color: #ffffff;
}

.btn--edit:hover {
  background: #047857;
}

.btn--apply {
  background: #0f172a;
  color: #ffffff;
}

.btn--apply:hover {
  background: #1e293b;
}

.btn--delete {
  background: #dc2626;
  color: #ffffff;
}

.btn--delete:hover:not(:disabled) {
  background: #b91c1c;
}

.btn--delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.job-detail__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.job-detail__description,
.job-detail__company {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1rem 0;
}

.job-detail__text {
  font-size: 1rem;
  color: #475569;
  line-height: 1.7;
  margin: 0;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

.company-description {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.contact-info {
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.contact-info p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.5rem 0;
}

.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.not-found h2 {
  color: #1e293b;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .job-detail__grid {
    grid-template-columns: 1fr;
  }

  .job-detail__actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
