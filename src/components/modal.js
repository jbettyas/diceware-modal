import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { WORDS } from '../shared/words';

class PasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      words: WORDS,
      dropdownOpen: false,
      finalCodes: [],
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

  render() {

    var passOneContent = "passOneContent";
    var passOneLength = "passOneLength";
    var passAllContent = "passAllContent";

    //var passOneContent = this.state.finalCodes.join('') !== "" ? 'Your new password is:' : null;
    //var passOneLength = this.state.finalCodes.join('') !== "" ? 'That is '+this.state.finalCodes.join('').length+' characters long' : null;

    //var passAllContent = this.state.finalCodes.join('') !== "" ? 'The words used in the password are:' : null;

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Modal Generate</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Your new password information</ModalHeader>
          <ModalBody>

          <Row>
            <Col>
              <div>
               <h4>{passOneContent}</h4>
               {/*  <h5>{this.props.finalCodes.join('')}</h5> */}
              </div>
              <div>
                <p>{passOneLength}</p>
                <p>{passAllContent}</p>
               {/*  <p>{this.props.finalCodes.join(' ')}</p> */}
              </div>

            <div>
                <p>FinalCodes State</p>
                <p>{this.state.finalCodes}</p>
                {console.log(this.state.finalCodes)}
            </div>

            </Col>
          </Row>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PasswordModal;