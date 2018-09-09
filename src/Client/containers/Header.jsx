import React, { Fragment, PureComponent, Component } from 'react'
import HeaderForm from '../forms/HeaderForm.jsx'
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <HeaderForm/>
            </Fragment>
        )
    }

}
