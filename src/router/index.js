import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import JobPreview from '@/components/Jobs/JobList/previewJob.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/jobs', component: JobsView },
  { path: '/job/:id', component: JobPreview, props: true },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
