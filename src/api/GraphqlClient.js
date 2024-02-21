// api.js
import request from 'graphql-request';

const endpoint = "http://127.0.0.1:8000/graphql/";
const strawberryendpoint = "http://127.0.0.1:8000/strawberry";


const graphqlRequest = (gql) => request(endpoint,gql);
const strawberryRequest = (gql) => request(strawberryendpoint,gql);

export {graphqlRequest,strawberryRequest};
