import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import SAMPLING_DATA from '../data/bay_area_mercury_samples.json'
import CONFIG from '../config'

const { START_YEAR, TOTAL_YEARS } = CONFIG
const END_YEAR = START_YEAR + TOTAL_YEARS

export default () => {
    const map = L
        .map('Map')
        .setView(
            [37.6403, -122.4165],
            9
        )

    L.Control.Dashboard = L.Control.extend({
        onAdd: () => {
            const container = L.DomUtil.create('div')
            container.id = 'Dashboard'
            L.DomEvent.disableClickPropagation(container)
            L.DomEvent.disableScrollPropagation(container)
            return container
        }
    })

    map.dashboard = new L.Control.Dashboard({ position: 'bottomleft' })
    map.dashboard.addTo(map)

    L
        .tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        )
        .addTo(map)

    L.Control.Legend = L.Control.extend({
        onAdd: () => {
            const container = L.DomUtil.create('div')
            container.id = 'Legend'
            L.DomEvent.disableClickPropagation(container)
            L.DomEvent.disableScrollPropagation(container)
            container.innerHTML = `
                <div>
                    <h4 class="">Measured Mercury (ng/l)</h4>
                    <div class="legend-elements">
                        <div class="legend-row"><span class="symbol" style="background-color: #ffffb2;"></span><label class="">&lt;= 0.011</label></div>
                        <div class="legend-row"><span class="symbol" style="background-color: #fecc5c;"></span><label class="">&lt;= 4.37</label></div>
                        <div class="legend-row"><span class="symbol" style="background-color: #fd8d3c;"></span><label class="">&lt;= 11.2</label></div>
                        <div class="legend-row"><span class="symbol" style="background-color: #f03b20;"></span><label class="">&lt;= 34.16</label></div>
                        <div class="legend-row"><span class="symbol" style="background-color: #bd0026;"></span><label class="">&gt; 34.16</label></div>
                    </div>
                </div>
            `
            return container
        }
    })

    map.legend = new L.Control.Legend({ position: 'bottomright' })
    map.legend.addTo(map)

    const layerGroup = L.layerGroup()
    layerGroup.addTo(map)

    const layers = {}
    for (let year = START_YEAR; year < END_YEAR; year++) {
        layers[year] = L
            .geoJSON(
                SAMPLING_DATA,
                {
                    filter: feature => feature.properties.year === year,
                    style: (feature) => {
                        const { result } = feature.properties
                        if (result <= 0.011) {
                            return {
                                color: '#ffffb2',
                                fillColor: '#ffffb2'
                            }
                        } if (result <= 4.37) {
                            return {
                                color: '#fecc5c',
                                fillColor: '#fecc5c'
                            }
                        } if (result <= 11.2) {
                            return {
                                color: '#fd8d3c',
                                fillColor: '#fd8d3c'
                            }
                        } if (result <= 34.16) {
                            return {
                                color: '#f03b20',
                                fillColor: '#f03b20'
                            }
                        }
                        return {
                            color: '#bd0026',
                            fillColor: '#bd0026'
                        }
                    },
                    pointToLayer: (feature, latlng) => {
                        const marker = L.circleMarker(
                            latlng,
                            {
                                radius: 10,
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                            }
                        )
                        marker.bindPopup(`<p>${feature.properties.result || 0} ng/l</p>`).openPopup()
                        return marker
                    }
                }
            )
    }

    map.showYear = (year) => {
        layerGroup.clearLayers()
        layerGroup.addLayer(layers[year])
    }

    return map
}
