import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/nomatch.scss';

const NoMatch = () => {
    return (
        <div className="no_match">
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <a className="button" href="#"><i className="icon-home"></i> Go back in initial page, is better.</a>
        </div>
    );
};

export default NoMatch;