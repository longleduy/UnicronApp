import React, { Component } from "react";
import { MUTATION_USER_INFO } from "./utils/contant/local_state_contants";
import { resolve } from "url";


export default class ApolloProviderPropsRender extends Component {
    constructor(props) {
        super(props);
    }
    async componentWillMount() {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo.isAuthen) {
                const info = {
                    isAuthen: userInfo.isAuthen,
                    jwt: userInfo.jwt,
                    profile_name: userInfo.profile_name
                }
                return await this.props.client.mutate({
                    variables: { userInfo: info },
                    mutation: MUTATION_USER_INFO
                });

            }
        } catch (error) { }
    }
    render() {
        return (this.props.provider())
    }

}