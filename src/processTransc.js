export default function processTransc(transc) {

    const wordsObjsMap = new Map([])
  
    let i = 0
    let visitedWords = []
    while(i<transc.length) {
  
      let tempTime = transc[i].start
      let tempDuration = transc[i].duration
      let tempPhrase = transc[i].text + " "
      let tempWord = ''
  
  
      let ind = 0
      while(ind<=tempPhrase.length) {
        
        if (tempPhrase[ind] !== " ") {
          tempWord += tempPhrase[ind]
          ind += 1
        }else if(tempPhrase[ind] === " ") {
          // console.log(tempTimeInMin, tempWord)
          tempWord = tempWord.toLocaleLowerCase()
          let tempObjct = {
            word: tempWord,
            time: tempTime,
            duration: tempDuration,
            countArr: [tempTime]
          }
          if (visitedWords.includes(tempWord) === false) {
            wordsObjsMap.set(tempWord, tempObjct)
            visitedWords.push(tempWord)
          }else {
            let prevVisitedObjct = wordsObjsMap.get(tempWord)
            prevVisitedObjct.countArr.push(tempTime)
  
          }
          
          tempWord = ''
          ind += 1
        }
  
      }
      i += 1
  
      
  
      
    }

    console.log("func output: ", wordsObjsMap)

    return wordsObjsMap
  
  }