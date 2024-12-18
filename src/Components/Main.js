import React, { useState, useId } from 'react';
import bgSidebarMobile from "../assets/images/bg-sidebar-mobile.svg"
import StepIndicator from './step-indicator';
import PersonalInfo from './PersonalInfo';
import SelectPlan from './SelectPlan';
import AddOns from './AddOns';
import Summary from './Summary';
import ThankYou from './ThankYou';

function Main() {
  
  const [formInfo, setFormInfo] = useState({
    userName: "",
    userEmail: "",
    userPhoneNo: "",
    userBillingDuration: "monthly",
    billingType: "",
    billingAmount: 0,
    onlineService: false,
    onlineServiceCost: 0,
    largerStorage: false,
    largerStorageCost: 0,
    customProfile: false,
    customProfileCost: 0,
  })

  const [currentStep, setCurrentStep] = useState(1)

  const userId = useId();

  const stepMsg = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"]

  const stepindicatorelements = []

  for (let i = 1; i <= 4; i++){
    const currentValue = i;

    stepindicatorelements.push(<StepIndicator 
      key={currentValue}
      value={currentValue} 
      isActive={String(currentValue) === String(currentStep)} 
      stepMsg={stepMsg[currentValue -1]} 
      />
    )
  }

  function prevStep(){
    setCurrentStep(prevStep => prevStep - 1)
  }

  function validatePersonalInfo(emailPattern, phoneNoPattern){
    if (formInfo.userName === ""){
      document.getElementById("error-message").innerText = "Enter your Name"
    }else if (!emailPattern.test(formInfo.userEmail)){
      document.getElementById("error-message").innerText = "Enter a correct email address"
    } else if (!phoneNoPattern.test(formInfo.userPhoneNo)){
      document.getElementById("error-message").innerText = "Enter a correct phone number"
    } else {
      document.getElementById("error-message").innerText = ""
      return "validated"
    }

    return "unvalidated"
  }

  function nextStep(){

    if (currentStep === 1){
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^/s@]+$/
      const phoneNoPattern = /^(\+?\d{1,3}\s?)?\d{3}\s?\d{3}\s?\d{3,4}\s?$/
      const isValidated = validatePersonalInfo(emailPattern, phoneNoPattern)
      if (isValidated === "validated"){
        setCurrentStep(prevState => prevState + 1 )
      }
      
      return;
    } else if (currentStep === 2){
      if (formInfo.billingType === ""){
        alert("Pick an option")
      } else{
        setCurrentStep(prevState => prevState + 1 )
      }
      return
    } else if (currentStep === 3){
      setCurrentStep(prevState => prevState + 1)
    } else if (currentStep === 4){
      setCurrentStep("4")
    }
  }

  const progressBtnStyle = {
    backgroundColor: currentStep < 4 ? "#032958" : "#483eff"
  }

  return (
    <main className="app">
      <div className="sidebar-mobile-img-container">
        <img className="sidebar-mobile-img" src={bgSidebarMobile} alt="background" />
      </div>
      <div className="step-indicators-container">
        {stepindicatorelements}
      </div>
      <div className="form-content">
        <PersonalInfo 
          idPrefix = {userId} 
          formInfo = {formInfo}
          setFormInfo = {setFormInfo}
          currentStep = {currentStep}
        />
        <SelectPlan 
          idPrefix = {userId}
          formInfo = {formInfo}
          setFormInfo = {setFormInfo}
          currentStep = {currentStep}
        />
        <AddOns 
          idPrefix = {userId}
          formInfo = {formInfo}
          setFormInfo = {setFormInfo}
          currentStep = {currentStep}
        />
        <Summary 
          idPrefix = {userId}
          formInfo = {formInfo}
          setFormInfo = {setFormInfo}
          currentStep = {currentStep}
          setCurrentStep = {setCurrentStep}
        />
        <ThankYou
          currentStep = {currentStep}
        />
        <div id="error-message"></div>
      </div>
      {
        currentStep !== "4" &&
        <div className="navigate-menu">
          {currentStep !== 1 && <button className="go-back-btn" onClick={prevStep}>Go Back</button>}
          <button className="next-step-btn" style={progressBtnStyle} onClick={nextStep}>{currentStep < 4 ? "Next Step" : "Confirm"}</button>
        </div>
      }
    </main>
  );
}

export default Main;