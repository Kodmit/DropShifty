import React, { Component } from 'react';
import $ from "jquery";

export default class Alert extends Component {

    alert = () => {
        $('.alert').fadeOut("slow");
    };

    render() {
        return (
            <div ref="alert" className={'alert alert-' + this.props.type + ' alert-dismissible fade show'} role="alert">
                <p>{this.props.message}</p>
                <button onClick={this.alert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}