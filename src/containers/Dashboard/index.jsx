import React from 'react'
import ReactDOM from 'react-dom'
import L from 'leaflet'
import PropTypes from 'prop-types'
import Plot from 'react-plotly.js'
import {
    Button,
    Header,
    Pagination,
    Segment
} from 'semantic-ui-react'

import SPECIES_DATA from '../../data/bay_area_mercury_species.json'
import LARGEMOUTH_BASS from '../../images/largemouth_bass.png'
import PACIFIC_STAGHORN_SCULPIN from '../../images/pacific_staghorn_sculpin.png'
import STRIPED_BASS from '../../images/striped_bass.png'
import TOPSMELT from '../../images/topsmelt.png'
import CONFIG from '../../config'

const THRESHOLD_LINES = Object.entries(CONFIG.SPECIES_THRESHOLDS)
    .map(([name, threshold], idx) => ({
        type: 'line',
        x0: idx - 0.5,
        y0: threshold,
        x1: idx + 0.5,
        y1: threshold,
        line: {
            color: 'red',
            width: 4,
            dash: 'dashdot'
        }
    }))

const SPECIES_BAR_DATA = {}
const SPECIES_BOX_DATA = {}

Object
    .entries(SPECIES_DATA)
    .forEach(
        ([year, sp]) => {
            SPECIES_BOX_DATA[year] = Object
                .entries(sp)
                .sort()
                .map(
                    ([name, result]) => ({
                        y: result,
                        type: 'box',
                        name
                    })
                )
        }
    )

Object
    .entries(SPECIES_DATA)
    .forEach(
        ([year, sp]) => {
            SPECIES_BAR_DATA[year] = Object
                .entries(sp)
                .sort()
                .reduce(
                    (data, [name, result]) => {
                        data.x.push(name)
                        data.y.push(result.reduce((r1, r2) => r1 + r2) / result.length)
                        return data
                    },
                    { x: [], y: [], type: 'bar' }
                )
        }
    )

const { START_YEAR, TOTAL_YEARS } = CONFIG
const END_YEAR = START_YEAR + TOTAL_YEARS

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            year: START_YEAR,
            autoPlay: false,
            datarevision: 1
        }
    }

    componentDidMount() {
        this.handleYearChange(null, { activePage: START_YEAR })
    }

    handleYearChange = (e, { activePage }) => {
        if (activePage >= START_YEAR && activePage < END_YEAR) {
            this.props.map.showYear(activePage)
            this.setState(
                (state) => {
                    state.year = activePage
                    state.datarevision++
                    return state
                }
            )
        }
    }

    toggleAutoPlay = () => {
        this.setState((state) => {
            state.autoPlay = !state.autoPlay
            if (state.autoPlay) {
                this.autoPlay = setInterval(
                    () => {
                        let activePage = this.state.year + 1
                        if (activePage === END_YEAR) {
                            activePage = START_YEAR
                        }
                        this.handleYearChange(null, { activePage })
                    },
                    1000
                )
            } else {
                clearInterval(this.autoPlay)
            }
            return state
        })
    }

    render() {
        const { autoPlay, year, datarevision } = this.state

        return ReactDOM.createPortal(
            <Segment basic textAlign="center">
                <Header>Sample Year</Header>
                <Pagination
                    activePage={year}
                    boundaryRange={0}
                    siblingRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    totalPages={END_YEAR + 2}
                    onPageChange={this.handleYearChange}
                />
                <Button
                    primary
                    icon={autoPlay ? 'pause' : 'play'}
                    style={{ marginLeft: 20 }}
                    onClick={this.toggleAutoPlay}
                />
                <Plot
                    data={SPECIES_BOX_DATA[year]}
                    layout={{
                        width: 500,
                        height: 400,
                        datarevision,
                        title: 'Mercury found in species tissues (ug/g ww)',
                        showlegend: false,
                        barmode: 'relative',
                        xaxis: {
                            tickmode: 'array',
                            tickangle: 0,
                            automargin: true,
                            tickvals: [0, 1, 2, 3],
                            ticktext: ['Largemouth Bass', 'Pacific Staghorn Sculpin', 'Striped Bass', 'Top Smelt']
                        },
                        yaxis: {
                            showgrid: false,
                            range: CONFIG.SPECIES_RESULT_RANGE
                        },
                        shapes: [
                            {
                                type: 'rect',
                                layer: 'below',
                                x0: -0.3,
                                y0: 0,
                                x1: 4,
                                y1: 0.15,
                                line: {
                                    width: 0
                                },
                                fillcolor: '#fecc5c',
                                opacity: 0.5
                            },
                            {
                                type: 'rect',
                                layer: 'below',
                                x0: -0.3,
                                y0: 0.15,
                                x1: 4,
                                y1: 0.23,
                                line: {
                                    width: 0
                                },
                                fillcolor: '#fd8d3c',
                                opacity: 0.5
                            },
                            {
                                type: 'rect',
                                layer: 'below',
                                x0: -0.3,
                                y0: 0.23,
                                x1: 4,
                                y1: 0.46,
                                line: {
                                    width: 0
                                },
                                fillcolor: '#f03b20',
                                opacity: 0.5
                            },
                            {
                                type: 'rect',
                                layer: 'below',
                                x0: -0.3,
                                y0: 0.46,
                                x1: 4,
                                y1: 1.5,
                                line: {
                                    width: 0
                                },
                                fillcolor: '#bd0026',
                                opacity: 0.5
                            }
                        ],
                        images: [
                            {
                                source: LARGEMOUTH_BASS,
                                x: 0,
                                y: -0.05,
                                sizex: 0.2,
                                sizey: 0.2
                            },
                            {
                                source: PACIFIC_STAGHORN_SCULPIN,
                                x: 0.3,
                                y: -0.05,
                                sizex: 0.2,
                                sizey: 0.2
                            },
                            {
                                source: STRIPED_BASS,
                                x: 0.55,
                                y: -0.05,
                                sizex: 0.2,
                                sizey: 0.2
                            },
                            {
                                source: TOPSMELT,
                                x: 0.8,
                                y: -0.05,
                                sizex: 0.2,
                                sizey: 0.2
                            }
                        ]
                    }}
                    config={{
                        displayModeBar: false,
                        staticPlot: true
                    }}
                />
            </Segment>,
            document.getElementById('Dashboard')
        )
    }
}

Dashboard.propTypes = {
    map: PropTypes.instanceOf(L.Map).isRequired
}

export default Dashboard
