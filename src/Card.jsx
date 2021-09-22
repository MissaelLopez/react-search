import React, { Component } from 'react'

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    { this.props.skill }
                </div>
                <div className="card-body">
                    <h5 className="card-title">{ this.props.title }</h5>
                    <p className="card-text">{ this.props.tags }</p>
                </div>
            </div>
        )
    }
}
