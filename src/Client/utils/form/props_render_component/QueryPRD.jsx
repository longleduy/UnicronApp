import React, { Fragment, Component } from 'react'
import { withApollo, Query, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import { signOut } from '../../API_action'
import { errorHandler2 } from '../../errorHandler'
class QueryPRD extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { query,client,history,variables,pollInterval} = this.props;
        return <Query query={query} variables={variables} pollInterval={pollInterval ?pollInterval:null} fetchPolicy={"network-only"} onError={(error) => {errorHandler2(error,client,history)}}>
            {({ loading, error, data }) => {
                return (<Fragment>{this.props.queryPRD({ loading, error, data })}</Fragment>)
            }}
        </Query>
    }
}
export default withRouter(withApollo(QueryPRD));