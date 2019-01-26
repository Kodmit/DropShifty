import React, { Component } from 'react';

export default class Alert extends Component {

    render() {
        return (
            <div className={'alert alert-' + this.props.type + ' alert-dismissible fade show'} role="alert">
                <p>{this.props.message}</p>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}