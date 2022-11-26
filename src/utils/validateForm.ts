export default function validateForm(value: string, name: string): string {
  switch(name) {
    case "email":
      if (!value) {
        return "Required";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        return "Invalid email address";
      }
      return "";  
    case "password":
      if (!value) {
        return "Required";
      } else if(!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/.test(value)) {
        return "Password must be 8 to 40 characters and include uppercase letter and number"; 
      } 
      return "";  
    default:
      return "";   
  }
}
