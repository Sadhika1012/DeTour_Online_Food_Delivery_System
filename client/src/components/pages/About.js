import React from "react";
import './about_us.css';
import { Navbar } from "../layout";


export default function About(){
  
    return(
      <div class="bg">
        <Navbar/>
        <img class="bg" src="about_us_bak.jpeg" alt=""/>
        <h1><b>About Us</b></h1><br/>
        
        <h2>
        <div className='c1'>This Website was built by Sadhika,</div><br/>
        <div className='c2'>Teja,Roseline and Sanjana</div><br/>
        <div className='c3'>for the sake of reaching out,</div><br/>
        <div className='c5'>to everyone who,</div><br/>
        <div className='c4'>just like us has a love for food.</div><br/> </h2>
        <br/>
        <br/>
        <br/>
      
        <h2 className='contact_us'>Contact us at : +91-7385298567</h2><br/>
        <h2 className='insta'>Our instagram handle: Detour_bangalore</h2>
        
     
      </div>
    );
  
}
