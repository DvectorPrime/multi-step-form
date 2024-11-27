import React from "react"
import ThankYouImage from "../assets/images/icon-thank-you.svg"

function ThankYou(props){

    const hideStep = {
        display: props.currentStep === "4" ? "flex" : "none"
    }

    return(
        <section className="section thank-you-section" style={hideStep}>
            <img src={ThankYouImage} alt="" />
            <h2 className="form-step-description thank-you-heading">Thank You!</h2>
            <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,please feel free to email us at support@loremgaming.com.</p>
        </section>
    )
}

export default ThankYou