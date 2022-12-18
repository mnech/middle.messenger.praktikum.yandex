export default function validationForm(...args: any[]) {
  return (e: Event): unknown => {
    e.preventDefault();    
    let errors: boolean = false;
    const data: Record<string, string> = {};
    
    args.forEach((obj) => {
      obj.validate();
      if (obj.error) {
        errors = true;
      }
      data[obj.name] = obj.value;
    });

    if (errors) {
      return null;
    } else {
      return data;
    }
  }  
}
