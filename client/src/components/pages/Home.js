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
                    {/*<img id="detour_pic" src="food app logo.jpg" alt="" />*/}
                    <img id="food_delivery_pic" src="food_delivery.jpg" alt="" />
                    <img id="veggies_pic" src="veggies.jpg" alt="" />
                    <img id="grocery_pic" src="grocery.jpg" alt="" />

                    <div id="title">
                        <p><div id="tubelight1">DE</div><br /><div id="tubelight2">TOUR</div></p>
                    </div>
                    
                    <div className="leftside"><img src="side_strip.jpg" alt="" style={{ float: "right" }} /></div>
                    <div className="rightside"><img src="side_strip.jpg" alt="" /></div>
                    <div id="pagebody">
                    <p className="text"><b>Experience Bangalore's top-tier food delivery service, catering to a diverse range of restaurants in your vicinity.</b></p>
                    <p className="text"><b>Bid farewell to hunger and savor delectable, nourishing dishes at your convenience with</b> <b style={{ color: "red" }}>DE</b> <b style={{ color: "lightgreen" }}>TOUR</b><b>.</b></p>
                   
                    </div>
                    <div id="button_align"><Link to="/store"><button className="home-button">Order Now!</button></Link></div>
                </div>
            </>
        )
    }
}

export default Home;
