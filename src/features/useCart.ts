import store from '@/store'
import Book from '@/models/Book'
import { computed } from '@vue/composition-api'
import { totalCost } from '@/services/bookServices'

// Provides cart features
function useCart () {
  function onPickItems (book: Book, nbItem: number) {
    if (nbItem === 0) {
      store.dispatch('removeBook', book)
    } else {
      store.dispatch('pickBook', { book, nbItem })
    }
  }

  const pickedBooks = computed(() => store.state.pickedBooks)
  const pickedBooksCount = computed(() => store.getters.pickedBooksCount)
  const totalAmount = computed(() => totalCost(pickedBooks.value))

  return {
    onPickItems,
    pickedBooks,
    pickedBooksCount,
    totalAmount
  }
}

export default useCart
