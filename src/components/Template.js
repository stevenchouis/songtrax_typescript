import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Template component: includes the header, the content of the page, and the footer. 
 * @param {*} title The title of the page.
 * @param {*} children The content of the page.
 * @returns The page with header, content and footer. 
 */
function Template({ title, children }) {
    return (
        <>
            <Header></Header>
            <main>
                <h2 className="title">{title}</h2>
                {children}
            </main>
            <Footer/>
        </>
    );
}

Template.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Template;