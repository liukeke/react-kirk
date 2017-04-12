import React from 'react';
import utils from '../../public/js/utils.js';
class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return <div>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>;
    }
}
export default Entry;