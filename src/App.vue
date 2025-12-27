<script>
export default {
  data() {
    return {
      title: 'Vue.Js',
      status: true
    }
  }
}
</script>

<template>
  <p>{{ title }}</p>

  <p v-if="status">Active</p>
  <p v-else>Inactive</p>

</template>
