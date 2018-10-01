import React from 'react';

const Screen = ({value, purpose}) => {
    return(
        <div id={purpose}>{value}</div>
    )
}

export default Screen;