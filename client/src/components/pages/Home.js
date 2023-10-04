import React from "react";
import { Navbar } from "../layout";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends React.Component {
    render() {
        return (
            <>
                <div className="home-container">
                    <Navbar />
                    <img id="detour_pic" src="food app logo.jpg" alt="" />
                    <img id="food_delivery_pic" src="food_delivery.jpg" alt="" />
                    <div id="title">
                        <p><div id="tubelight1">DE</div><br /><div id="tubelight2">TOUR</div></p>
                    </div>
                    
                    <div className="leftside"><img src="side_strip.jpg" alt="" style={{ float: "right" }} /></div>
                    <div className="rightside"><img src="side_strip.jpg" alt="" /></div>
                    <p className="text">Bangalore's premium food delivery service, serving across all restaurants near you.</p>
                    <div id="pagebody">
                        <h2 className="text">Say goodbye to HUNGER and hello to YUM</h2>
                        <p className="text">Order tasty and healthy food from anywhere, anytime from <b style={{ color: "red" }}>DE</b> <b style={{ color: "lightgreen" }}>TOUR</b></p>
                        <div id="button_align"><Link to="/store"><button className="home-button">Order Now!</button></Link></div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;
