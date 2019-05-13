import React, { Component } from 'react';

class Bsp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wert: "",
        };
    }

    helloWorld = () => {
        this.setState({ wert: "Hallo Welt" });
    }

    render() {
        return (
            <div>
                <Button onClick={this.helloWorld} />
                <input value={this.state.wert} onChange={(e) => this.setState({ wert: e.target.value })} />
                <p>{this.state.input}</p>
            </div>
        );
    }
}

export default Bsp;