import React from 'react';

function Footer(){
    return(
        <footer className="primary-bg-color p-4 text-center mt-5">
            &copy;{new Date().getFullYear()} Fund The Restaurants
        </footer>
    );
}

export default Footer;