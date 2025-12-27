<script setup>
import { ref } from 'vue'

const taskInput = ref('')
const taskList = ref(['111', '222'])
const editingIndex = ref(null)

const addItem = () => {
  if (!taskInput.value.trim()) return

  if (editingIndex.value !== null) {
    taskList.value[editingIndex.value] = taskInput.value
    editingIndex.value = null
  } else {
    taskList.value.push(taskInput.value)
  }

  taskInput.value = ''
}

const deleteItem = (item) => {
  taskList.value = taskList.value.filter(el => el !== item)
}

const updateItem = (task) => {
  editingIndex.value = taskList.value.indexOf(task)
  taskInput.value = task
}
</script>

<template>
  <form @submit.prevent="addItem">
    <input type="text" v-model="taskInput" />
    <button>
      {{ editingIndex !== null ? 'Update' : 'Add' }}
    </button>
  </form>

  <ul>
    <li v-for="(task, index) in taskList" :key="index">
      {{ task }}
      <button @click="deleteItem(task)">Delete</button>
      <button @click="updateItem(task)">Update</button>
    </li>
  </ul>
</template>
