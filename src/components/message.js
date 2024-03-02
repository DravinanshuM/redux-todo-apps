import './Header.css';

const showMessage = (message) => {
   //  console.log("show message", message);
    const element = document.createElement('div');
    element.textContent = message; 
    element.classList.add("class-list"); 
    document.body.appendChild(element); 
 
    setTimeout(() => {
       element.remove(); 
    }, 2000);
 }
 
 export default showMessage;
 