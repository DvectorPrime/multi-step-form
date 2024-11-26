import React, {useState, useEffect} from "react"
import blankCheckBox from "../assets/images/check_box_blanked.svg"
import markedCheckedBox from "../assets/images/check_box_marked.svg"

function AddOns(props) {
    const [addOnsPrices, setAddOnsPrices] = useState({
        "onlineService" : 1,
        "largerStorage" : 2,
        "customProfile" : 2,
    })

    const hideStep = {
        display: props.currentStep === 3 ? "block" : "none"
    }

    function handleChange(event){
        const {name, checked} = event.target

        props.setFormInfo(prevState => {
            return (
                {
                    ...prevState,
                    [name] : checked,
                    [`${name}Cost`] : checked ? addOnsPrices[name] : 0
                }
            )
        })
    }

    useEffect(() => {
        const labelsCollection = document.getElementsByClassName("add-on-labels")

        const labels = Array.from(labelsCollection)

        labels.forEach((label) => {
            if(props.formInfo[label.id]){
                label.style.borderColor = "#544c95"
                label.style.backgroundColor = "#f8f9fe"
            } else {
                label.style.borderColor = "#9c9da2a1"
                label.style.backgroundColor = "white"
            }
        })

        const billingDuration = props.formInfo.userBillingDuration

        if (billingDuration === "monthly"){
            setAddOnsPrices({
                "onlineService" : 1,
                "largerStorage" : 2,
                "customProfile" : 2,
            })
        } else {
            setAddOnsPrices({
                "onlineService" : 10,
                "largerStorage" : 20,
                "customProfile" : 20,
            })
        }      
        
    }, [props.formInfo])

    return(
        <section className="section" style={hideStep}>
            <h2 className="form-step-description">Pick add-ons</h2>
            <p className="form-prompt">Add-ons enhance your gaming experience.</p>
            <div className="step3-input-field">
                <label 
                    id="onlineService" 
                    className="add-on-labels" 
                    htmlFor={`${props.idPrefix}-online-service`}
                >
                    <input 
                        id={`${props.idPrefix}-online-service`} 
                        type="checkbox" 
                        name="onlineService" 
                        checked={props.formInfo.onlineService}
                        onChange={handleChange}
                    />
                    <img 
                        className="checkbox" alt="" 
                        src={props.formInfo.onlineService ? markedCheckedBox : blankCheckBox} 
                    />
                    <div className="add-on-info">
                        <p className="add-on-name">Online Service</p>
                        <p className="add-on-desc">Access to multiplayer games</p>
                    </div>  
                    <p className="add-on-price">
                        +${props.formInfo.userBillingDuration === "monthly" ? 1 : 10}/
                        {props.formInfo.userBillingDuration === "monthly" ? "mo" : "yr"}
                    </p>      
                </label>
                <label 
                    id="largerStorage" 
                    className="add-on-labels" 
                    htmlFor={`${props.idPrefix}-larger-storage`}
                >
                    <input 
                        id={`${props.idPrefix}-larger-storage`} 
                        type="checkbox" 
                        name="largerStorage" 
                        checked={props.formInfo.largerStorage}
                        onChange={handleChange}
                    />
                    <img 
                        className="checkbox" alt="" 
                        src={props.formInfo.largerStorage ? markedCheckedBox : blankCheckBox} 
                    />
                    <div className="add-on-info">
                        <p className="add-on-name">Larger Storage</p>
                        <p className="add-on-desc">Extra 1TB of cloud save</p>
                    </div>  
                    <p className="add-on-price">
                        +${props.formInfo.userBillingDuration === "monthly" ? 2 : 20}/
                        {props.formInfo.userBillingDuration === "monthly" ? "mo" : "yr"}
                    </p>    
                </label>
                <label 
                    id="customProfile" 
                    className="add-on-labels" 
                    htmlFor={`${props.idPrefix}-custom-profile`}
                >
                    <input 
                        id={`${props.idPrefix}-custom-profile`} 
                        type="checkbox" 
                        name="customProfile" 
                        checked={props.formInfo.customProfile === true}
                        onChange={handleChange}
                    />
                    <img  
                        className="checkbox" alt="" 
                        src={props.formInfo.customProfile ? markedCheckedBox : blankCheckBox} 
                    />
                    <div className="add-on-info">
                        <p className="add-on-name">Customisable Profile</p>
                        <p className="add-on-desc">Custom theme on your profile</p>
                    </div>  
                    <p className="add-on-price">
                        +${props.formInfo.userBillingDuration === "monthly" ? 2 : 20}/
                        {props.formInfo.userBillingDuration === "monthly" ? "mo" : "yr"}
                    </p>       
                </label>
            </div>
        </section>
    )
}

export default AddOns