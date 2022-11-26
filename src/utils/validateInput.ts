import validateForm from "./validateForm";

export default function validateInput(initialValue: string, name: string) {
  let value = initialValue;
  let touched = false;
  let error = "";

  const onFocus = (obj) => {
    obj.touched = true; 
  }

  const onBlur = (e, obj) => {
    obj.value = e.target.value;
    obj.error = validateForm(obj.value, name);
  }

  return {
    value, touched, error, onFocus, onBlur
  }

}
