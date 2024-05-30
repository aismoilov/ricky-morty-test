<script setup>
import { onMounted, ref } from 'vue';
import personService from '../api/PersonService';
import PersonsList from '../components/PersonsList.vue';

const persons = ref([])
const currentPage = ref(1)
const pagesCount = ref(1)
const filterBy = ref('')
const filter = ref('')

onMounted(() => {
  getPersons()
})

async function getPersons () {
  const { data, pages } = await personService.getPersons(currentPage.value, filterBy.value, filter.value)
  persons.value = data
  pagesCount.value = pages
  console.log(pagesCount)
}

async function getPrevPage () {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1
    await getPersons()
  }
}

async function getNextPage () {
  if (currentPage.value < pagesCount.value) {
    currentPage.value = currentPage.value + 1
    await getPersons()
  }
}

async function filterPersons(data) {
  currentPage.value = 1
  filterBy.value = data.filterBy
  filter.value = data.filter
  await getPersons()
}

</script>

<template>
  <main class="container">
    <PersonsList 
      :persons="persons"
      :is-start="currentPage === 1"
      :is-end="currentPage === pagesCount"
      @prevPage="getPrevPage"
      @nextPage="getNextPage"
      @filter="filterPersons"
    />
  </main>
</template>

<style scoped>
.container {
  margin: 40px 16px;
}

@media (min-width: 1024px) {
  .container {
    margin: 80px 16px;
  }
}
</style>