import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './App.css';
import { WORDS } from './shared/words';

class Header extends Component {

  render(){
    return(
      <div>
        <Jumbotron>
          <h1 className="display-3">Diceware</h1>
          <p className="lead">Let's get a new password!</p>
        </Jumbotron>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: WORDS,
      finalCodes: []
    };
  }

  generateNumbers() {
    this.setState({ finalCodes: [] });
    var wordCodes = [];
    var storeNumbers = [];
    var finalPass = [];

    for(var j=1; j<7; j++){

      for(var i=1; i<6; i++){

        var randomNumber = Math.floor(Math.random() * 6) + 1;
        storeNumbers.push(randomNumber);
      }

      wordCodes.push(storeNumbers.join(''));
      //this.state.finalCodes.push(storeNumbers.join(''));

      console.log(wordCodes);

      for(var k=0; k<this.state.words.length; k++) {
        if(wordCodes[0] === JSON.stringify(this.state.words[k].number)) {
          finalPass.push(this.state.words[k].word);
        }
      }

      storeNumbers = [];
      wordCodes = [];
    }

    console.log(finalPass);
    
    //console.log(JSON.stringify(this.state.finalCodes.join(' ')));

    this.setState({ finalCodes: finalPass });
  }

  render() {

    console.log(this.state.finalCodes.join(' '));

    var passContent = this.state.finalCodes.join('') !== "" ? <p>Your new password is: </p> : null;

    return (
      <div className="App">
        <Header />
        <h4 className="lead">Click the button below to create a new password</h4><br/>
        <Button color="danger" onClick={() => this.generateNumbers()}>Generate Password</Button>
        <br/><br/>
        <div>
        {passContent}
            <h3 className="lead" id="visible-input">{this.state.finalCodes.join('')}</h3>
            
        </div>
        <br/>
        <div>
          <h3 className="lead">{this.state.finalCodes.join(' ')}</h3>
        </div>
        
      </div>
    );
  }
}

export default App;
