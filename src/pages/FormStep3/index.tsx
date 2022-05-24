import * as C from "./styles";
import { Theme } from "../../components/Theme";
import { useNavigate } from "react-router-dom";
import { useForm, FormActions } from "../../contexts/FormContext";
import {  useEffect } from "react";
import { SelectOption } from "../../components/SelectOption";
import { Link } from "react-router-dom";
import { ChangeEvent } from "react";





export default function FormStep3() {
  const navigate = useNavigate();
  const {state, dispatch} = useForm();
  
 useEffect(() =>{
   if (state.name === ''){
    navigate('/')
   }else{
    dispatch({
     type: FormActions.setCurrentStep,
     payload: 3
     })}
    
 }) 
  
  const handleNextStep = () => {
    if (state.email && state.github !== ''){
      console.log (state)
      navigate('/step4');
    }else {
      alert("Preecha os dados")
    }
  }

  const handleEmailChange= ( e: ChangeEvent<HTMLInputElement>) => {
    dispatch ({
      type: FormActions.setEmail,
      payload: e.target.value

    });
  }
  const handleGitHubChange= ( e: ChangeEvent<HTMLInputElement>) => {
    dispatch ({
      type: FormActions.setGithub,
      payload: e.target.value

    });
  }

  return (
    <Theme>
      <C.Container> 
        <p>Passo {state.currentStep}/3 - {state.name}</p>
        <h1>Legal {state.name}, onde te achamos?</h1>
        <p>Preencha as informacoes para contato.</p>

        <hr />
        
        
        <label>
          Email:
          <input
            type="email"
            value={state.email}
            onChange= {handleEmailChange}
          />
        </label>

        <label>
          Github:
          <input
            type="url"
            value={state.github}
            onChange= {handleGitHubChange}
          />
        </label>
        
        <Link className="backButton" to='/step2'>Voltar</Link>
        <button onClick={handleNextStep}>Proximo</button>
      </C.Container>
    </Theme>
  );
}
