import React from 'react'

const Row = ({children, verticalBorder}) => {
    return (
           <div className={"row "+(verticalBorder ? "verticalBorder" : "")}>
                { children }
           </div>
    )
}

export default Row