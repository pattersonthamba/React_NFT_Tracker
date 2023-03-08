import React from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import "../Components/modal.css";
import '../font/mandalore.ttf';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default class ModalPlaceHolder extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.openseaLink = 'https://opensea.io/assets/ethereum/'+ this.props.propData.data.contract.address + '/' + this.props.propData.data.tokenId
  }

  componentWillReceiveProps(props) {
    this.props = props;
    this.openseaLink = 'https://opensea.io/assets/ethereum/'+ this.props.propData.data.contract.address + '/' + this.props.propData.data.tokenId
  }
  
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  truncate = str => {
    if(str === undefined || str !== "" || str == null || str !== " "){
      return str;
    }else{
      return str.length > 10 ? str.substring(0, 9) + "..." : str;
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <Box sx={style}>
        <Button onClick={this.onClose} className="mandfont">
          <CancelPresentationIcon> Close </CancelPresentationIcon>
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <h2 className="mandfont">{this.truncate(this.props.propData.data.contract.name)} #{this.truncate(this.props.propData.data.tokenId)}</h2>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="mandfont">Description : {this.props.propData.data.description}</div>
        <div className="mandfont">Check on Opensea : <a href={this.openseaLink} target="_blank" rel="noreferrer">
        <img width="20px" height="20px" src="https://opensea.io/static/images/logos/opensea.svg" alt="Test"></img>
        </a></div>
          </Typography>
          
        </Box>
    );
  }
}

ModalPlaceHolder.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};