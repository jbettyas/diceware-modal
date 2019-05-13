import React, { Component } from 'react';
import { Jumbotron, Button, Col, Row, Card, CardHeader, CardBody,
  CardTitle, CardText } from 'reactstrap';
import './App.css';
import { WORDS } from './shared/words';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, Container } from "mdbreact";

class Header extends Component {

  render(){
    return(
      <div>
        <Jumbotron id="jumbo" className="jumbo">
          <h1 className="display-3">Diceware</h1>
          <p>Let's generate a more secure password!</p>
        </Jumbotron>
      </div>
    )
  }
}

const Footer = () => {

  return (
    <div className="MDBFooter">
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
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: WORDS,
      dropdownOpen: false,
      finalCodes: [],
      selectValue: ''
    };
    this.getInitialState = this.getInitialState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  generateNumbers() {

    //console.log(this.state.selectValue);

    this.setState({ finalCodes: [] });
    var wordCodes = [];
    var storeNumbers = [];
    var finalPass = [];

    for(var j=1; j<=this.state.selectValue; j++){
      //console.log(holdValue);

      for(var i=1; i<6; i++){

        var randomNumber = Math.floor(Math.random() * 6) + 1;
        storeNumbers.push(randomNumber);
        //console.log(randomNumber);
      }

      wordCodes.push(storeNumbers.join(''));

      //console.log(wordCodes);

      for(var k=0; k<this.state.words.length; k++) {
        if(wordCodes[0] === JSON.stringify(this.state.words[k].number)) {
          finalPass.push(this.state.words[k].word);
          
        }
      }

      storeNumbers = [];
      wordCodes = [];
    }

    //console.log(finalPass);
    
    //console.log(JSON.stringify(this.state.finalCodes.join(' ')));

    this.setState({ finalCodes: finalPass });
  }

  resetValues() {
    this.setState({ finalCodes: [] });
  }

  getInitialState(){
    return { selectValue:'' };
  }
  handleChange(e){
    this.setState({ selectValue: e.target.value });
  }

  render() {
    //console.log(this.state.finalCodes.join(' '));

    var message = this.state.selectValue !== "" ? 'You selected '+this.state.selectValue+' words' : null;

    var passOneContent = this.state.finalCodes.join('') !== "" ? 'Your new password is:' : null;
    var passOneLength = this.state.finalCodes.join('') !== "" ? 'That is '+this.state.finalCodes.join('').length+' characters long' : null;

    var passAllContent = this.state.finalCodes.join('') !== "" ? 'The words used in the password are:' : null;

    var clearButton = this.state.finalCodes.join('') !== "" ? <Button color="danger" onClick={() => this.resetValues()}>Clear</Button> : null

    return (
      <div className="App">
        <Header />
        <Container>
          <Row>
            <Col>
              <p>Diceware is a great way to create a secure password with lots of entropy. You can find a lot more information about Diceware 
              listed below and in the footer at the bottom of the page. This site automates the process by using a random function, but to make it 
              completely secure you should manually use dice of your own, or order from <a href="http://www.dicewarepasswords.com/" target="_blank" rel="noopener noreferrer">Mani Modi</a>.</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>Select how many words you would like to use in your password.</p>
              <div>
                <select 
                  value={this.state.selectValue} 
                  onChange={this.handleChange} 
                >
                  <option value=""># of words</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <br/><br/>
                {message}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
            <Button color="info" onClick={() => this.generateNumbers()}>Generate Password</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <div>
                <h4>{passOneContent}</h4>
                <h5>{this.state.finalCodes.join('')}</h5>
              </div>
              <div>
                <p>{passOneLength}</p>
                <p>{passAllContent}</p>
                <p>{this.state.finalCodes.join(' ')}</p>
              </div>
              {clearButton}
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <Card>
                <CardHeader tag="h3">How</CardHeader>
                <CardBody>
                  <CardTitle>What is Diceware?</CardTitle>
                  <CardText>
                    Diceware is a way to create a random and secure password using dice. Take one dice and roll it five times noting the number of each roll. Once you have a five digit number, 
                    use it to find the corresponding word in the <a href="http://world.std.com/~reinhold/dicewarewordlist.pdf" target="_blank" rel="noopener noreferrer">Diceware word sheet</a>. Each word you create adds more entropy to your password.
                  </CardText>
                </CardBody>
              </Card>
              <hr className="d-md-none" />
            </Col>
            <Col md="4">
              <Card>
                <CardHeader tag="h3">Entropy</CardHeader>
                <CardBody>
                  <CardTitle>What is it?</CardTitle>
                  <CardText>
                    The entropy of an object is a measure of the amount of energy which is unavailable to do work. Basically, the longer the password the more entropy it takes to 
                    crack it. Make sure you pick a length that fits your needs or view of security.<br/><br/>
                  </CardText>
                </CardBody>
              </Card>
              <hr className="d-md-none" />
            </Col>
            <Col md="4">
              <Card>
                <CardHeader tag="h3">Secure</CardHeader>
                <CardBody>
                  <CardTitle>What could crack your password?</CardTitle>
                  <CardText>
                    <strong>5 words</strong> - ~1,000 computers with high-end graphics card<br/>
                    <strong>6 words</strong> - a large countries security agency<br/>
                    <strong>7 words</strong> - unbreakable until about 2030<br/>
                    <strong>8 words</strong> - unbreakable until about 2050<br/>
                    <strong>9 words</strong> - this starts to get excessive<br/>
                    <strong>10 words</strong> - equivalent to 128bit security
                  </CardText>
                </CardBody>
              </Card>

            </Col>
          </Row>


        </Container>
        
        <Footer />        
      </div>
    );
  }
}

export default App;
