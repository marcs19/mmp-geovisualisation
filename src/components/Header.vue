<template>
  <header>
    <br />
    <h1>{{ title }}</h1>
    <h3>Passage search application</h3>
    <br />
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
};
</script>
