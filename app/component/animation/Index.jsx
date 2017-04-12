import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Entry = React.createClass({
    getInitialState() {
        return {
            show: true
        };
    },
    onClick() {
        this.setState({
            show: !this.state.show
        });
    },
    render() {
        return (
            <div className="queue-demo">
                <p className="buttons">
                    <a type="primary" onClick={this.onClick}>切换</a>
                </p>
                <QueueAnim className="demo-content">
                    {this.state.show ? [
                        <div className="demo-thead" key="a">
                            <ul>
                                <li>1111</li>
                                <li>1111</li>
                                <li>1111</li>
                            </ul>
                        </div>,
                        <div className="demo-tbody" key="b">
                            <ul>
                                <li>2222</li>
                                <li>2222</li>
                                <li>2222</li>
                            </ul>
                        </div>
                    ] : null}
                </QueueAnim>
            </div>
        );
    }
});
export default Entry;