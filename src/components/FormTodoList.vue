<script setup>
import { ref } from 'vue';

const newTodo = ref('');
const todos = ref([]);

const addTodo = () => {
    todos.value.push(newTodo.value);
    newTodo.value = '';
}
</script>
<template>
    <form>
        <input type="text" v-model="newTodo" />
        <button @click.prevent="addTodo">Add</button>
    </form>
    <ul>
        <li v-for="todo in todos" :key="todo">{{ todo }}</li>
    </ul>
</template>
