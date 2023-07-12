// import React, { useState, useEffect } from "react";
// const UserDetails = () => {
//   const [credentials, setCredentials] = useState({ name: "", email: "", password: "", gender: "" });

//   useEffect(() => {
//     // Fetch the user data on component mount
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/auth/getuser');
//         const data = await response.json();
//         setCredentials(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
  
//   const onChange = (e) => {
//     // Update the corresponding property in the credentials object
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="col-md">
//       <div className="card">
//         <div className="card-body">
//           <p>
//             <b className="boldy">Name: </b>
//             {credentials.name}
//           </p>
//           <p>
//             <b className="boldy">E-mail:</b>
//             {credentials.email}
//           </p>
//           <p>
//             <b className="boldy">Gender:</b>
//             {credentials.gender}
//           </p>
  
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;