import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Person.css';
//import Radium, { StyleRoot } from 'radium'; //to manage inline styles on React elements
//import styled from 'styled-components';
import Aux from '../../hoc/Aux';
import classes from './Person.css';
import withClass from '../../hoc/withClass';
import AuthContext from '../../context/auth-context';

class Person extends Component {
//const person = (props) => {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }
    componentDidMount () { //executes after render function.
        //this.inputElement.focus(); //refs
        this.inputElementRef.current.focus();
    }
    //dynamic content.
    //return <p>I am a person and I am { Math.floor(Math.random() * 30) } years old</p>;
    //Using method from another component: props.swicthnameclick - swicthnameclick is a property in App.js
    //<StyleRoot> is to avoid error about media queries
    render() {
        let style = {
            '@media (min-width:500px)': {
                width: '450px'
            }
        };

        // return (
        //     <div className='Person' style={ style }>

        //         <p onClick={ this.props.deleteclick }>I am a person. My name is { this.props.name } and I am { this.props.age } years old.</p>
                
        //         <p>{ this.props.children }</p>

        //         <input type="text" value={ this.props.name } onChange={ this.props.changed }/>
        //     </div> 
        // );


        //to return adjacent JSX elements, put em in an array.
        // return [
        //     <p key="k1" onClick={ this.props.deleteclick }>
        //         I am a person. My name is { this.props.name } and I am { this.props.age } years old.
        //     </p>,
                
        //     <p key="k2">{ this.props.children }</p>,

        //     <input key="k3" type="text" value={ this.props.name } onChange={ this.props.changed }/>
        // ];

        //to return adjacent JSX elements, using a Higher Order Component (Aux).
        // return (
        //     <Aux>
        //         <p onClick={ this.props.deleteclick }>
        //             I am a person. My name is { this.props.name } and I am { this.props.age } years old.
        //         </p>
                    
        //         <p>{ this.props.children }</p>

        //         <input type="text" value={ this.props.name } onChange={ this.props.changed }/>
        //     </Aux>
            
        // );

        //to return adjacent JSX elements, using React.Fragment
        return (
            // <React.Fragment>
            <Aux>
                <AuthContext.Consumer>
                    { 
                        context => { context.authenticated ? <p>Authenticated</p> : <p>Please login</p> }
                    }
                </AuthContext.Consumer>
                <p onClick={ this.props.deleteclick }>
                    I am a person. My name is { this.props.name } and I am { this.props.age } years old.
                </p>
                    
                <p>{ this.props.children }</p>

                <input 
                    //ref={ (inputEl) => this.inputElement = inputEl } 
                    ref={ this.inputElementRef }
                    type="text" value={ this.props.name } onChange={ this.props.changed }/>
            </Aux>
            // </React.Fragment>
            
        );
    }
    
};

//specifying whether prop is function, string etc.
Person.propTypes = {
    deleteclick: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

//export default Radium(person);
export default withClass(Person, classes.Person);