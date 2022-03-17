<template>
  <div>
    <div>
      <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="markerCoord" :icon="icon" />
        <l-rectangle :bounds="rectangle.bounds" :l-style="rectangle.style" />
        <l-geo-json :geojson="geojson" :options-style="spatialStyle" />
      </l-map>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LRectangle, LGeoJson } from 'vue2-leaflet';

export default {
  name: 'GeometryTest',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LRectangle,
    LGeoJson,
  },
  data() {
    return {
      zoom: 4,
      center: [53.1017567989627, 5.9478799299367004],
      geojson: null,
      markerCoord: [1, 1],
      rectangle: {
        bounds: [
          [48.4289313631231, -1.9558074747836995],
          [46.678651824788524, 4.044055024736411],
        ],
        style: { weight: 3, dashArray: '10 10' },
      },
      icon: L.icon({
        iconUrl: './index.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    spatialStyle() {
      return () => ({
        color: '#E53935',
        weight: 5,
        dashArray: '10 10',
      });
    },
  },
  created() {
    fetch('https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/?format=json&id=3')
      .then((res) => res.json())
      .then((jsonRes) => {
        this.geojson = jsonRes;
      });
    fetch('https://mmp.acdh-dev.oeaw.ac.at/api/ort/?format=json&id=3')
      .then((res) => res.json())
      .then((jsonRes) => {
        this.data = jsonRes;
        const coords = this.data.results[0].coords.coordinates;
        console.log(coords);
        this.markerCoord = [coords[1], coords[0]];
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  updated() {
    var svg = document.getElementsByClassName('leaflet-overlay-pane')[0].firstChild,
      // Create filter element
      svgFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter'),
      // Create blur element
      svgBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');

    svgFilter.setAttribute('id', 'blur');

    // Give room to blur to prevent clipping
    svgFilter.setAttribute('x', '-100%');
    svgFilter.setAttribute('y', '-100%');
    svgFilter.setAttribute('width', '500%');
    svgFilter.setAttribute('height', '500%');

    // Set deviation attribute of blur
    svgBlur.setAttribute('stdDeviation', 3);

    // Append blur element to filter element
    svgFilter.appendChild(svgBlur);
    // Append filter element to SVG element
    svg.appendChild(svgFilter);

    for (let i = 0; i < document.getElementsByClassName('leaflet-interactive').length; i++) {
      console.log(document.getElementsByClassName('leaflet-interactive')[i]);
      document.getElementsByClassName('leaflet-interactive')[i].setAttribute('filter', 'url(#blur)');
    }
  },
};
</script>
