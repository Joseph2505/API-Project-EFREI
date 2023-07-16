import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import {ApolloProvider} from "@apollo/react-hooks"
import {ApolloClient, InMemoryCache} from "@apollo/client"
import './index.css';

const appClient = new ApolloClient({
	uri: "http://localhost:3001/graphql",
	cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={appClient}>
    	<App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
