import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Form from 'react-bootstrap/Form';
import HalfSun from './Components/HalfSun';


const queryClient = new QueryClient()

function DataFetcher() {
  const [ip, setIp] = useState('')
  const [isValidIp, setIsValidIp] = useState(false)

  const { data : locationData } = useQuery(['getLocation'], () =>
    fetch(`https://api.ipbase.com/v2/info?apikey=UCrV75qlfBtYfzcwZKolMtoPrmD3U4bBb4q3oRNl&ip=${ip}`).then(res =>
      res.json()
    ),{enabled: isValidIp}
  )

  const { data : sunData } = useQuery(['getSunrise', locationData], () =>
    fetch(`https://api.sunrise-sunset.org/json?lat=${locationData?.data?.location?.latitude}&lng=${locationData?.data?.location?.longitude}&date=today`).then(res =>
      res.json()
    ),{enabled: !!locationData && !!ip}
  )

  const validateIPaddress = (ipaddress) => {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
  
    return (false)  
  }  

  const handleChange = (e) => {
    setIp(e.target.value)
    if(validateIPaddress(e.target.value)){
      setIsValidIp(true)
    }else{
      setIsValidIp(false)
    }
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter IP</Form.Label>
          <Form.Control value={ip} onChange={(e)=>{handleChange(e)}} type="email" placeholder="ip" />
        </Form.Group>
      </Form>
      <HalfSun
        title={'sunrise'}
        timeDisplay={sunData?.results?.sunrise}
        isSunUp
      />
      <div className='spacer'/>
      <HalfSun
        title={'sunset'}
        timeDisplay={sunData?.results?.sunset}
        isSunUp={false}
      />
    </>
  )
}


function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <DataFetcher/>
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
