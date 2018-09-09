import React, { Fragment, PureComponent, Component } from 'react'
import Header from './containers/Header.jsx'
import Container from './containers/Container.jsx'
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <Header />
                <Container />
            </Fragment>
        )
    }

}
