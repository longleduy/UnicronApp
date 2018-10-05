import React, { Fragment, Component } from 'react'
import { withApollo,Query, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import { signOut } from '../../API_action'
import {errorHandler} from '../../errorHandler'
class MutationPRD extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {mutation} = this.props;
       return <Mutation mutation={mutation} onError={error => errorHandler(this.props.history,error)}>
            {(action,{ loading, error, data }) => {
                return (<Fragment>{this.props.mutationPRD(action,{loading, error, data})}</Fragment>)
            }}
        </Mutation>
    }
}
export default withRouter(withApollo(MutationPRD));