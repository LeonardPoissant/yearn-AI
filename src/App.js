import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-uYwyErf17jgcAnC9Exm7FdHB",
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [imgsSrcs, setImgsSrcs] = useState([]);
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");
  const [loading, setIsLoading] = useState(false)



const loader = () => {
  return loading ? <div className='loading'>Generating yearn</div> :<></>
}

  const generateYearnImage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
     await openai.createImage({
        prompt: `${firstPart} yearns ${secondPart}`,
        n: 2,
        size: "512x512",
      }).then((res) =>{
    setImgsSrcs(res.data.data)
    setIsLoading(false)
      })
    }catch(err){
      console.log('err', err)
    }
  }

const handleChange = (e, input) =>{
  input === firstPart ? setFirstPart(e.target.value): setSecondPart(e.target.value)
}

  return (
    <div className="App">
      <div className="app_wrapper">
      {loader()}
        <div className="img-wrapper"> 
        {imgsSrcs.map((img) =>(
          <img key={img.url} src={img.url}/>
        ))}      
   
        </div>
        <form className='form_wrapper'>
        <div className='input_wrapper'>
        <textarea value={firstPart} onChange={(e)=>handleChange(e, firstPart)} maxLength="200"></textarea>
        <span>yearns</span>
        <textarea value={secondPart} onChange={(e)=>handleChange(e, secondPart)} maxLength="200"></textarea>    
        </div>
        <button type="submit" onClick={(e) => generateYearnImage(e)}>
         GENERATE YEARN
        </button>
        </form>
      
      </div>
    </div>
  );
}

export default App;
