import * as C from "./styles";
import { Theme } from "../../components/Theme";
import { useNavigate } from "react-router-dom";
import { useForm, FormActions } from "../../contexts/FormContext";
import { useEffect, useState } from "react";
import { SelectOption } from "../../components/SelectOption";
import {MapQuestions} from "../../components/Questions"
import { Link } from "react-router-dom";
import { RootObject } from "./interfaces";
import api from "../../api";


export default function FormStep2() {
  const navigate = useNavigate();
  const {state, dispatch} = useForm();
  const [questions, setQuestions] = useState<RootObject[]>();

 useEffect(() =>{
   if (state.name === ''){
    navigate('/')
   }else{
    dispatch({
     type: FormActions.setCurrentStep,
     payload: 2
     })}
}) 
useEffect(() => {
      async function getQuestionsFromCategory() {
        const { data } = await api.get<RootObject[]>(
          `question?_category.name=Category 1`
        );
        setQuestions(data);
      }
      getQuestionsFromCategory();
      console.log(questions);
    }, []);

  
  const handleNextStep = () => {
    if (state.name !== ''){
      navigate('/step3');
    }else {
      alert("Preecha os dados")
    }
  }


  return (
    <Theme>
      <C.Container> 
        <p>Passo {state.currentStep}/3 - {state.name}</p>
        <h1>{state.name}, o que melhor descreve voce?</h1>
        <p>Escolha a opcao que melhor condiz com seu state atual</p>

        <hr />
        
        <MapQuestions categoryName="Category 1" answersCat = {FormActions.setAnswersCat1} ></MapQuestions>
        {/* <SelectOption 
          title= "Sou Iniciante"
          description= "Comecei a programar ha menos de 2 anos"
          icon="🥳"
          selected={state.level === 0}
          onClick= {()=> setLevel(0)}
        />
        <SelectOption 
          title= "Sou Programador"
          description= "Ja programo ha mais  de 2 anos"
          icon="🤠"
          selected={state.level === 1}
          onClick= {()=> setLevel(1)}
        /> */}
        
        <Link className="backButton" to='/'>Voltar</Link>
        <button onClick={handleNextStep}>Proximo</button>
      </C.Container>
    </Theme>
  );
}
