<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto">
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </header>

      <!-- Create Transaction Form -->
      <transaction-form
        @transaction-created="handleTransactionCreated"
        :editingTransaction="editingTransaction"
        @cancel-edit="cancelEdit"
      />

      <!-- Filter Section -->
      <div class="mt-6 flex flex-col space-y-4">
        <!-- <input
          type="text"
          v-model="searchTerm"
          placeholder="Search transactions..."
          class="w-full border px-3 py-2 rounded"
          @input="fetchTransactions"
        /> -->
        <input
          type="text"
          v-model="userIdFilter"
          placeholder="Filter by User ID (optional)"
          class="w-full border px-3 py-2 rounded"
          @input="fetchTransactions"
        />
      </div>

      <!-- Transaction List -->
      <transaction-list
        :transactions="transactions"
        @edit-transaction="handleEdit"
        @delete-transaction="handleDelete"
      />

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-center items-center space-x-4">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="page === totalPages"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'
import { transactionService } from '../services/transactionService'
import { useUserStore } from './../stores'
import { useRouter } from 'vue-router'
import { socket } from '../services/socketService'

const transactions = ref([])
const searchTerm = ref('')
const userIdFilter = ref('')
const page = ref(1)
const limit = ref(10)
const totalPages = ref(1)
const editingTransaction = ref(null)
const router = useRouter()
const userStore = useUserStore()

const fetchTransactions = async () => {
  try {
    const params = {
      search: searchTerm.value || undefined,
      userId: userIdFilter.value || undefined,
      page: page.value,
      limit: limit.value,
    }
    const { data } = await transactionService.getAll(params)
    transactions.value = data.data
    totalPages.value = data.totalPages

    socket.on('transactionUpdated', (data) => {
      console.log('transactionUpdated event received:', data)
      // Optionally, you can update a specific transaction in the list.
      // For simplicity, we re-fetch the transaction list:
      fetchTransactions()
    })
  } catch (error: any) {
    alert('Error fetching transactions: ' + error.message)
  }
}

const handleEdit = (transaction: any) => {
  editingTransaction.value = transaction
}

const cancelEdit = () => {
  editingTransaction.value = null
  fetchTransactions()
}

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this transaction?')) {
    try {
      await transactionService.delete(id)
      fetchTransactions()
    } catch (error: any) {
      alert('Error deleting transaction: ' + error.message)
    }
  }
}

const handleTransactionCreated = () => {
  page.value = 1 // Reset to first page on new transaction
  fetchTransactions()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchTransactions()
  }
}

const nextPage = () => {
  page.value++
  fetchTransactions()
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}

onMounted(fetchTransactions)

// Reset to first page when filter changes
watch([searchTerm, userIdFilter], () => {
  page.value = 1
  fetchTransactions()
})
</script>
