import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {
  Home,
  Check,
  About,
  FAQS,
  Cart,
  Sign,
  Store,
  Login
} from './components/pages'


function App() {
  return (
    <div >
     
      <Router>
        
      <Routes>
           <Route exact path="/" element={<Login />} />
               
               <Route path="/faq" element={<FAQS />} />
               <Route path="/home" element={<Home />} />
             
              <Route path="/about" element={<About/>}/>
               <Route path="/sign" element={<Sign/>} />
               
               <Route path="/store" element={<Store/>} />
               <Route path="/cart" element={<Cart/>}/>
               
               <Route path="/check" element={<Check/>} />
           </Routes>
           
      </Router>
      
    </div>
  );
}

export default App;
