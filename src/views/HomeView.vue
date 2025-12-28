<script setup>
import { RouterLink } from 'vue-router';
import JobList from '@/components/Jobs/JobList/JobList.vue';
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__content">
      <h1 class="home-hero__title">Find Your Next Vue.js Opportunity</h1>
      <p class="home-hero__subtitle">
        Browse curated Vue.js jobs from top companies. Remote, hybrid, and on-site roles available.
      </p>
      <RouterLink to="/jobs" class="home-hero__cta">Browse Jobs</RouterLink>
    </div>
  </section>

  <JobList :columns="4" />
</template>

<style scoped>
.home-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  padding: 5rem 1.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.home-hero__content {
  max-width: 640px;
  margin: 0 auto;
}

.home-hero__title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.home-hero__subtitle {
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
}

.home-hero__cta {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  background-color: #ffffff;
  text-decoration: none;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.home-hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.home-features {
  padding: 0 1.5rem;
}

.home-features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: box-shadow 160ms ease, transform 160ms ease;
}

.feature-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.feature-card p {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .home-hero {
    padding: 3rem 1rem;
  }

  .home-hero__title {
    font-size: 2rem;
  }

  .home-hero__subtitle {
    font-size: 1rem;
  }
}
</style>
