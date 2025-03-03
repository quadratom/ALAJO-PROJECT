<template>
  <li class="py-4 flex justify-between items-center">
    <div>
      <p class="font-bold">{{ transaction.description }}</p>
      <p class="text-sm text-gray-500">
        Amount: {{ transaction.amount }} | Date: {{ new Date(transaction.date).toLocaleString() }}
      </p>
    </div>
    <div class="flex space-x-2">
      <button
        @click="editTransaction"
        class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        @click="deleteTransaction"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['edit', 'delete'])

const editTransaction = () => {
  emit('edit', props.transaction)
}

const deleteTransaction = () => {
  emit('delete', props.transaction._id)
}
</script>
