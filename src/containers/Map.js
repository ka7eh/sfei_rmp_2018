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
                                radius: 5,
                                color: '#ffffb2',
                                fillColor: '#ffffb2'
                            }
                        } if (result <= 4.37) {
                            return {
                                radius: 10,
                                color: '#fecc5c',
                                fillColor: '#fecc5c'
                            }
                        } if (result <= 11.2) {
                            return {
                                radius: 15,
                                color: '#fd8d3c',
                                fillColor: '#fd8d3c'
                            }
                        } if (result <= 34.16) {
                            return {
                                radius: 20,
                                color: '#f03b20',
                                fillColor: '#f03b20'
                            }
                        }
                        return {
                            radius: 25,
                            color: '#bd0026',
                            fillColor: '#bd0026'
                        }
                    },
                    pointToLayer: (feature, latlng) => L.circleMarker(
                        latlng,
                        {
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        }
                    )
                }
            )
    }

    map.showYear = (year) => {
        layerGroup.clearLayers()
        layerGroup.addLayer(layers[year])
    }

    return map
}
