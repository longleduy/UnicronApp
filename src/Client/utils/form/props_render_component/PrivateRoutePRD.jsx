import React, { Fragment, Component } from 'react'
import gql from 'graphql-tag'
import { withApollo, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import {signOut} from '../../API_action'
import {QUERY_USER_INFO,MUTATION_USER_INFO} from '../../contant/local_state_contants'
class PrivateRoutePRD extends Component{
    constructor(props) {
        super(props); 
    }
    // componentWillMount = async () => {  
    //     this.setTitle(); 
    //     const result = await this.props.client.query({
    //         query: QUERY_USER_INFO
    //     })
    //     const {isAuthen} = result.data.queryUserInfo;
    //     if(!isAuthen){
    //         this.props.history.push('/sign-in')
    //     }
    // }
    componentDidMount = () => {
        $(window).scrollTop(0);
    }
    setTitle = () => {
        let title = 'Unicron'
        try {
            if(typeof(this.props.title) != 'undefined' ){
                title = this.props.title
            }
        } catch (error) {}
        document.title = title
    }
    render(){
        return (<Fragment>{this.props.privateRoutePRD()}</Fragment>)
    }
}
export default withRouter(withApollo(PrivateRoutePRD));