import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/nomatch.scss';

const NoMatch = () => {
    return (
        <div className="no_match">
            <div>
                <h1>404</h1>
                <p>Oops! La page est introuvable.</p>
            </div>
            
        </div>
    );
};

export default NoMatch;