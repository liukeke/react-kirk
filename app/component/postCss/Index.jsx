/**
 * Created by Kirk liu on 2017/8/14.
 */
import React from 'react';
import  '../../public/css/postCss';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <h1 className="title">
                Hello World
                <div className="kk">
                    111111
                    <i className="b-1"></i>
                    <i className="b-2"></i>
                    <i className="b-3"></i>
                </div>
            </h1>
        );
    }
}
export default Index;