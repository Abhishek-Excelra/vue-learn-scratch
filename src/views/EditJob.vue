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
  min-height: 400px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  margin: 2rem 0;
}

.edit-job {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
}

.edit-job__header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
}

.edit-job__header h1 {
  font-size: 2.75rem;
  font-weight: 800;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.edit-job__header p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  font-weight: 400;
}

.edit-job__form {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.form-section {
  border: none;
  padding: 0;
  margin: 0 0 3rem 0;
  position: relative;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.form-section legend {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;
  padding: 0;
  position: relative;
  padding-left: 1rem;
}

.form-section legend::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
  border-radius: 2px;
}

.form-group {
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  letter-spacing: 0.025em;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 200ms ease;
  background-color: #fafbfc;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0f172a;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.1);
  transform: translateY(-1px);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.form-group textarea {
  resize: vertical;
  min-height: 140px;
  line-height: 1.6;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5rem 1.5rem;
  padding-right: 3rem;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 2px solid #f1f5f9;
}

.btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 500ms ease;
}

.btn:hover::before {
  left: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-secondary {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-outline {
  background: transparent;
  color: #64748b;
  border: 2px solid #d1d5db;
}

.btn-outline:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #9ca3af;
  color: #475569;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.btn-primary {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.4);
}

@media (max-width: 768px) {
  .edit-job {
    padding: 1rem 0.5rem 2rem 0.5rem;
  }

  .edit-job__header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .edit-job__header h1 {
    font-size: 2rem;
  }

  .edit-job__form {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .edit-job__form {
    padding: 1.5rem 1rem;
  }

  .form-section legend {
    font-size: 1.25rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.875rem 1rem;
  }
}
</style>
