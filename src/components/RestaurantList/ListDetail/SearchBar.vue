<template>
  <div class="search-bar">
    <router-link to="/" class="back-button">戻る</router-link>
    <b-form-input type="search"/>
    <router-link to="/RestaurantList/Filtering" class="search-button">絞り込む</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar * {
  margin: 1%;
}

.search-bar input {
  width: 60%;
  border-color: gray;
  border-radius: 5px;
}

.search-bar a {
  padding: 0.5% 1%;
  border-radius: 5px;
}

.back-button {
  color: white;
  background-color: gray;
}

.search-button {
  color: white;
  background-color: #33691e;
}
</style>