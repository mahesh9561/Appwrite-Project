import React from 'react'

function Buttons(
    {
        children,
        type = "button",
        bgColor = "bg-blue-300",
        textColor = "text-color",
        className = "",
        ...props
    }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg ${type} ${bgColor} ${textColor} ${className}`}{...props}>
            {children}
        </button>
    )
}

export default Buttons