import React, { Component } from 'react';
import { Jumbotron, Button, Col, Row, Card, CardHeader, CardBody,
  CardTitle, CardText, Modal, ModalHeader, ModalBody,
  FormGroup, Form, Input } from 'reactstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, Container } from "mdbreact";
import './App.css';
import { WORDS } from './shared/words';

class Header extends Component {

  render(){
    return(
      <div>
        <Jumbotron id="jumbo" className="jumbo">
          <Row>
            <Col md={{ size: 2, offset: 3 }} xl={{ offset: 3 }}>
              <img src="/projects/diceware/red_dice.png" alt="red dice" style={{ width: 150 }}></img>
            </Col>
            <Col md={{ size: 4 }} xl={{ size: 3 }}>
              <h1 className="display-3">Diceware</h1>
              <p>Let's generate a more secure password!</p>
            </Col>
          </Row>
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
                <h5 className="title">About</h5>
                <p>
                I learned about this by <a href="https://www.youtube.com/watch?v=rGwSxwPcH1U" target="_blank" rel="noopener noreferrer">watching a feature</a> about <a href="http://www.dicewarepasswords.com/" target="_blank" rel="noopener noreferrer">Mani Modi</a>. 
                  She put together a great site full of information about Diceware. 
                  Check out her <a href="http://www.dicewarepasswords.com/about" target="_blank" rel="noopener noreferrer">About page</a> and buy a password from her want a really secure one. 
                  <br/><br/>
                  This site was put together as a ReactJS portfolio project.
                </p>
              </MDBCol>
              <MDBCol md="6">
                <h5 className="title">Resources</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="http://www.dicewarepasswords.com/" target="_blank" rel="noopener noreferrer">Mani Modi</a>
                  </li>
                  <li>
                    <a href="https://theintercept.com/2015/03/26/passphrases-can-memorize-attackers-cant-guess/" target="_blank" rel="noopener noreferrer">Passphrases That You Can Memorize...</a>
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
      modal: false,
      words: WORDS,
      dropdownOpen: false,
      finalCodes: [],
      ourLeetWords: [],
      leetWords: [],
      backdrop: false,
      keyboard: false,
      selectValue: ''
    };
    this.getInitialState = this.getInitialState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  generateNumbers() {

    //this.setState({ finalCodes: [] });
    var wordCodes = [];
    var storeNumbers = [];
    var ourLeetWords = [];
    var moreLeet = [];

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const leetalpha = '@8(d3fgh!jk1mn0pqr$+uvwxy2';

    for(var j=1; j<=this.state.selectValue; j++){

      for(var i=1; i<6; i++){
        storeNumbers.push(Math.floor(Math.random() * 6) + 1);
      }

      wordCodes.push(storeNumbers.join(''));

      for(var k=0; k<this.state.words.length; k++) {
        if(wordCodes[0] === JSON.stringify(this.state.words[k].number)) {
          this.state.finalCodes.push(this.state.words[k].word);
        }
      }
      storeNumbers = [];
      wordCodes = [];
    }
    
    //console.log(JSON.stringify(this.state.finalCodes.join(' ')));
    this.state.finalCodes.forEach(function(item){
      var eachWord = item.split('');
      eachWord.forEach(function(item){
        item === 'a' ? ourLeetWords.push('@') : item === 'e' ? ourLeetWords.push('3') : item === 'i' ? ourLeetWords.push('!') : item === 'o' ? ourLeetWords.push('0') : ourLeetWords.push(item);
        alphabet.includes(item) ? moreLeet.push(leetalpha.charAt(alphabet.indexOf(item))) : moreLeet.push(item);
      })
    });

    this.setState({ finalCodes: this.state.finalCodes })
    this.setState({ ourLeetWords: ourLeetWords });
    this.setState({ leetWords: moreLeet });
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

  onClick() {
    this.generateNumbers();
    this.toggle();
  }

  render() {
    //console.log(this.state.finalCodes.join(' '));
    var message = this.state.selectValue !== "" ? 'Generate '+this.state.selectValue+ ' Words' : 'Select # Above';

    ///* Calculate time to crack
    var seconds = (Math.pow(7776, this.state.selectValue)/1000000000000) / 2;
    var minutes = Math.round(seconds / 60);
    var hours = Math.round(minutes / 60);
    var days = Math.round(hours / 24);
    var years = Math.round(days / 365) < 1 ? days / 365 : Math.round(days / 365);

    //var clearButton = this.state.finalCodes.join('') !== "" ? <Button color="danger" onClick={() => this.resetValues()}>Clear</Button> : null

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

              <Form>
                <p>Select how many words you would like to use in your password.</p>
                <Col xs={{ size: 6, offset: 3 }} sm={{ size: 4, offset:4 }} md={{ size: 2, offset: 5 }}>
                  <div>
                    <FormGroup row>
                      <Input 
                        type="select" 
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
                      </Input>
                    </FormGroup>
                  </div>
                </Col>
                  <Button color="danger" onClick={() => {
                    if(this.state.selectValue !== ""){
                      this.generateNumbers();
                      this.toggle();
                      }
                    }}>
                    {message}</Button>
              </Form>

              <Modal 
                keyboard={this.state.keyboard} 
                backdrop={this.state.backdrop} 
                isOpen={this.state.modal} 
                toggle={this.toggle} 
                className="shadow-lg mb-5 rounded">
                <ModalHeader charCode="X" className="modal-header" toggle={() => {
                  this.resetValues();
                  this.toggle();
                  }}>
                  Password Information</ModalHeader>
                <ModalBody>

                  <Row>
                    <Col>
                      <div>
                      <p><strong>The {this.state.selectValue} words used are:</strong><br/>
                        {this.state.finalCodes.join(' ')}</p>
                      </div>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col>
                      <p>Here are some options for a new password:</p>
                      <div className="modal-body">
                        <p><strong>As one word:</strong><br/>
                        {this.state.finalCodes.join('')}</p>

                        <p><strong>Add hyphens:</strong><br/>
                        {this.state.finalCodes.join('-')}</p>

                        <p><strong>Replace some characters:</strong><br/>
                        {this.state.ourLeetWords.join('')}</p>

                        <p><strong>In basic 133+ $p3@k:</strong><br/>
                        {this.state.leetWords.join('')}</p>
                      </div>
                      <div>
                        <p>Remember to add capital letters and at least one symbol to make it more random.</p>
                      </div>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col className="modal-bottom">
                      <div>
                        <br/>
                        <h4>Some Stats</h4><br/>
                      </div>
                    
                      <div>
                        <p><strong>Character length:</strong> {this.state.finalCodes.join('').length}</p>
                        <p><strong>Possible phrases:</strong> {Math.pow(7776, this.state.selectValue).toLocaleString('en')}</p>
                        <p><strong>Entropy:</strong> {parseFloat(this.state.selectValue*Math.log2(7776)).toFixed(2)} bits</p>
                        <p><strong>Seconds to crack:</strong> ~{seconds.toLocaleString('en')}</p>
                        <p><strong>Minutes to crack:</strong> ~{minutes.toLocaleString('en')}</p>
                        <p><strong>Hours to crack:</strong> ~{hours.toLocaleString('en')}</p>
                        <p><strong>Days to crack:</strong> ~{days.toLocaleString('en')}</p>
                        <p><strong>Years to crack:</strong> ~{years.toLocaleString('en')}</p>
                      </div>
                      <div>
                        <p className="text-muted"><small>Based on Edward Snowden’s January 2013 warning of a trillion guesses per second.</small></p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="clear-button">
                        <Button color="danger" onClick={() => {
                          this.resetValues(); 
                          this.toggle();
                          }}>
                          Clear</Button>
                      </div>
                    </Col>
                  </Row>
                </ModalBody>
{/*
                <ModalFooter>
                  <Button color="danger" onClick={() => {
                    this.resetValues(); 
                    this.toggle();
                    }}>
                    Clear</Button>
                </ModalFooter>
*/}
              </Modal>

            </Col>
          </Row>

          <Row className="row-content">
            <Col md="4">
              <Card>
                <CardHeader tag="h3">How</CardHeader>
                <CardBody>
                  <CardTitle>What is Diceware?</CardTitle>
                  <CardText>
                    Diceware is a way to create a random and secure password using dice. Take one dice and roll it five times noting the number of each roll. 
                    Once you have a five digit number, 
                    use it to find the corresponding word in the <a href="http://world.std.com/~reinhold/dicewarewordlist.pdf" target="_blank" rel="noopener noreferrer">Diceware word sheet</a>. 
                    Each word you create adds more entropy to your password.
                  </CardText>
                </CardBody>
              </Card>
              <hr className="d-md-none" />
            </Col>
            <Col md="4">
              <Card>
                <CardHeader tag="h3">Entropy</CardHeader>
                <CardBody>
                  <CardTitle>What is entropy?</CardTitle>
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
                  <CardTitle>What does it take to hack them?</CardTitle>
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
