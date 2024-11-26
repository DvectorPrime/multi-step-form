import React from "react";

function StepIndicator(props){
    const bgStyle = {
        backgroundColor: props.isActive ? "#c2e6fc" : "transparent",
        border: props.isActive ? "none" : "1px solid white",
        color: props.isActive ? "#032958" : "white"
    }

    return (
        <div className="step-container">
            <div className="step-indicator" style={bgStyle}>
                <p>{props.value}</p>
            </div>
            <div className="step-info">
                <p className="stepNo">STEP {props.value}</p>
                <p className="stepDes">{props.stepMsg}</p>
            </div>
        </div>    
    )
}

export default StepIndicator