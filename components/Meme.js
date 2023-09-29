import React from "react";
//import Memesdata from "./Memesdata";

export default function Header(){

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })

    const [allmemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then (res => res.json())
        .then (data => setAllMemes(data.data.memes))
    }, [])

    console.log(allmemes)

    

    function getMemeImage (){
        const memesArray = allmemes
        const randomNumber = Math.floor(Math.random() * memesArray.length )
        const url = memesArray[randomNumber].url
        console.log(url)
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url 
        }))
    }

    function handleChange(event){
        const {name, value} = event.target

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return(
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name = "topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name = "bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image"/>
                <h2 className="memeText  top">{meme.topText}</h2>
                <h2 className="memeText  bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
