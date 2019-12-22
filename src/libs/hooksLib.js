import { useState } from "react";

// custom hook called
// hooks start with the word use in its name
// our hook takes the initial state of our form fields as an object
// returns an array with fields and a function that sets the new state based on the event object. The only difference here is that we are using event target.id to store the value of event.target.value
export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);
  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}
