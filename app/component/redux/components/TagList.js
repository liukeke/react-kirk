import React, { PropTypes } from 'react'
const Tag = ({ tag }) => (
    <li>
        {tag}
    </li>
)
const TagList = ({ words }) => (
    <ul>
        {words.map(word =>
                <Tag
                    key={word.tag}
                    {...word}
                    />
        )}
    </ul>
)

export default TagList
