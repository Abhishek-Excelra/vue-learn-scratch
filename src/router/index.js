import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import JobPreview from '@/components/Jobs/JobList/previewJob.vue'
import AddJob from '@/views/AddJob.vue'
import EditJob from '@/views/EditJob.vue'
import NoteFound from '@/views/NoteFound.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/jobs', component: JobsView },
  { path: '/add-job', component: AddJob },
  { path: '/edit-job/:id', component: EditJob, props: true },
  { path: '/job/:id', component: JobPreview, props: true },
  { path: '/:catchAll(.*)', component: NoteFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
