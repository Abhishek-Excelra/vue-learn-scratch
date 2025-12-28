<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const form = reactive({
  title: '',
  type: 'Full-Time',
  location: '',
  description: '',
  salary: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  }
});

const loading = ref(false);
const submitting = ref(false);
const jobId = route.params.id;

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    Object.assign(form, response.data);
  } catch (error) {
    toast.error('Failed to load job details');
    console.error(error);
    router.push('/jobs');
  } finally {
    loading.value = false;
  }
});

const updateJob = async () => {
  submitting.value = true;
  try {
    await axios.put(`/api/jobs/${jobId}`, form);
    toast.success('Job updated successfully!');
    router.push(`/job/${jobId}`);
  } catch (err) {
    toast.error('Failed to update job. Please try again.');
    console.error(err);
  } finally {
    submitting.value = false;
  }
};

const resetForm = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    Object.assign(form, response.data);
    toast.info('Form reset to original values');
  } catch (error) {
    toast.error('Failed to reset form');
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="edit-job">
    <div class="edit-job__header">
      <h1>Edit Job</h1>
      <p>Update the job details below.</p>
    </div>

    <div v-if="loading" class="loader-wrapper">
      <PulseLoader color="#0f172a" size="20px" />
    </div>

    <form v-else @submit.prevent="updateJob" class="edit-job__form">
      <fieldset class="form-section">
        <legend>Job Details</legend>
        <div class="form-group">
          <label for="title">Job Title *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="e.g. Senior Vue Developer"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="type">Employment Type *</label>
            <select id="type" v-model="form.type" required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="form-group">
            <label for="location">Location *</label>
            <input
              id="location"
              v-model="form.location"
              type="text"
              placeholder="e.g. Boston, MA"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="salary">Salary Range</label>
          <input
            id="salary"
            v-model="form.salary"
            type="text"
            placeholder="e.g. $90K - $100K"
          />
        </div>

        <div class="form-group">
          <label for="description">Job Description *</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="6"
            placeholder="Provide a detailed description of the role..."
            required
          ></textarea>
        </div>
      </fieldset>

      <fieldset class="form-section">
        <legend>Company Information</legend>
        <div class="form-group">
          <label for="companyName">Company Name *</label>
          <input
            id="companyName"
            v-model="form.company.name"
            type="text"
            placeholder="e.g. Acme Corp"
            required
          />
        </div>

        <div class="form-group">
          <label for="companyDescription">Company Description</label>
          <textarea
            id="companyDescription"
            v-model="form.company.description"
            rows="4"
            placeholder="Brief description of the company..."
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="contactEmail">Contact Email *</label>
            <input
              id="contactEmail"
              v-model="form.company.contactEmail"
              type="email"
              placeholder="hr@company.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="contactPhone">Contact Phone</label>
            <input
              id="contactPhone"
              v-model="form.company.contactPhone"
              type="tel"
              placeholder="555-555-5555"
            />
          </div>
        </div>
      </fieldset>

      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn btn-secondary" :disabled="submitting">
          Reset
        </button>
        <button type="button" @click="router.push(`/job/${jobId}`)" class="btn btn-outline">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          <PulseLoader v-if="submitting" color="#ffffff" size="14px" />
          <span v-else>Update Job</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.edit-job {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.edit-job__header {
  text-align: center;
  margin-bottom: 3rem;
}

.edit-job__header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.edit-job__header p {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

.edit-job__form {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.form-section {
  border: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.form-section legend {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0f172a;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e2e8f0;
}

.btn-outline {
  background-color: transparent;
  color: #64748b;
  border: 1px solid #d1d5db;
}

.btn-outline:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #9ca3af;
}

.btn-primary {
  background-color: #0f172a;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #334155;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .edit-job__form {
    padding: 1.5rem;
  }
}
</style>
