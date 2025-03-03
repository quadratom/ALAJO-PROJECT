<template>
  <div class="bg-white p-6 rounded shadow mt-6">
    <h2 class="text-xl font-bold mb-4">
      {{ editingTransaction ? 'Edit Transaction' : 'Create Transaction' }}
    </h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-1" for="description">Description</label>
        <input
          type="text"
          id="description"
          v-model="form.description"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="amount">Amount</label>
        <input
          type="number"
          id="amount"
          v-model="form.amount"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="date">Date</label>
        <input
          type="datetime-local"
          id="date"
          v-model="form.date"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div class="flex space-x-4">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {{ editingTransaction ? 'Update' : 'Create' }}
        </button>
        <button
          v-if="editingTransaction"
          type="button"
          @click="cancelEdit"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { transactionService } from '../services/transactionService'

const props = defineProps({
  editingTransaction: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['transaction-created', 'cancel-edit'])

const form = ref({
  description: '',
  amount: 0,
  date: '',
})

watch(
  () => props.editingTransaction,
  (newVal) => {
    if (newVal) {
      form.value = {
        description: newVal.description,
        amount: newVal.amount,
        date: newVal.date.slice(0, 16), // Adjust for datetime-local format
      }
    } else {
      form.value = { description: '', amount: 0, date: '' }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  try {
    if (props.editingTransaction) {
      console.log(props)

      await transactionService.update(props.editingTransaction._id, form.value)
    } else {
      await transactionService.create(form.value)
    }
    emit('transaction-created')
    form.value = { description: '', amount: 0, date: '' }
  } catch (error) {
    alert('Error saving transaction: ' + error.message)
  }
}

const cancelEdit = () => {
  emit('cancel-edit')
}
</script>
