import React, { Component } from 'react'
import {
    Button, Header, Image, List, Modal
} from 'semantic-ui-react'

import OSPREY from '../images/osprey.png'
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
                {this.state.isMapReady ?
                    (
                        <Dashboard
                            map={this.map}
                            showInfo={() => this.setState({ showInfo: true })}
                        />
                    ) :
                    null
                }
                <Modal
                    id="Info"
                    closeIcon
                    open={this.state.showInfo}
                    onClose={() => this.setState({ showInfo: false })}
                >
                    <Header content="Mercury in the San Francisco Bay" />
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <p>
                                San Francisco Bay-area sediments and waterways have unusually high levels of mercury.  Much of this is residue from the gold mining activities of the late 19th century, but new mercury enters waterways each year from industrial and municipal wastewater discharge.
                                Fish living in contaminated waterways accumulate organic mercury in their bodies.  When these fish are eaten, the mercury passes up the food chain, harming the human or animal that consumed the fish.  Inside the body, too much mercury can poison the kidneys, lungs, and nervous system.  Fetuses are especially vulnerable to mercury poisoning.  When an expectant mother consumes too much mercury-contaminated food, her developing fetus can suffer brain damage, hearing, and vision problems.
                            </p>
                            <h3>The data</h3>
                            <p>
                                This tool shows two data measurements in relation to one another:  Mercury content of water samples, and average organic mercury content found in the tissues of four common fish species in the San Francisco Bay area.   The data spans the years from 1994 to 2017.
                                Purple dots on the map of San Francisco represent individual water samples tested in a given year.  The darker the dot, the higher the mercury content of the sample.  You can click on any individual dot to view the exact measurement.
                                The chart inset in the lower left shows the range of organic mercury levels found in each fish species during that year, represented on top of a gradient of safety thresholds for consuming those fish.
                            </p>
                            <h3>How to use this tool</h3>
                            <p>
                                To look at the data for a single year, select that year of interest using control buttons in the left side panel.
                                To auto-play the annual data sequentially, press the &quot;play&quot; button.
                            </p>
                            <h3>Food for thought (and for sea birds)</h3>
                            <p>
                                The four thresholds represented behind the fish data are set by the U.S. Food and Drug administration, and represent danger levels for pregnant mothers who might eat fish. Measurements in the lowest (yellow) range indicate that the fish are safe to eat up to three times a week.  The second range indicates that they are safe to eat up to two times per week.  Fish in the third range should not be eaten more than once per week, and anything in the high (red) range is unsafe to eat in any quantity.
                                Humans are generally able to select alternative foods when certain options are unsafe.  In fact, local governments issue advisories when they determine that residents should avoid locally-caught fish.  Wildlife living on a fish diet in the San Francisco Bay area, however, do not have alternative food options.  If their primary food source contains unsafe mercury levels, it can negatively affect entire generations of offspring, weakening the local ecological fabric.
                                In November 2007, the California State Water Resources Control Board and the U.S. Environmental Protection Agency approved a mercury mitigation plan for the Bay Area watershed.  The following year the State began large-scale efforts to remove mercury from contaminated sites and to impose limits on the release of mercury from industrial and municipal wastewater systems.  Even with these initiatives, it will take at least 70 years before the Bay Area watershed returns to safe mercury levels.
                            </p>
                            <h3>
                                References
                            </h3>
                            <List ordered>
                                <List.Item>
                                    San Francisco Estuary Institute. (2018).
                                    Contaminant Data Display &amp; Download.
                                    Retrieved November 30, 2018, from <a href="https://cd3.sfei.org/downloads/" target="_blank" rel="noopener noreferrer">https://cd3.sfei.org/downloads/</a>
                                </List.Item>
                                <List.Item>
                                    US EPA. (n.d.). EPA-FDA Fish Advice: Technical Information | Advisories
                                    and Technical Resources for Fish and Shellfish Consumption.
                                    Retrieved November 30, 2018, from <a href="https://www.epa.gov/fish-tech/epa-fda-fish-advice-technical-information" target="_blank" rel="noopener noreferrer">https://www.epa.gov/fish-tech/epa-fda-fish-advice-technical-information</a>
                                </List.Item>
                                <List.Item>
                                    SFGate. (2007, July 19). 70-year mercury cleanup plan OK’d for S.F. Bay.
                                    Retrieved November 30, 2018, from <a href="https://www.sfgate.com/bayarea/article/SAN-FRANCISCO-70-year-mercury-cleanup-plan-OK-d-2580647.php" target="_blank" rel="noopener noreferrer">https://www.sfgate.com/bayarea/article/SAN-FRANCISCO-70-year-mercury-cleanup-plan-OK-d-2580647.php</a>
                                </List.Item>
                                <List.Item>
                                    World Health Organization. (2017, March 3). Mercury and health.
                                    Retrieved November 30, 2018, from <a href="http://www.who.int/news-room/fact-sheets/detail/mercury-and-health" target="_blank" rel="noopener noreferrer">http://www.who.int/news-room/fact-sheets/detail/mercury-and-health</a>
                                </List.Item>
                            </List>
                            <h3>Credit</h3>
                            <List horizontal bulleted>
                                <List.Item>
                                    <b>Created by:</b>
                                </List.Item>
                                <List.Item>
                                    <a href="mailto:kaveh.ka@gmail.com">Kaveh Karimi Asli</a>
                                </List.Item>
                                <List.Item>
                                    Froggi VanRiper
                                </List.Item>
                            </List>
                            <p style={{ marginBottom: 20 }}>
                                The code and processed data for this visualization is available
                                at <a href="https://github.com/ka7eh/sfei_rmp_2018" target="_blank" rel="noopener noreferrer">https://github.com/ka7eh/sfei_rmp_2018</a>
                            </p>
                        </Modal.Description>
                        <Image
                            src={OSPREY}
                            size="small"
                            wrapped
                            style={{
                                position: 'absolute',
                                right: 30
                            }}
                        />
                    </Modal.Content>
                    <Modal.Actions>

                        <Button
                            style={{
                                background: '#6e016b',
                                color: '#fff'
                            }}
                            onClick={() => this.setState({ showInfo: false })}
                        >
                            Continue
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default App
