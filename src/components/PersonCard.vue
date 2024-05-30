<script setup>
defineProps({
  person: {
    type: Object,
  }
})
</script>

<template>
  <article 
    class="person-card"
  >
    <div class="person-card__img">
      <img :src="person.image" :alt="person.name" />
    </div>
    <div class="person-card__content">
      <h2>{{ person.name }}</h2>
      <div class="person-card__status">
        <span>{{ person.species }}</span>
        <span>-</span>
        <span>{{ person.status }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.person-card {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  background: rgb(60, 62, 68);
}

.person-card__img {
  display: flex;
}

.person-card__img > img {
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  max-width: 100%;
}

.person-card__content {
  flex: 3 1 0%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.person-card__content h2 {
  color: white;
  margin: 0;
}

.person-card__status {
  display: flex;
  gap: 10px;
  color: rgb(158, 158, 158);
  font-weight: 600;
}

@media (min-width: 1024px) {
  .person-card {
    flex-direction: row;
  }

  .person-card__img > img {
    max-width: 200px;
    border-radius: 16px 0 0 16px;
  }
}
</style>