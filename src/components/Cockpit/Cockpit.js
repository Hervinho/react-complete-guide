import React, { Component, useEffect, useRef } from 'react';
import AuthContext from '../context/auth-context';

class Cockpit extends Component {
//const Cockpit = (props) => {

    // useEffect(() => { 
    //     // Runs after EVERY rendering
    //     console.log('Cockpit.js use effect');
    // });
    
    render () {
        let styleClasses = [];
        let buttonStyle = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': { //CSS pseudo-selectors made possible through Radium
            backgroundColor: 'lightgreen',
            color: 'black',
            }
        };

        if (this.props.showPersons) {
            buttonStyle.backgroundColor = 'red';
            buttonStyle[':hover'] = { //CSS pseudo-selectors made possible through Radium
                backgroundColor: 'lightred',
                color: 'black',
            }
        }

        //setting class names dynamically.
        if (this.props.personsLength >= 2) {
        styleClasses.push('red'); // ['red']
        } 
        if (this.props.personsLength >= 1) {
        styleClasses.push('bold'); // ['red', 'bold']
        }

        return (
            <div>
                <h1>Hello world</h1>
                <p className={ styleClasses.join(' ') }>It is working</p>

                <button style={ buttonStyle } onClick={ this.props.clicked }>Toggle persons</button>
                <AuthContext.Consumer>
                    { context => <button onClick={ context.login }>Login</button>}
                </AuthContext.Consumer>
                
            </div>
            
        );
    }
    
}

export default React.memo(Cockpit); //memoization, to avoid re-rendering