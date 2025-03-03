<template>
  <div class="mt-6">
    <h2 class="text-xl font-bold mb-4">Transactions</h2>
    <div v-if="transactions && transactions.length">
      <ul class="divide-y divide-gray-200">
        <transaction-item
          v-for="transaction in transactions"
          :key="transaction._id"
          :transaction="transaction"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </ul>
    </div>
    <div v-else>
      <p>No transactions found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import TransactionItem from './TransactionItem.vue'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['edit-transaction', 'delete-transaction'])

const handleEdit = (transaction) => {
  emit('edit-transaction', transaction)
}

const handleDelete = (id) => {
  emit('delete-transaction', id)
}
</script>
