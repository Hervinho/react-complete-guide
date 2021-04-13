import React, { Component, PureComponent } from 'react';
import Person from './Person/Person';

//PureComponent is to manage components updates

class Persons extends PureComponent {
//const persons = (props) => (
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('Persons.js - shouldComponentUpdate');
    //     if (nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked) {
    //       return true;
    //     } else {
    //       return false;
    //     }
        
    // }

    // static getDerivedStateFromProps () {
    //     console.log('Persons.js - getDerivedStateFromProps');
    // } 

    render () {
        console.log('Persons.js rendering...')
        return this.props.persons.map((person, index) => {
            //only use it in case you have a code that may fail.
            return (<Person deleteclick={ () => this.props.clicked(index) } 
                name={ person.name } 
                age={ person.age } 
                key={ person.id }
                changed={ (event) => this.props.changed(event, person.id) } />)
        })
    }
    
};

export default Persons;