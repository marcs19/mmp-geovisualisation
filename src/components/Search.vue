<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Search Passage:&nbsp;</label>
      <input
        type="text"
        name="zitat"
        v-model="zitat"
        placeholder="Type passage here"
      />
    </div>
    <br />
    <input
      type="submit"
      value="Start Search"
      class="btn btn-primary btn-block"
      :class="{ 'disabled btn-light': zitat.length === 0 }"
      :disabled="zitat.length === 0"
    />
  </form>
</template>

<script>
export default {
  name: "searchPassage",
  data() {
    return {
      zitat: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const searchZitat = this.zitat;
      this.$emit("search-for", searchZitat);
    },
  },
  emits: ["search-for"],
};
</script>