import { toast } from 'react-toastify'; // https://fkhadra.github.io/react-toastify/introduction/


// Check password validity
function checkPassword(password){
    let checkAlphabet = new RegExp('(?=.*[A-Za-z])');
    let checkNumber = new RegExp('(?=.*[0-9])');
    let checkSpecial = new RegExp('(?=.*[^A-Za-z0-9])');
    let pw_error = '';
    
    if (!checkAlphabet.test(password)) {
      pw_error = '- Missing alphabet\n';
    };
    if (!checkNumber.test(password)) {
      pw_error += '- Missing number\n';
    };
  
    if (!checkSpecial.test(password)) {
      pw_error += '- Missing special character\n';
    };
  
    if (password.length < 8) {
      pw_error += '- Password too short\n';
    };
  
    if (password.length > 10) {
      pw_error += '- Password too long\n';
    };
  
  
    if (pw_error.length > 0) {
      toast.error(
        <>
          Invalid password:
          <br/>
          <div>
            {/*Splitting the text by line breaks*/}
            {pw_error.split("\n").map((i,key) => {
                return <div key={key}>{i}</div>;
            })}
          </div>
        </>
        , {hideProgressBar:true});
    return false;
    }
    return true
  }

// Check email validity
function checkEmail(email){
    let verifyEmail = new RegExp('(?=.*^[A-Za-z0-9.]{1,64}@[A-Za-z0-9.]{1,64}$)');
    if (!verifyEmail.test(email)) {
        toast.error('Invalid email address', {hideProgressBar:true});
        return false
    }
    return true
}

const AlphanumericCheck = {
  checkPassword,
  checkEmail
}

  export default AlphanumericCheck;