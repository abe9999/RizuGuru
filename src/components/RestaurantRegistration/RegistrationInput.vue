<template>
  <input type="text" :placeholder="example" />
</template>

<script>
export default {
  name: 'RegistrationInput',
  props: {
    example: String
  }
}
</script>

<style scoped>
input {
  width: 90%;
  height: 30px;
  padding-left: 8px;
  margin-bottom: 15px;
  border: 1.5px solid gray;
  border-radius: 3px;
}
</style>