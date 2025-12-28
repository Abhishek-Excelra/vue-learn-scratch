<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = useRouter();

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
const error = ref('');

const submitJob = async () => {
  loading.value = true;
  error.value = '';
  try {
    await axios.post('/api/jobs', form);
    router.push('/jobs');
  } catch (err) {
    error.value = 'Failed to create job. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  Object.assign(form, {
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
  error.value = '';
};
</script>

<template>
  <div class="add-job">
    <div class="add-job__header">
      <h1>Add a New Job</h1>
      <p>Fill in the details below to post a new job listing.</p>
    </div>

    <form @submit.prevent="submitJob" class="add-job__form">
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

      <div v-if="error" class="form-error">{{ error }}</div>

      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn btn-secondary">Reset</button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <PulseLoader v-if="loading" color="#ffffff" size="14px" />
          <span v-else>Post Job</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-job {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.add-job__header {
  text-align: center;
  margin-bottom: 3rem;
}

.add-job__header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.add-job__header p {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
}

.add-job__form {
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

.form-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
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

  .add-job__form {
    padding: 1.5rem;
  }
}
</style>
