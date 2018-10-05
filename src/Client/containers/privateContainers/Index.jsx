import React, { Fragment, Component } from 'react'

import IndexForm from '../../forms/privateForm/IndexFrom.jsx'

export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <IndexForm/>
            </Fragment>
        )
    }

}
