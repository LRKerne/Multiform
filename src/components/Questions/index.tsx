import { useEffect, useState } from "react";
import { useForm, FormActions } from "../../contexts/FormContext";
import api from "../../api";
import { RootObject } from "./interfaces";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import * as C from "./styles";

type Props = {
  categoryName: string;
  answersCat:any;
  // title: string;
  // description: string;
  // icon: string;
  // selected: boolean;
  // onClick: () => void;
};

type CategoryResult = {
  name: string
  value: number
}

export const MapQuestions = ({
  categoryName,
  answersCat,
  // title,
  // description,
  // icon,
  // selected,
  // onClick,
}: Props) => {
  
  const [questions, setQuestions] = useState<RootObject[]>();
  const [respostas, setRespostas] = useState<CategoryResult[]>([]);
  const [respostas2, setRespostas2] = useState<number[]>(Array.from({length:10}));
  const {state, dispatch} = useForm();

  useEffect(() => {
    async function getCateriesWithQuestions() {
      const { data } = await api.get<RootObject[]>(
        `question?_category.name=${categoryName}`
      );
      setQuestions(data);
    }
    getCateriesWithQuestions();
    // console.log(questions);
  }, []);

  function handleInputChange(e: any, objIndex: number) {
    const { name, value } = e.target;
    const resposta = respostas.find(item => item.name === name)
    if(!resposta) {
        setRespostas((old: any) => [...old, { name, value: Number(value) }])
        let newData = respostas2
        newData[objIndex] = Number(value)
        // console.log(respostas2,objIndex)
        setRespostas2(newData)
        return 
    }
    let arrawIndex
    const newRespostas: CategoryResult[] = respostas.map((item, index) => {
        if(item.name === name) {
            arrawIndex = index
            let newData = respostas2
            newData[index] = Number(value)
            setRespostas2(newData)
            item.value = Number(value)
            dispatch ({
              type: answersCat,
              payload: respostas
            });
        }
        return item
    })

    setRespostas(newRespostas)
    dispatch ({
      type: answersCat,
      payload: respostas
    });
    // console.log (respostas)
    console.log ("State:"+JSON.stringify (state.answersCat1))

}

  return (
    <div>
      {questions?.map((question, index) => {
        return (
          <div key={Math.random() + index * 2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                {question.name}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name={question.name}
                value={String(respostas2[index])}
                onChange={(e: any) => handleInputChange(e,Number(index))}
              >
              
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
          </div>
        );
      })}
    </div>
  );
};


// import React from 'react'
// import { Form, Formik } from 'formik';
// import {
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel
// } from '@material-ui/core'

// enum Options {
//   Option1,
//   Option2,
//   Option3,
//   Option4,
//   Option5,
// }
// type Props = {
//   questions: Object[];
// };

// const MapQuestions: Props = ({questions}) => {
//   const name = 'selectedOption'

//   return (
//     <Formik
//       initialValues={{
//         selectedOption: Options.Option1
//       }}
//       onSubmit={() => {}}
//     >
//       {({ values, setFieldValue, data}) => (
//         <Form>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">{data.description}</FormLabel>
//             <RadioGroup name={name} value={values.selectedOption.toString()} onChange={(event) => {
//               setFieldValue(name, event.currentTarget.value)
//             }}>
//               <FormControlLabel value={Options.Option1.toString()} control={<Radio />} label="1" />
//               <FormControlLabel value={Options.Option2.toString()} control={<Radio />} label="2" />
//               <FormControlLabel value={Options.Option3.toString()} control={<Radio />} label="3" />
//               <FormControlLabel value={Options.Option4.toString()} control={<Radio />} label="4" />
//               <FormControlLabel value={Options.Option5.toString()} control={<Radio />} label="5" />
//             </RadioGroup>
//           </FormControl>
//         </Form>
//       )}
//     </Formik>
//   )
// }

// export default MapQuestions;