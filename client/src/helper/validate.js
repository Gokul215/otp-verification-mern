import { toast} from 'react-hot-toast';


export async  function validateuser(values) {
  
   const errors= verifyusername({},values)
  return errors;
}

 function verifyusername(error={},values) {
  if (!values.username){
    error.username=toast.error("Username required..")
  }else if(values.username.includes(" ")){
    error.username=toast.error("Username cannot be empty")
  }

  
  return error;
}



export  function validatepassword(values) {
  const errors= verifypassword({},values)
  return errors;
 
}
function verifypassword(error={},values) {
let specialchar=/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g

  if (!values.password){
    error.password=toast.error("Password required..")
  }else if(values.password.includes(" ")){
    error.password=toast.error("Password cannot be empty")
  }else if(values.password.length < 4){
    error.password=toast.error("Password must be more than 4 letters")
    
  }else if(!specialchar.test(values.password))
  {
    error.password=toast.error("Password must contain atleast one special character")
  }

  
  return error;
}


/*verify reset */

export async function resetpassword(values){

  const errors= verifypassword({},values)

  if (values.password!== values.confpassword){
      toast.error('Confirm password does not match')
  }
  return errors;
}


