import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './App.css';
import { WORDS } from './shared/words';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, Container } from "mdbreact";

class Header extends Component {

  render(){
    return(
      <div className="jumbo">
        <Jumbotron id="jumbo" className="jumbo">
          <h1 className="display-3">Diceware</h1>
          <p className="lead">Let's generate a more secure password!</p>
        </Jumbotron>
      </div>
    )
  }
}

const Footer = () => {

  return (
    <Container>
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
            I followed the example of <a href="http://www.dicewarepasswords.com/" target="_blank" rel="noopener noreferrer">Mani Modi</a>. She put together a great site full of information! 
              Check out her About page and buy a password from her if you want one. This site was put together as a ReactJS portfolio project.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Resources</h5>
            <ul>
              <li>
                <a href="http://www.dicewarepasswords.com/" target="_blank" rel="noopener noreferrer">Mani Modi</a>
              </li>
              <li>
                <a href="www.diceware.com/" target="_blank" rel="noopener noreferrer">Diceware Passphrase Home Page</a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Diceware" target="_blank" rel="noopener noreferrer">Diceware Wiki</a>
              </li>
              <li>
                <a href="https://github.com/jbettyas/diceware" target="_blank" rel="noopener noreferrer">github</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="http://www.projecthep.com"> ProjectHep.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </Container>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: WORDS,
      dropdownOpen: false,
      finalCodes: []
    };

  }

  generateNumbers() {

    this.setState({ finalCodes: [] });
    var wordCodes = [];
    var storeNumbers = [];
    var finalPass = [];

    for(var j=1; j<6 + 1; j++){

      for(var i=1; i<6; i++){

        var randomNumber = Math.floor(Math.random() * 6) + 1;
        storeNumbers.push(randomNumber);
      }

      wordCodes.push(storeNumbers.join(''));

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

  resetValues() {
    this.setState({ finalCodes: [] })
  }

  render() {

    console.log(this.state.finalCodes.join(' '));

    var passOneContent = this.state.finalCodes.join('') !== "" ? <p className="lead"><strong>Your new password is:</strong></p> : null;
    var passAllContent = this.state.finalCodes.join('') !== "" ? <p className="lead"><strong>The words used in the password are:</strong></p> : null;

    return (
      <div className="App">
        <Header />
        <Container>
          <p className="lead">Diceware is a great way to create a secure password with lots of entropy. You can find a lot more information about Diceware 
          listed in the footer at the bottom of the page. This password generator uses six words to build your new, random password.</p>
          <h4 className="lead"><strong>Click the button below to create a new password</strong></h4><br/>

          <Button color="success" onClick={() => this.generateNumbers()}>Generate Password</Button>

          <br/><br/>

          <div>
            {passOneContent}
            <h3 className="lead" id="visible-input">{this.state.finalCodes.join('')}</h3>  
          </div>
          <br/>
          <div>
            {passAllContent}
            <h3 className="lead">{this.state.finalCodes.join(' ')}</h3>
          </div>
          <br/>
          <Button color="danger" onClick={() => this.resetValues()}>Reset</Button>


        </Container>
        <br/><br/>
        <Footer />        
      </div>
    );
  }
}

export default App;
