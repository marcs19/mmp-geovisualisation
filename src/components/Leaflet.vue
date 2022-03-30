<template>
  <div>
    <div>
      <l-map ref="map" :zoom="zoom" :center="center" style="height: 95%; width: 100%; position: absolute">
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker v-for="place in places" :key="place.id" :lat-lng="place.coords">
          <l-icon :iconSize="[32, 37]" :iconAnchor="[16, 37]" :icon-url="place.iconUrl" />
        </l-marker>
      </l-map>
      <a href="https://github.com/marcs19/mmp-geovisualisation" target="_blank" style="z-index: 400; left: 50%; bottom: 2%; position: absolute"> Link to github repo </a>
    </div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import 'leaflet-pixi-overlay';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import burgIcon from '/src/assets/burg.png';
import cityIcon from '/src/assets/city.svg';

export default {
  name: 'GeometryTest',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  data() {
    return {
      zoom: 4,
      center: [53.101, 5.947],
      geojson: null,
      map: L.map,
      places: [],
      icon: new L.icon({}),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  methods: {
    draw(coordinates, fuzzyness) {
      let sortedCoords = [];
      for (let i of coordinates) {
        sortedCoords.push([i[1], i[0]]);
      }
      var projectedPolygon;
      var polygon = new PIXI.Graphics();
      var blurFilter = new PIXI.filters.BlurFilter();
      polygon.filters = [blurFilter];

      //blurFilter.blurX = 20;
      //blurFilter.blurY = 20;

      var pixiContainer = new PIXI.Container();
      pixiContainer.addChild(polygon);

      var firstDraw = true;
      var prevZoom;

      var pixiOverlay = L.pixiOverlay(function (utils) {
        var zoom = utils.getMap().getZoom();
        var container = utils.getContainer();
        var renderer = utils.getRenderer();
        var project = utils.latLngToLayerPoint;
        var scale = utils.getScale();
        blurFilter.blur = fuzzyness * 20 * scale;

        if (firstDraw) {
          projectedPolygon = sortedCoords.map(function (coords) {
            return project(coords);
          });
        }
        if (firstDraw || prevZoom !== zoom) {
          polygon.clear();
          polygon.lineStyle(0, 0, 0);
          polygon.beginFill(0x0000ff, 0.5);

          projectedPolygon.forEach(function (coords, index) {
            if (index == 0) polygon.moveTo(coords.x, coords.y);
            else polygon.lineTo(coords.x, coords.y);
          });
          polygon.endFill();
        }
        firstDraw = false;
        prevZoom = zoom;
        renderer.render(container);
      }, pixiContainer);
      pixiOverlay.addTo(this.$refs.map.mapObject);
    },
  },
  created() {
    const polyArray = [1, 2, 5, 6, 7];
    for (let j of polyArray) {
      const polygonAddress = `https://mmp.acdh-dev.oeaw.ac.at/api/spatialcoverage/?format=json&id=${j}`;
      fetch(polygonAddress)
        .then((res) => res.json())
        .then((jsonRes) => {
          this.draw(jsonRes.features[0].geometry.coordinates[0], jsonRes.features[0].properties.fuzzyness);
        });
    }

    const testArray = [3, 4, 5, 6];
    for (let j of testArray) {
      const address = `https://mmp.acdh-dev.oeaw.ac.at/api/ort/?format=json&id=${j}`;
      fetch(address)
        .then((res) => res.json())
        .then((jsonRes) => {
          this.data = jsonRes;
          const coords = this.data.results[0].coords.coordinates;
          let place = {};
          place.id = j;
          place.coords = [coords[1], coords[0]];
          if ([3, 6].includes(j)) {
            place.iconUrl = cityIcon;
          } else {
            place.iconUrl = burgIcon;
          }
          this.places.push(place);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
};
</script>
