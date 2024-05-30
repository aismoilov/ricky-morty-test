<script setup>
import { ref } from 'vue';
import PersonCard from './PersonCard.vue';

const filterOptions = [
  {
    value: 'name',
    text: 'Название',
  },
  {
    value: 'status',
    text: 'Статус',
  },
]

const filterBy = ref('name')
const filterText = ref('')

defineProps({
  persons: {
    type: Array,
  },
  isStart: {
    type: Boolean,
  },
  isEnd: {
    type: Boolean
  }
})

const emit = defineEmits(['filter', 'prevPage', 'nextPage'])

function filterPersons() {
  emit('filter', { filterBy: filterBy.value, filter: filterText.value })
}

</script>

<template>
  <section class="persons-navigation">
    <section class="persons-filters">
      <div class="persons-filters__item">
        <label>Поиск</label>
        <input 
          :value="filterText" 
          placeholder="Поиск" 
          @input="($e) => filterText = $e.target.value"
          />
      </div>
      <div class="persons-filters__item">
        <label>Фильтровать по:</label>
        <select name="sort">
          <option
            v-for="filter in filterOptions"
            :key="filter.value"
            :value="filter.value" 
            :selected="filterBy === filter.value"
            @select="filterBy = filter.value"
          >{{ filter.text }}</option>
        </select>
      </div>
      <button @click="filterPersons">Применить</button>
    </section>
    <section class="persons-pagination">
      <button :disabled="isStart" @click="emit('prevPage')">Пред.</button>
      <button :disabled="isEnd" @click="emit('nextPage')">След.</button>
    </section>
  </section>
  <section class="persons-list">
    <PersonCard 
      v-for="person in persons" 
      :key="person.id"
      :person="person"
    />
  </section>
</template>

<style scoped>
.persons-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.persons-navigation {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
}

.persons-filters {
  display: flex;
  align-items: end;
  gap: 10px;
  flex-wrap: wrap;
}

.persons-filters__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.persons-filters__item > select {
  height: 35px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.persons-filters__item > input {
  height: 31px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

.persons-filters > button {
  border: none;
  background: #005bd0;
  outline: none;
  color: white;
  height: 35px;
  border-radius: 8px;
  padding: 0 20px;
  cursor: pointer;
  width: 100%;
}

.persons-pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.persons-pagination > button {
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
}

.persons-pagination > button:hover {
  opacity: 0.7;
}

.persons-pagination > button[disabled=disabled], 
.persons-pagination > button:disabled {
  color: #ccc;
  cursor: not-allowed;
}


@media (min-width: 1024px) {
  .persons-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  
  .persons-navigation {
    flex-direction: row;
    justify-content: space-between;
  }

  .persons-filters {
    flex: 1;
  }  
  .persons-filters > button {
    flex: 1;
  }

  .persons-pagination {
    flex: 1;
    justify-content: end;
  }
}
</style>