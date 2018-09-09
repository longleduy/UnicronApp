import React, { Fragment, PureComponent, Component } from 'react'
import ContainerForm from '../forms/ContainerForm.jsx'
export default class Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <ContainerForm/>
            </Fragment>
        )
    }

}
