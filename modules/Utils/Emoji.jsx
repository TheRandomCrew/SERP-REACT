import React from 'react';
// Use 

// <Emoji symbol="🐑" label="sheep"/>
// or 
// <Emoji symbol="🐑"/>

const Emoji = ({label,symbol})=> 
    <span
        className="emoji"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
    >
        {symbol}
    </span>

export default Emoji;