import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {fetchPostsIfNeeded} from '../actions'
import { addWord } from '../actions'
import TagList from '../components/TagList'
let Input = ({ dispatch }) =>{
    let input
    return (
        <div>
            <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            dispatch(addWord(input.value))
            input.value = ''
          }}>
                <input ref={node => {
                                input = node
                 }} />
                <button type="submit">
                    Add word
                </button>
            </form>
        </div>
    )
}
Input = connect()(Input)

const mapStateToProps = (state) => ({
    words: state.word
})
const VisibleTagList = connect(
    mapStateToProps
)(TagList)

class WordsDef extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPostsIfNeeded())
    }
    render() {
        return (
            <div>
                <Input />
                <VisibleTagList />
            </div>

        )
    }
}

export default connect()(WordsDef)
