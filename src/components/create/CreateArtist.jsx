import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"
import { createArtist } from "../../services/artistService"
import { Link, useNavigate } from "react-router-dom"

export const CreateArtist = ({ manager }) => {
    const [newArtist, setNewArtist] = useState({ name: "" })
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    const [isBand, setIsBand] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getGenres().then(setGenres)
    }, [])

    const handleArtistCreation = () => {
        if (genre.id > 0 && newArtist.name) {
            // const formData = new FormData()
            // formData.append('profile_picture', img)

            const artist = {
                name: newArtist.name,
                managerId: manager.id,
                genreId: genre.id,
                isBand: isBand
            }

            createArtist(artist).then(() => {
                setNewArtist({ name: "" })
                setGenre({})
                navigate("/managers")
            })
        } else {
            window.alert("Please make sure all the information fields are filled out")
        }
    }

    
    return (
        <div className="clients-section">
            <div className="back-button-container">
                <Link to={'/managers'}>
                    <button className="button">Back to Clients</button>
                </Link>
            </div>
            <div className="create-container">
                <h2>Create Client</h2>
                <div className="filter-group">
                    <p>Name</p>
                    <input type="text" placeholder="Artist Name" onChange={(event) => {
                            const copyArtist = {...newArtist}
                            copyArtist.name = event.target.value
                            setNewArtist(copyArtist)
                        }
                    }/>
                </div>
                <div className="filter-group">
                    <p>Genre</p>
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
                    <p>Is this client a band?</p>
                    <div className="radio-options">
                        <input type="radio" value={isBand} name="is-band" onClick={() => {
                            setIsBand(false)
                        }} defaultChecked/> No
                        <input type="radio" value={isBand} name="is-band" onClick={() => {
                            setIsBand(true)
                        }}/> Yes
                    </div>
                </div>
                <div>
                    {isBand === false ? (
                        <button className="submit-btn" onClick={() => {
                        handleArtistCreation()
                    }}><a>Create Artist</a>
                    </button>
                    ) : (
                        <button className="submit-btn" onClick={() => {
                        handleArtistCreation()
                    }}>
                        <a>Create Band</a>
                    </button>
                    )}               
                </div>
            </div>
        </div>
    )
}