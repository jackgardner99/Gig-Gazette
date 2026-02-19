import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"
import { createArtist } from "../../services/artistService"
import { Link, useNavigate } from "react-router-dom"

export const CreateArtist = ({ manager }) => {
    const [newArtist, setNewArtist] = useState({ artistName: "" })
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    const [isBand, setIsBand] = useState(false)
    const [img, setImg] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getGenres().then(setGenres)
    }, [])

    const handleImageState = (event) => {
        setImg(URL.createObjectURL(event.target.files[0]))
    }

    const handleArtistCreation = () => {
        if (genre.id > 0 && newArtist.artistName && img) {
            // const formData = new FormData()
            // formData.append('profile_picture', img)

            const artist = {
                artistName: newArtist.artistName,
                managerId: manager.id,
                genreId: genre.id,
                isBand: isBand,
                img: img
            }

            createArtist(artist).then(() => {
                setNewArtist({ artistName: "" })
                setGenre({})
                navigate("/managers")
            })
        } else {
            window.alert("Please make sure all the information fields are filled out")
        }
    }

    
    return (
        <div className="showcase-main">
            <div>
                <Link to={'/managers'}>
                    <button  className="cta-button">Back to Clients</button>
                </Link>
            </div>
            <h2>Create Artist</h2>
            <div className="form-group">
                <input type="text" placeholder="Artist Name" onChange={(event) => {
                        const copyArtist = {...newArtist}
                        copyArtist.artistName = event.target.value
                        setNewArtist(copyArtist)
                    }
                }/>
            </div>
            <div className="form-group">
                <select onChange={(event) => {
                    setGenre({id: parseInt(event.target.value)})
                }}>
                    <option value={0} key={0}>Please select genre</option>
                    {genres.map(
                        (genre) => {
                            return <option value={genre.id} key={genre.id}>
                                {genre.name}            
                            </option>
                        }
                    )}
                </select>
            </div>
            <div>
                Is this client a band?
                <input type="radio" value={isBand} name="is-band" onClick={() => {
                    setIsBand(false)
                }} defaultChecked/> No
                <input type="radio" value={isBand} name="is-band" onClick={() => {
                    setIsBand(true)
                }}/> Yes
            </div>
            <div className="form-group">
                <input type="file" name="artist-image" accept=".jpg, .png, .jpeg" onChange={handleImageState}/>
            </div>
            <div>
                {isBand === false ? (
                    <button className="submit-btn" onClick={() => {
                    handleArtistCreation()
                }}>
                    Create Artist
                </button>
                ) : (
                    <button className="submit-btn" onClick={() => {
                    handleArtistCreation()
                }}>
                    Create Band
                </button>
                )}               
            </div>
        </div>
    )
}