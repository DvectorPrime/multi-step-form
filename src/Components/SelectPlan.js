import React, {useState, useEffect} from "react"
import ArcadeIcon from "../assets/images/icon-arcade.svg"
import AdvancedIcon from "../assets/images/icon-advanced.svg"
import ProIcon from "../assets/images/icon-pro.svg"

function SelectPlan(props){

    const [billingPrices, setBillingPrices] = useState({
        "arcade" : 9,
        "advanced" : 12,
        "pro" : 15,
    })

    function handleChange (event){
        const {name, value} = event.target

        props.setFormInfo(prevState => {
            return {
                ...prevState,
                [name] : value,
                billingAmount : billingPrices[value]
            }
        })
    }

    const hideStep = {
        display: props.currentStep === 2 ? "block" : "none"
    }

    function changeDuration(){
       if (props.formInfo.userBillingDuration === "monthly") {
        const toggle = document.getElementById("toggle-thumb");
        toggle.style.marginLeft = "auto";
        toggle.style.marginRight = "0";
        props.setFormInfo(prevState => {
            return {
                ...prevState,
                userBillingDuration : "yearly",
                billingType: "",
                billingAmount: 0,
                onlineService: false,
                onlineServiceCost: 0,
                largerStorage: false,
                largerStorageCost: 0,
                customProfile: false,
                customProfileCost: 0
            }
        })
       } else {
        const toggle = document.getElementById("toggle-thumb");
        toggle.style.marginLeft = "0";
        toggle.style.marginRight = "auto";
        props.setFormInfo(prevState => {
            return {
                ...prevState,
                userBillingDuration : "monthly",
                billingType: "",
                billingAmount: 0,
                onlineService: false,
                onlineServiceCost: 0,
                largerStorage: false,
                largerStorageCost: 0,
                customProfile: false,
                customProfileCost: 0
            }
        })
       }
    }

    useEffect(() => {
        const labelsCollection = document.getElementsByClassName("billing-plan-label")

        const labels = Array.from(labelsCollection)

        labels.forEach(label => {
            label.style.borderColor = "#9c9da2a1"
            label.style.backgroundColor = "white"
        })
        
        if (props.formInfo.billingType === ""){
        } else {
            const label = document.getElementById(`billing-plan-label-${props.formInfo.billingType}`)
            label.style.borderColor = "#544c95"
            label.style.backgroundColor = "#f8f9fe"
        }

        const billingDuration = props.formInfo.userBillingDuration

        if (billingDuration === "monthly"){
            setBillingPrices({
                "arcade" : 9,
                "advanced" : 12,
                "pro" : 15,
            })
        } else {
            setBillingPrices({
                "arcade" : 90,
                "advanced" : 120,
                "pro" : 150,
            })
        }      
        
    }, [props.formInfo.billingType, props.formInfo.userBillingDuration])

    return(
        <section className="section" style={hideStep}>
            <h2 className="form-step-description">Select your plan</h2>
            <p className="form-prompt">You have the option of monthly or yearly billing.</p>
            <div className="step2-input-field">
                <label
                 id={`billing-plan-label-arcade`} 
                 className="billing-plan-label" 
                 htmlFor={`${props.idPrefix}-arcade`} 
                >
                    <input
                       id = {`${props.idPrefix}-arcade`} 
                       type="radio"
                       name="billingType"
                       value="arcade"
                       checked = {props.formInfo.billingType === "arcade"}
                       onChange={handleChange}
                    />
                    <div className="billing-plan-icon"><img src={ArcadeIcon} alt="" /></div>
                    <div className="billing-plan-info">
                        <p className="billing-plan-name">Arcade</p>
                        <p className="billing-plan-price">${billingPrices["arcade"]}/{props.formInfo.userBillingDuration === "monthly" ? "mo" : "yr"}</p>
                        {props.formInfo.userBillingDuration === "yearly" && <p className="discount-tag">2 months free</p>}
                    </div>
                </label>
                <label 
                 className="billing-plan-label" 
                 htmlFor={`${props.idPrefix}-advanced`} 
                 id={`billing-plan-label-advanced`} 
                >
                    <input
                       id = {`${props.idPrefix}-advanced`} 
                       type="radio"
                       name="billingType"
                       value="advanced"
                       checked = {props.formInfo.billingType === "advanced"}
                       onChange={handleChange}
                    />
                    <div className="billing-plan-icon"><img src={AdvancedIcon} alt="" /></div>
                    <div className="billing-plan-info">
                        <p className="billing-plan-name">Advanced</p>
                        <p className="billing-plan-price">${billingPrices["advanced"]}/{props.formInfo.userBillingDuration === "monthly" ? "mo" : "yr"}</p>
                        {props.formInfo.userBillingDuration === "yearly" && <p className="discount-tag">2 months free</p>}
                    </div>
                </label>
                <label 
                 className="billing-plan-label" 
                 htmlFor={`${props.idPrefix}-pro`} 
                 id={`billing-plan-label-pro`} 
                >
                    <input
                       id = {`${props.idPrefix}-pro`} 
                       type="radio"
                       name="billingType"
                       value="pro"
                       checked = {props.formInfo.billingType === "pro"}
                       onChange={handleChange}
                    />
                    <div className="billing-plan-icon"><img src={ProIcon} alt="" /></div>
                    <div className="billing-plan-info">
                        <p className="billing-plan-name">Pro</p>
                        <p className="billing-plan-price">${billingPrices["pro"]}/{props.formInfo.userBillingDuration === "monthly" ? "mo" : "yr"}</p>
                        {props.formInfo.userBillingDuration === "yearly" && <p className="discount-tag">2 months free</p>}
                    </div>
                </label>
                <div className="monthly-or-yearly">
                    <p className="monthly">Monthly</p>
                    <div className="toggle-bar" onClick={changeDuration}>
                        <div className="toggle-thumb" id="toggle-thumb"></div>
                    </div>
                    <p className="yearly">Yearly</p>
                </div>
            </div>
        </section>
    )
}

export default SelectPlan