import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input type='email' placeholder='Your Email Address'/>
        <button>Subscribe</button>
      </div>
    </div>
  );
}

export default NewsLetter;


// const NewsLetter = () => {
//   return (
//     <div className='newsletter'>
//       <div className="newsletter-left">
//         <h1>OShop</h1>
//         <h2>The best look anytime, anywhere</h2>
//       </div>
//       <div className="newsletter-midleft">
//         <h2>For Her</h2>
//         <ul>
//           <li>Women Jeans</li>
//           <li>Women Jeans</li>
//           <li>Women Jeans</li>
//           <li>Women Jeans</li>
//           <li>Women Jeans</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default NewsLetter;