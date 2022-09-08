import { toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/

// Check email validity
function checkEmail(email){
    let verifyEmail = new RegExp('(?=.*^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$)');
    if (!verifyEmail.test(email)) {
      toast.error('Invalid email address', {hideProgressBar:true});
      return
    }
    return email
  }

  export default checkEmail;