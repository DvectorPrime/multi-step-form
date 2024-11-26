import React, {useState, useEffect} from "react"

function Summary(props){
    const {billingType, userBillingDuration, billingAmount, onlineServiceCost, largerStorageCost, customProfileCost} = props.formInfo

    const billingTypeString = billingType !== "" ? billingType.replace(billingType[0], billingType[0].toUpperCase()) : "choose"
    const billingDurationString = userBillingDuration.replace(userBillingDuration[0], userBillingDuration[0].toUpperCase())

    const [totalCost, setTotalCost] = useState(billingAmount + onlineServiceCost + largerStorageCost + customProfileCost)

    function changeBillingType(){
        props.setCurrentStep(2)
    }

    useEffect(() => {
        setTotalCost(billingAmount + onlineServiceCost + largerStorageCost + customProfileCost)
    }, [billingAmount, onlineServiceCost, largerStorageCost, customProfileCost])

    const hideStep = {
        display: props.currentStep === 4 ? "block" : "none"
    }

    return(
        <section className="section" style={hideStep}>
            <h2 className="form-step-description">Finishing up</h2>
            <p className="form-prompt">Double-check everthing looks OK before confirming.</p>
            <div className="step4-input-field">
                <div className="final-billing-info">
                    <p className="final-billing-type">{billingTypeString} ({billingDurationString})</p>
                    <div className="summary-main-flex">
                        <p className="change-billing-type" onClick={changeBillingType}>Change</p>
                        <p className="main-billing-amount">
                            ${billingAmount}/{userBillingDuration === "monthly" ? "mo" : "yr"}
                        </p>
                    </div>
                    <hr className="addon-divider" />
                    {
                        onlineServiceCost
                        ?
                        <div className="summary-flex"> 
                            <p>Online service</p>
                            <p>
                                +${onlineServiceCost}/
                                {userBillingDuration === "monthly" ? "mo" : "yr"}
                            </p>
                        </div>
                        :
                        null
                    }
                    {
                        largerStorageCost
                        ?
                        <div className="summary-flex">
                            <p>Larger storage</p>
                            <p>
                                +${largerStorageCost}/
                                {userBillingDuration === "monthly" ? "mo" : "yr"}
                            </p>
                        </div>
                        :
                        null
                    }
                    {
                         customProfileCost
                         ?
                         <div className="summary-flex">
                            <p>Customizable Profile</p>
                            <p>
                                +${customProfileCost}/
                                {userBillingDuration === "monthly" ? "mo" : "yr"}
                            </p>
                        </div>
                         :
                         null
                    }
                    
                </div>
                <div className="summary-total-flex">
                    <p>Total (per {userBillingDuration === "monthly" ? "month" : "year"})</p>
                    <p>${totalCost}/{userBillingDuration === "monthly" ? "mo" : "yr"}</p>
                </div>
            </div>
        </section>
    )
}

export default Summary