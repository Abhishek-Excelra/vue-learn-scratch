<script>
export default {
  data() {
    return {
      title: 'Vue.Js',
      status: "Inactive",
      tasks: ['task one', 'task two', 'task three'],
      link:"https://google.com"
    }
  }
}
</script>

<template>
  <p>{{ title }}</p>

  <p v-if="status === 'Active'">Active</p>
  <p v-else-if="status === 'Inactive'">Inactive</p>
  <p v-else>Unknown</p>

  <h2>Tasks</h2>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <a :href="link">Google</a>
</template>
