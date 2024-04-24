import React from 'react';
import './CSS/LoginSignup.css';
import login_image from  '../components/Assets/background/login-nature.jpg';
import { FaUser } from 'react-icons/fa6';
import { IoMdLock } from "react-icons/io";

const LoginSignup = () => {
  return (
    <div className='body'  style={{backgroundImage: `url(${login_image})`}}>
      <div className="box">
         <span className="borderLine"></span>
        <form>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input type="text" pattern="^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|([a-zA-Z0-9._%+-]+)$" required='required' />
            <span>Username or Email <FaUser/></span>   
            <i className='bx bxs-user'></i>
          </div>

          <div className="inputBox">
            <input type="password" required='requied'/>
            <span>Password <IoMdLock/></span>
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="links">
            <a href="#">Forgot Password</a>
          </div>
          
          <button type="submit" className='btn'>Login</button>

          <div className="register-link">
            <p>Don't have an account? <a href="#">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;



// import React from 'react';
// import './CSS/LoginSignup.css';
// import login_image from  '../components/Assets/background/coffe-login.png';

// const LoginSignup = () => {
//   return (
//     <div className='body'  style={{backgroundImage: `url(${login_image})`}}>
//       <div className="box">
//          <span className="borderLine"></span>
//         <form>
//           <h2>Sign in</h2>
//           <div className="inputBox">
//             <input type="text" required='requied'/>
//             <span>Username</span>
//             <i></i>
//           </div>
//           <div className="inputBox">
//             <input type="password" required='requied'/>
//             <span>Password</span>
//             <i></i>
//           </div>
//           <div className="links">
//             <a href="#">Forgot Password</a>
//             <a href="#">Signup</a>
//           </div>
//           <input type="submit" value='Login' />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginSignup;