import React , {useState , useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NFTDivComponent from './Components/NFTDivComponent';
import {Network , Alchemy} from 'alchemy-sdk';
import logo from './logo_1.png';
import './App.css';
import './font/Phoenix Gaming.ttf';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [data1 , setData] = useState([]);
  const [address , setAddress] = useState(null);
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
  }

  const alchemy = new Alchemy(settings);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getNFT(address){
          const nfts = alchemy.nft.getNftsForOwner(address);
          await nfts.then((res)=> {
            setData(res.ownedNfts);
            console.log(data1);
          }).catch((error)=> {
            console.log(error);
            setData([]);
          })
  }

  useEffect(() => {
    getNFT(address)
      .catch(console.error);;
  }, [address, getNFT]);
  
  const handleChange = React.useCallback((event) => {
    setAddress(event.target.value);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="230px" height="100px" className="App-logo" alt="logo" />
          <p className='ethAddress'>
             Enter ETH address : <input type="text" id="eth_address" onChange={handleChange}></input> 
          </p>
        </header>
          <body>
          <Grid container spacing={2}>
        {data1.map((data , index) => {
          return(
            <Grid item xs={3}>
              <Item><NFTDivComponent data={data} index={index}></NFTDivComponent></Item>
            </Grid>
          );
        })}
        </Grid>
         </body>
      </div>
  );
}

export default App;
