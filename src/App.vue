<template>
  <div id="app" class="container my-4" style="text-align: center">
    <Search @search-for="searchZitat" />
    <p class="container my-4" v-if="results.length === 0">No results</p>
    <Results :results="results" v-if="results.length > 0" />
    <Leaflet></Leaflet>
  </div>
</template>

<script>
import Search from './components/Search';
import Results from './components/Results';
import Leaflet from './components/Leaflet';

export default {
  name: 'App',
  components: {
    Search,
    Results,
    Leaflet,
  },

  data() {
    return {
      results: [],
      apiResults: [],
    };
  },
  methods: {
    searchZitat(zitat) {
      // I tried to filter the data during the fetching, but it gave me a 400 Error.
      // I also tried a search on the API website which did'nt give any results either
      /*
      // Here my code for the search function outlined in the assessment task:
      const res = await fetch(
        "https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?" +
          new URLSearchParams({
            limit: 20,
            zitat: encodeURIComponent(zitat),
          })
      );
      console.log(res);
      const data = await res.json();
      console.log("SEARCHING...");
      console.log(data.results);
      return data.results;
      */
      // Here the data is filtered based on the input of the user
      this.results = this.apiResults.filter(function (el) {
        return el.zitat.toLowerCase().indexOf(zitat.toLowerCase()) > -1;
      });
    },
    // Unfortunatly searching with parameters didn't work, so I loaded all the data from the API first
    async fetchData() {
      const res = await fetch('https://mmp.acdh-dev.oeaw.ac.at/api/stelle');
      const data = await res.json();
      return data.results;
    },
  },
  // The API data is stored in a seperate results variable
  async created() {
    this.apiResults = await this.fetchData();
  },
};
</script>
