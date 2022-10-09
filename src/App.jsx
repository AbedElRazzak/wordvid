import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
// import cors from 'cors'
// import { json } from 'express'
// import express from 'express'


function App() {

  const [vidUrl, setVidUrl] = React.useState("https://www.youtube.com/embed/D9cPAuZIigs")
  const [embededUrl, setEmbededUrl] = React.useState("")
  const [transcript, setTranscript] =  React.useState("")

  async function getEmbededUrl(vid_url) {
    let temp_url = vid_url.slice(32, vid_url.length)
    let embed_url = "https://www.youtube.com/embed/" + temp_url
    console.log("embeded url: ", embed_url)
    setEmbededUrl(embed_url)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: vidUrl})
    }
    const response = await fetch('https://wordvidbackserver.herokuapp.com/api', options)
    const resp_data = await response.json()
    console.log("resp: ", resp_data)
    setTranscript(resp_data.data)

  }



  return (
    <div className="App">

      <input className='input' type="text" placeholder='youtube video url' onChange={(event) => {setVidUrl(event.target.value)}}></input>
      <div className='subBtn' onClick={() => {getEmbededUrl(vidUrl)}}>Submit</div>
      <Container>
        <iframe width="560" height="315" src={embededUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Container>
      <p>{transcript}</p>
      
    </div>
  )
}

export default App

