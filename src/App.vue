<template>
  <div id="app" class="container my-4" style="text-align: center">
    <Leaflet></Leaflet>
  </div>
</template>

<script>
import Leaflet from './components/Leaflet';

export default {
  name: 'App',
  components: {
    Leaflet,
  },

  data() {
    return {};
  },
  methods: {},
  // The API data is stored in a seperate results variable
  async created() {},
};
</script>
