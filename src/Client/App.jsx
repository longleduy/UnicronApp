import React, { Fragment, PureComponent, Component } from 'react'
import { withApollo, Query } from "react-apollo"
import Header from './containers/Header.jsx'
import Container from './containers/Container.jsx'
import Footer from './containers/Footer.jsx'
import { withRouter } from 'react-router-dom'
import * as localStateContants from './utils/contant/local_state_contants'
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Query query={localStateContants.QUERY_USER_INFO}>
            {({ loading, error, data }) => {
                return <Fragment>
                    <div className={data.queryUserInfo.isAuthen ? "private" : "main"}>
                        <Header />
                        <Container />
                        {data.queryUserInfo.isAuthen && <Footer />}
                    </div>
                </Fragment>
            }}
        </Query>
    }
}
export default withRouter(withApollo(App));
