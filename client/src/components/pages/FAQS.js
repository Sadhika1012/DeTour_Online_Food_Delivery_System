import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { Navbar } from "../layout";
const data = {
    title: "FAQs",
    rows: [
        {
            title: "Do I have to register as a client on this website before ordering?",
            content: `Yes, if you are looking at this website to plce orders.We also accept phone
            orders however.But signing up makes it easier for us to process your order.`,
        },
        {
            title: "Are the prices listed on this website accurate and binding?",
            content:
                "We make every effort to keep the prices updated and accurate.",
        },
        {
            title: "Can I get discounts for big orders?",
            content: `Sorry,as practice we do not give discounts as we work on very slim margins,already.
            But,we could check with the Restaurant-and if they offer any special discount`,
        },
        {
            title: "How to Contact us?",
            content: `You can visit our instagram handle:detour_bangalore 
            or contact us at :+91-7385298567 `,
        },
    ],
};

const styles = {
    bgColor: 'black',
    titleTextColor: "crimson",
    rowTitleColor: "rgb(4, 250, 37)",
    rowContentColor: '#fdec0b',
    arrowColor: "white",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function FAQS() {

    return (
        <div>
            <Navbar/>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}