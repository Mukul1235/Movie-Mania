export const isValidEmail = (email) => {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Search for email validator regex
   return isValid.test(email)
}



export const renderItem = (result) => {
  return (
    <div className="flex rounded overflow-hidden">
      <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};
