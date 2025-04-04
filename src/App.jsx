import React from 'react'
import axios from 'axios';
import '../dist/output.css'
import processTransc from './processTransc';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';



function App() {
  
  const [embededUrl, setEmbededUrl] = React.useState("")
  const [transcript, setTranscript] =  React.useState(new Map([]))
  const [currentVidDuration, setCurrentVidDuration] = React.useState('')
  const [error, setError] = React.useState('')


  
//Homepage component
  const Homepage = () => {
    // Hoempage logic
    const navigate = useNavigate()
    const [vidUrl, setVidUrl] = React.useState("")
    

    async function getTranscriptApi() {
      const response = await axios({
        method: 'post',
        url: 'https://wv-backserver.vercel.app/api',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {url: vidUrl}
      })
      .then((response) => {
        console.log(response.data)
        const resp_data = response.data
        const transcMap = processTransc(resp_data.transcript)
        setTranscript(transcMap)
        setCurrentVidDuration(resp_data.duration)
        navigate('/wordvid/dashboard')
      })
      .catch((error) => {
        // console.log("something went wrong :(")
        setError("Error, the url is not valid.")
      })
    }

    function submitHandler() {
      // console.log(vidUrl)
      getEmbededUrl(vidUrl)
    }

    async function getEmbededUrl(vid_url) {

      let _vid_url = vidUrl.slice(0,43)
      let vid_id = vid_url.slice(32, _vid_url.length)
      let embed_url = "https://www.youtube.com/embed/" + vid_id
      // console.log("embeded url: ", embed_url)
      setEmbededUrl(embed_url)
      getTranscriptApi()
      
    }

    //Homepage UI
    return (
      <div className="h-screen from-first-grd to-sec-grd bg-gradient-to-tr flex flex-col items-center p-4">
        <div><div className='w-20 h-20 rounded-full flex justify-center items-center bg-bg-circle border-2 border-circle-br text-circle-br text-4xl mb-16 mt-4'>1</div></div>
        <div className='text-circle-br font-semi-bold text-2xl leading-5 mb-4 text-center'>Firstly, Upload a Youtube video.</div>
        <div className='text-white font-bold text-4xl text-center'>Start and Tinker</div>
        <div className="w-40 relative flex py-6 items-center">
          <div className="flex-grow border-t border-circle-br"></div>
        </div>
        <div className='h-auto max-w-2xl mb-6'>
          <div className='text-white text-xl text-center'>Please make sure that the video url you're providing has a transcript.</div>
        </div>
        <div className='h-15 wa-[40rem] auato border-[1px] rounded-lg shadow shadow-circle-br border-circle-br flex flex-row justify bg-transparent sm:w-40rem w-full max-w-2xl' >
          <input onChange={(event) => {setVidUrl(event.target.value)}} className='p-4 h-full w-full bg-transparent outline-none border-none text-white' type="text" placeholder="Paste your video link here"></input>
          <div className='w-full max-w-[7rem] rounded-r-lg flex justify-center items-center'>
            <div onClick={submitHandler} className='m-3 h-8 w-[5rem] bg-btn-prim flex content-center items-center p-1 rounded-md text-white cursor-pointer hover:bg-btn-sec'>Submit ➜</div>
          </div>
        </div>
        <div className='text-red-500 text-xs text-center mt-2'>{error}</div>
      </div>
    )
  }



  const Dashboard = () => {
    const navigate = useNavigate()
    const [wordIsValid, setWordIsValid] = React.useState(null)
    const [searchingWord, setSearchingWord] = React.useState('')
    const [wordObjct, setWordObjct] = React.useState({
      word: '',
      time: 0,
      duration: 0,
      countArr: []
    })

    function searchHandler(word) {
      if (transcript.get(word)) {
        setWordIsValid(true)
        setWordObjct(transcript.get(word))
      }
      else {
        setWordIsValid(false)
      }
    }

    function fromatToSec(timeFormatStr) {
      // console.log(timeFormatStr)
      timeFormatStr = timeFormatStr + '.'
      let fullTimeInSec = 0
      let hs = ''
      let ms = ''
      let ss = ''
      
      let ind = 0
      while (timeFormatStr[ind] !== ":") {
        hs += timeFormatStr[ind]
        ind += 1
      }
      fullTimeInSec += ((hs * 1) * 3600)
      ind += 1
    
      while (timeFormatStr[ind] !== ":") {
        ms += timeFormatStr[ind]
        ind += 1
      }
      fullTimeInSec += ((ms * 1) * 60)
      ind += 1
    
      while (timeFormatStr[ind] !== ".") {
        ss += timeFormatStr[ind]
        ind += 1
      }
      fullTimeInSec += (ss * 1)
    
      return fullTimeInSec
    }


    let ind = -1
    const timeStamps = wordObjct.countArr.map((ts) => {
    let currentVidDurationInSec =  fromatToSec(currentVidDuration)
    const tsInPerc = (ts * 100) / currentVidDurationInSec
    // console.log("word: ", wordObjct.word, "fullviddur: ", currentVidDuration, "fullviddurinsec: ", currentVidDurationInSec, "tsinsec: ", ts, "tsin%", tsInPerc, "%")
    ind += 1
      return <div key={ind} className='absolute bottom-[3.8px] h-1 flex justify-end' style={{"width": `${tsInPerc}%`}}>
        <div className='relative left-[1%] w-[6px] h-[3.8px] bg-dash hover:h-[10px] bg-dash' ></div>
        </div>
    })


    return (
      <div className='h-screen w-[100%] overflow-auto from-first-grd to-sec-grd bg-gradient-to-tr flex flex-col items-center text-white p-4'>
        <div><div className='w-20 h-20 rounded-full flex justify-center items-center bg-circle-dash border-2 border-dash text-dash text-4xl mb-10 mt-4'>2</div></div>
        <div className='text-dash font-semi-bold text-2xl leading-5 mt-4 mb-4 text-center'>Up and Running</div>
        <div className='text-white font-bold text-4xl text-center'>The video is ready, search for a word!</div>
        <div className="w-40 relative flex py-6 items-center mb-10">
          <div className="flex-grow border-t border-dash"></div>
        </div>
        <div className='h-auto max-w-2xl mb-6'>
          <div className='text-white text-xl text-center text-center'>Check the video for time stamps.</div>
        </div>
        <div className='h-15 aw-[40rem] border-[1px] border-dash rounded-lg shadow shadow-dash flex flex-row justify bg-transparent mb-10 sm:w-40rem w-full max-w-2xl'>
          <input onChange={(event) => {setSearchingWord(event.target.value)}} className='p-4 h-full w-full bg-transparent outline-none border-none text-white' type="text" placeholder="Search for a word here"></input>
          <div className='w-full max-w-[7rem] rounded-r-lg flex justify-center items-center'>
            <div onClick={() => {searchHandler(searchingWord)}} className='m-3 h-8 w-[4.8rem] bg-btn-prim flex content-center items-center p-1 rounded-md text-white cursor-pointer hover:bg-btn-sec'>Search ➜</div>
          </div>
        </div>
        {wordIsValid === false && <div className='text-red-500 text-xs text-center mt-2 text-center'>Error, the word doesn't exist.</div>}
        {wordObjct.word !== "" &&         
        <div className='h-auto max-w-2xl mb-6'>
          <span className='text-white font-bold text-4xl'>{wordObjct.word}</span>
          <span className='text-white text-xl text-center ml-4 text-center'>has been said {wordObjct.countArr.length} time(s)</span>
        </div>}

        <div>
          <iframe className='m-10 h-[560px] w-[1000px]'src={embededUrl} title="YouTube video player" controls='0' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          <div className=' w-[976px] h-[1px] relative bottom-[4.8rem] ml-[3.3rem] flex flex-row '>
            {timeStamps}
          </div>
        </div>
        <div className='h-2 w-[1000px] flex justify-end mb-[80px]'>
          <div className='text-slate-400 hover:text-white cursor-pointer italic text-xs ' onClick={() => {navigate('/wordvid/')}}>try another video?</div>
        </div>
        <div className='flex flex-row'>
          <div className='text-slate-400 text-xs'>Copyright © 2022</div>
          <div className='text-slate-400 text-xs pl-2 cursor-pointer' onClick={() => {window.location.replace("https://github.com/AbedElRazzak?tab=repositories")}}>AbedElRazzak.</div>
        </div>
        <div className='text-slate-400 text-xs mb-4'>All rights reserved.</div>

      </div>
    )
  }


  




  return (
    // <div className='bg-red-300 h-screen w-[100%] overflow-auto'>
    //   <div className='bg-transparent h-[200px]'>test</div>
    //   <div className='bg-transparent h-[200px]'>test</div>
    //   <div className='w-20 h-20 rounded-full flex justify-center items-center bg-circle-dash border-2 border-dash text-dash text-4xl mb-10 mt-4'>2</div>
    //   <div className='bg-transparent h-[200px]'>test</div>
    //   <div className='bg-transparent h-[200px]'>test</div>
    //   <div className='bg-transparent h-[200px]'>test</div>
    // </div>
    <Router>
      <Routes>
        <Route exact path='/wordvid/' element={<Homepage />}></Route>
        <Route exact path='/wordvid/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </Router>
      
  )
}

export default App

