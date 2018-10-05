import React, { Fragment, Component } from 'react'
import { withApollo, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import {QUERY_USER_INFO} from '../../contant/local_state_contants'
class NotSignInRoutePRD extends Component{
    constructor(props) {
        super(props); 
    }
    componentWillMount = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let isAuthen = null;
        try {
            isAuthen = userInfo.isAuthen;
        } catch (error) { }
        if(isAuthen){
            this.props.history.push('/index')
        }
    }
    render(){
        return (<Fragment>{this.props.notSignInRoutePRD()}</Fragment>)
    }
}
export default withRouter(withApollo(NotSignInRoutePRD));