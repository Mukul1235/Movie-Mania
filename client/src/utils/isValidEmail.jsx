export const isValidEmail = (email) => {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Search for email validator regex
   return isValid.test(email)
}