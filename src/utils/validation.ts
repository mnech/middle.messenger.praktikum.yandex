export default function validation(value: string, name: string): string {
  switch(name) {
    case "email":
      if (!value) {
        return "Required";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        return "Invalid email address";
      }
      break;   
    case "password":
      if (!value) {
        return "Required";
      } else if(!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/g.test(value)) {
        return "Password must be 8 to 40 characters and include uppercase letter and number"; 
      } 
      break;  
    case "first_name":
      if (!value) {
        return "Required";
      } else if (!/^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]+$/g.test(value))  {
        return "First name can contain letters and _"; 
      } 
      break;  
    case "second_name":
      if (!value) {
        return "Required";
      } else if (!/^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]+$/g.test(value))  {
        return "Second name can contain letters and _"; 
      } 
      break;
    case "display_name":
      if (!value) {
        return "Required";
      }
      break;  
    case "login":
      if (!value) {
        return "Required";
      } else if(!/^[a-zA-Z0-9_-]{3,20}$/g.test(value)) {
        return "Login must be 3 to 20 characters and contain numbers, letters, -, _"; 
      } else if (!/[\D]/.test(value)) {
        return "Login mustn't only contain numbers";
      } 
      break; 
    case "phone":
      if (!value) {
          return "Required";
      } else if(!/^\+?[1-9][0-9]{9,14}$/g.test(value)) {
        return "Invalid phone number"; 
      } 
      break;   
    case "message":
      if (!value) {
        return "Required";
      } 
      break;  
  }

  return "";
}
