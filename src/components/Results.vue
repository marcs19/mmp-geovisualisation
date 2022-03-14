<template>
  <div :key="componentKey" class="container my-4">
    <table>
      <thead>
        <tr>
          <th>Results</th>
          <th>Keyword(s)</th>
          <th>Created (year)</th>
          <th>Author(s)</th>
        </tr>
      </thead>
      <tbody>
        <!--  v-for="result in results.slice(0,20)" limits the search results to 20 -->
        <tr :key="result.id" v-for="result in pageOfItems">
          <td><Result :result="result"> </Result></td>
          <td>
            <a>{{ result.key_word.map((a) => a.stichwort).join(", ") }}</a>
          </td>
          <td>{{ result.text.start_date }}~{{ result.text.end_date }}</td>
          <td>
            <a>{{ result.text.autor.map((a) => a.name).join(", ") }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- I used the jw-vue-pagination plugin for the pagination  -->
    <!-- I could not use the API parameters in my fetch query. This presented an easier and fast way  -->
    <br />
    <jw-pagination
      :items="results"
      :pageSize="Number(value)"
      @changePage="onChangePage"
      :styles="customStyles"
    ></jw-pagination>
    <div>
      <!-- Results per page  -->
      <label>Results per Page:&nbsp;</label>
      <select @change="onchange()" v-model="value" v-if="results.length > 0">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</template>

<script>
import Result from "./Result";

const customStyles = {
  li: {
    display: "inline-block",
  },
};

export default {
  name: "Results",
  data() {
    return {
      pageOfItems: [],
      customStyles,
      value: 5,
      componentKey: 0,
    };
  },
  props: {
    results: Array,
  },
  components: {
    Result,
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    onchange() {
      // To refresh the component
      this.componentKey += 1;
    },
  },
};
</script>