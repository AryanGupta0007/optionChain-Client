import React from "react";
export const Label = (props) => {
    const {title} = props
    const getDistanceFromTop = () => {
        if (title === "ORDER PRICE"){
            return "-1vh"
        }
        return "1vh"
    }
    return (
        <>
            <div className="label" style={{marginRight: "1vw", position: "relative", top: "0.5vh"}}>
                <label style={{position: "relative", top: getDistanceFromTop()}}
                       className="block text-sm font-medium leading-6 text-gray-900 correct-label" style={{color: "white"}}>{title}</label>
            </div>
        </>
    )
}

