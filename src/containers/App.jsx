import React, { Component } from 'react'
import {
    Button, Header, List, Modal
} from 'semantic-ui-react'

import initMap from './Map'
import Dashboard from './Dashboard'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showInfo: true,
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
                <Modal
                    closeIcon
                    open={this.state.showInfo}
                    onClose={() => this.setState({ showInfo: false })}
                >
                    <Header content='About this visualization' />
                    <Modal.Content>
                        <p>
                            Blah blah blah
                        </p>
                        <p>
                            References:
                            <List ordered>
                                <List.Item>
                                    blah
                                </List.Item>
                                <List.Item>
                                    blah
                                </List.Item>
                                <List.Item>
                                    blah
                                </List.Item>
                            </List>
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={() => this.setState({ showInfo: false })}>
                            Continue
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default App
