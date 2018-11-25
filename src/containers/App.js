import React, { Component } from 'react'

import initMap from './Map'
import Dashboard from './Dashboard'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isMapReady: false
        }
    }
    componentDidMount() {
        this.map = initMap()
        this.setState({ isMapReady: true })
    }

    render() {
        return (
            <React.Fragment>
                <div id="Map" />
                {this.state.isMapReady ? <Dashboard map={this.map} /> : null}
            </React.Fragment>
        )
    }
}

export default App
