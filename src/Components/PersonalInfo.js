import React from "react";

function PersonalInfo(props){
    
    function handleChange(event){
        const {name, value} = event.target

        props.setFormInfo(prevState => {
            return {
                ...prevState,
                [name] : value,
            }
        })
    }

    const hideStep = {
        display: props.currentStep === 1 ? "block" : "none"
    }

    return (
        <section className="section" style={hideStep}>
            <h2 className="form-step-description">Personal info</h2>
            <p className="form-prompt">Please provide your name, email address, and phone number.</p>
            <div className="step1-input-field">
                <label htmlFor={`${props.idPrefix}-name`}>Name</label>
                <input 
                  id={`${props.idPrefix}-name`} 
                  type="text" 
                  name="userName" 
                  value={props.formInfo.userName} 
                  onChange={handleChange}
                  placeholder="e.g Stephen King"
                  autoComplete="off"
                />
            </div>
            <div className="step1-input-field">
                <label htmlFor={`${props.idPrefix}-email`}>Email Address</label>
                <input 
                  id={`${props.idPrefix}-email`} 
                  type="email" 
                  name="userEmail" 
                  value={props.formInfo.userEmail} 
                  onChange={handleChange}
                  placeholder="e.g stephenking@lorem.com"
                  autoComplete="off"
                />
            </div>
            <div className="step1-input-field">
                <label htmlFor={`${props.idPrefix}-phone-no`}>Phone Number</label>
                <input 
                  id={`${props.idPrefix}-phone-no`} 
                  type="tel" 
                  name="userPhoneNo" 
                  value={props.formInfo.userPhoneNo} 
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  autoComplete="off"
                />
            </div>
        </section>
    )
}

export default PersonalInfo