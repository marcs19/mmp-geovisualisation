<template>
  <div>
    <a
      :href="
        result.url.replace('api/stelle', 'archiv/stelle/detail').slice(0, -1)
      "
      target="_blank"
      >{{ result.display_label }}</a
    >
  </div>
</template>

<script>
export default {
  setup() {},
  name: "Result",
  props: {
    result: Object,
  },
};
</script>

<style scope>
td {
  width: 1%;
  border-collapse: collapse;
  border: 1px solid #ced4da;
  background-color: #fff;
  padding: 10px;
}
</style>