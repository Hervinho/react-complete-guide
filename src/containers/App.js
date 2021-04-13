import classes from './App.css';
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import React, { Component, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../components/hoc/withClass';
import Aux from '../components/hoc/Aux';
import AuthContext from '../components/context/auth-context';
//import Radium, { StyleRoot } from 'radium'; //to manage inline styles on React elements

//Note: always use functional components as much as possible - Recommended
/*const App = (props) => {

  //using hooks so we can use states in functional component. Only use states at specifc components
  const [ personsState, setPersonsState ] = useState({
    persons: [{ name: "Luigi", age: 29 }, { name: "Mario", age: 46 }],
  });

  const [ otherState, setOtherState ] = useState('some value');

  console.log(personsState);

  const togglePersonHandler = () => {
    console.log('clicked');
    //Don't do this ==> this.state.persons[0].name = "Hello";
    
    //this replaces the old state.
    setPersonsState({
      persons: [{ name: "Luigi1", age: 29 }, { name: "Mario1", age: 46 },],
      //otherState: personsState.otherState //manually include the other part
    });
    console.log('togglePersonHandler', personsState);
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <p>It is working</p>
      <button onClick={togglePersonHandler}>Swicth name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>I save princesses for a living</Person>
    </div>
  );
}*/

//can also use class-based components
// Note: states only work in classes that extends Component.
// Props are set from outside, states are managed inside a component
class App extends Component {

  constructor (props) {
    super(props);
    console.log('App.js contructor');
  }

  state = {
    persons: [{ id: 'abc', name: 'Mario', age: 49 }, { id: 'def', name: 'Luigi', age: 46 },],
    otherState: 'some value',
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('App.js - shouldComponentUpdate');
  //   //console.log();
  //   if (nextProps.persons !== this.state.persons) {
  //     return true;
  //   } else {
  //     return false;
  //   }
    
  // }

  componentDidMount() {
    console.log('App.js - componentDidMount');
  }

  swicthNameHandler = (newName) => {
    console.log('swicthNameHandler');
    //Don't do this ==> this.state.persons[0].name = "Hello";
    this.setState({
      persons: [{ name: newName, age: 49 }, { name: "Mario1", age: 26 },],
      //otherState: 'some value'
    });
  }

  togglePersonHandler = () => {
    console.log('togglePersonHandler');
    //Don't do this ==> this.state.persons[0].name = "Hello";
    const show = this.state.showPersons;
    this.setState({ showPersons: !show });
  }

  loginHandler () {
    this.setState({ authenticated: true });
  }

  nameChangeHandler = (event, id) => {
    let personIndex = this.state.persons.findIndex(p => { //findIndex is a JS method that can be used on arrays
      return p.id === id;
    });

    let person = { ...this.state.persons[personIndex] }; //make a copy of the object. Do not mutate the state
    person.name = event.target.value; //update the object

    let peeps = [ ...this.state.persons ];
    //console.log(personIndex, person);
    peeps[personIndex] = person;

    //corrctly changing state
    this.setState((prevState, props) => {
      return {
        persons: peeps,
        changeCounter: prevState.changeCounter + 1
        //persons: [{ id: 'abc', name: event.target.value, age: 49 }, { id: 'def', name: "Mario1", age: 26 },],
        //otherState: 'some value'
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    console.log('deletePersonHandler');
    //const peeps = this.state.persons.slice(); //copy of array
    const peeps = [...this.state.persons];
    peeps.splice(personIndex, 1);
    this.setState({ persons: peeps });
  }

  //Note: a state change will always call the render() method. Hence if this.state.showPersons is false,
  //persons will be reste to null
  render() {
    
    // let buttonStyle = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': { //CSS pseudo-selectors made possible through Radium
    //     backgroundColor: 'lightgreen',
    //     color: 'black',
    //   }
    // };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons={ this.state.persons }
            clicked={ this.deletePersonHandler }
            changed={ this.nameChangeHandler }
            isAuthenticated={ this.state.authenticated }/>
          {/* { this.state.persons.map((person, index) => {
            //ErrorBoundary catches any error inside component it is wrapping.
            //only use it in case you have a code that may fail.
              // return <ErrorBoundary key={ person.id } > <Person deleteclick={ () => this.deletePersonHandler(index) } 
              //   name={ person.name } 
              //   age={ person.age } 
                
              //   changed={ (event) => this.nameChangeHandler(event, person.id) } /></ErrorBoundary> 
            }) 
          } */}
              {/* <Person 
                swicthnameclick={ this.swicthNameHandler.bind(this, 'Luigi2') } 
                namechanged={ this.nameChangeHandler }
                name={ this.state.persons[0].name } 
                age={ this.state.persons[0].age }/>
                
              <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age }>I save princesses for a living</Person> */}
        </div>
      );

      //setting styles dynamic.
      // buttonStyle.backgroundColor = 'red';
      // buttonStyle[':hover'] = { //CSS pseudo-selectors made possible through Radium
      //   backgroundColor: 'lightred',
      //   color: 'black',
      // }
    }

    //let styleClasses = ['red', 'bold'].join(' ');//'red bold'
    // let styleClasses = [];

    // //setting class names dynamically.
    // if (this.state.persons.length >= 2) {
    //   styleClasses.push('red'); // ['red']
    // } 
    // if (this.state.persons.length >= 1) {
    //   styleClasses.push('bold'); // ['red', 'bold']
    // }
    
    return (
      // <StyleRoot>
      <Aux>
        <div className="App">
          <AuthContext.Provider value={{ authenticated: this.state.authenticated }}>
            <Cockpit 
              showPersons={ this.state.showPersons } 
              personsLength={ this.state.persons.length }
              clicked={ this.togglePersonHandler } 
              login={ this.loginHandler }/>
            { persons }
          </AuthContext.Provider>
        </div>
      
      </Aux>
      // </StyleRoot> 
      
    );

    // this is same as return statement above
    //return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello world'));
  }
}

export default withClass(App, classes.App);
//export default App;
