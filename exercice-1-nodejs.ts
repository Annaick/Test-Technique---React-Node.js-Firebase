type user = {
  name: string;
  dob: string;
}

const users: user[] = [
{ name: "Alice", dob: "2000-02-29" },
{ name: "Bob", dob: "1990-12-31" },
{ name: "Charlie", dob: "2005-08-28" },
];

/**
 * Cette fonction retourne la liste des utilisateurs majeures
 * 
 * @param {user[]} users - La liste de tous les utilisateurs
 * @returns {user[]} La liste des utilisateurs majeures
 */
function getAdults(users: user[]){
  
  const adults = users.filter((user)=>{
    return new Date().getFullYear() - new Date(user.dob).getFullYear() >= 18 //Return TRUE if age is greater or equal than 18
  })
  
  return adults
}