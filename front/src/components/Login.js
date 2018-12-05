import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.scss';
import '../styles/app.scss';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://qkv3mq9rp.lp.gql.zone/graphql"
});

const Login = () => {
    return (
        <div className="main">
            <ApolloProvider client={client}>
                <div className="container">
                    <h2>My first Apollo app</h2>
                </div>
            </ApolloProvider>
        </div>
    );
};

export default Login;