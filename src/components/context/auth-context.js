import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => {}
}); //globally available JS object, without using props

export default authContext;