<script>
export default {
  data() {
    return {
      title: 'Vue.Js',
      status: "Inactive"
    }
  }
}
</script>

<template>
  <p>{{ title }}</p>

  <p v-if="status==='Active'">Active</p>
  <p v-else-if="status==='Inactive'">Inactive</p>
  <p v-else>Unknown</p>

</template>
