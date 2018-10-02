import React from 'react';

const Screen = ({value, purpose}) => {
    return(
        <div className={purpose}>{value}</div>
    )
}

export default Screen;