import ReactMapGL from "react-map-gl";
import maplibregl from "maplibre-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {

const [jsonData, setJsonData] = useState([])

  useEffect(() => {
    const data = require("../../data/N02-20_RailroadSection.json");
    setJsonData(data.features);
  }, []);

  const [viewState, setViewState] = useState({
    longitude: 139.7671365841117,
    latitude: 35.68143950212949,
    zoom: 15,
  });

  const geoJsonLayer = new GeoJsonLayer({
    id: "geojson",
    data: jsonData,
    lineWidthUnits: 'pixels',
    getLineWidth: (data) => {
      if (data.properties.N02_003) {
        const n02_003 = data.properties.N02_003
        const lastThreeWord = n02_003.slice(-3)

        if (lastThreeWord === '新幹線') {
          return 4
        } else {
          return 2
        }

      } else {
        return 0
      }
    },
    getLineColor: (data) => {
      if (data.properties) {
        switch (data.properties.N02_004) {
          case "北海道旅客鉄道":
            return [3, 193, 61, 224];
            break;
          case "東日本旅客鉄道":
            return [55, 134, 64, 224];
            break;
          case "東海旅客鉄道":
            return [255, 126, 28, 224];
            break;
          case "西日本旅客鉄道":
            return [0, 114, 186, 224];
            break;
          case "四国旅客鉄道":
            return [0, 172, 209, 224];
            break;
          case "九州旅客鉄道":
            return [246, 46, 54, 225];
            break;
          default:
            return [0, 0, 0, 0];
            break;
        }
      } else {
        return [0, 0, 0, 0];
      }
    },
  });

  return (
    <DeckGL
      initialViewState={viewState}
      layers={[geoJsonLayer]}
      style={{ width: "100vw", height: "100vh" }}
      controller={true}
      onViewStateChange={(event) => setViewState(event.viewState)}
    >
      <ReactMapGL mapStyle={process.env.MAP_URL} mapLib={maplibregl} />
    </DeckGL>
  );
};

export default Map;