import React , {Component} from 'react';
import {Card} from "react-bootstrap";
import ModalPlaceHolder from '../Components/ModalComponent.js';
import not_found from './simple-image-not-found-icons.png';
import "../Components/modal.css";
import '../font/mandalore.ttf';


class NFTDivComponent extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    if(!(this.props.data.rawMetadata.image === undefined)){
      var imageLink = this.props.data.rawMetadata.image.split("ipfs://")[1];
      if(!(imageLink === undefined)){
      this.setState({ image : "https://ipfs.io/ipfs/" + this.props.data.rawMetadata.image.split("ipfs://")[1] });
      }
      else{
        this.setState({ image : not_found });
      }
   }
  }

  state = {
    show: false,
    image: ''
  };

  componentWillReceiveProps(props) {
    if(!(this.props.data.rawMetadata.image === undefined)){
      var imageLink = this.props.data.rawMetadata.image.split("ipfs://")[1];
      if(!(imageLink === undefined)){
      this.setState({ image : "https://ipfs.io/ipfs/" + this.props.data.rawMetadata.image.split("ipfs://")[1] });
      }
      else{
        this.setState({ image : not_found });
      }
   }
  }

  truncate = str => {
    if(str === undefined || str !== "" || str == null || str !== " "){
      return str;
    }else{
      return str.length > 10 ? str.substring(0, 9) + "..." : str;
    }
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
    <Card className={"card-grid"} key={this.props.index} onClick={e => {
      this.showModal(e);
    }}>
      <Card.Img className={"card-img"} width="100px" height="100px" src={this.state.image} alt="Not Found"></Card.Img>
      <Card.Body className={"card"}>
      <Card.Title><strong className="mandfont">{this.props.data.contract.name} #{this.truncate(this.props.data.tokenId)}</strong></Card.Title>
      <ModalPlaceHolder onClose={this.showModal} show={this.state.show} propData={this.props}>
        </ModalPlaceHolder>
        </Card.Body>
     </Card>
    );
  }
}

export default NFTDivComponent;
