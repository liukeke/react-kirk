import React,{Component} from 'react';
import Page from 'react-page-locke';
class Entry extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            pageSize: 10,
            start: 0
        };
    }
    getAjaxList(pageNum) {
        /*这里是ajax调用程序*/
        this.setState({totalNum:0},()=>{
            this.setState({totalNum:400,start:pageNum});
        });
    }
    componentDidMount(){
        this.getAjaxList(0,this.state.pageSize);
    }
    render() {
        var state = this.state;
        return (
            <div>
                {
                    state.totalNum ?
                        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start} getAjaxList={this.getAjaxList.bind(this)}/>
                        : null
                }
            </div>
        )
    }
}

export default Entry;