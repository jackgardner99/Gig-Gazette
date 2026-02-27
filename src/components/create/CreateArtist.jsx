import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"
import { createArtist } from "../../services/artistService"
import { Link, useNavigate } from "react-router-dom"

export const CreateArtist = ({ manager }) => {
    const [newArtist, setNewArtist] = useState({ artistName: "" })
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    const [isBand, setIsBand] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getGenres().then(setGenres)
    }, [])

    const handleArtistCreation = () => {
        if (genre.id > 0 && newArtist.artistName) {
            // const formData = new FormData()
            // formData.append('profile_picture', img)

            const artist = {
                name: newArtist.name,
                managerId: manager.id,
                genreId: genre.id,
                isBand: isBand
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
        <div>
            <div>
                <Link to={'/managers'}>
                    <button>Back to Clients</button>
                </Link>
            </div>
            <h2>Create Client</h2>
            <div>
                <input type="text" placeholder="Artist Name" onChange={(event) => {
                        const copyArtist = {...newArtist}
                        copyArtist.artistName = event.target.value
                        setNewArtist(copyArtist)
                    }
                }/>
            </div>
            <div>
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
            <div>
                {isBand === false ? (
                    <button onClick={() => {
                    handleArtistCreation()
                }}>
                    Create Artist
                </button>
                ) : (
                    <button onClick={() => {
                    handleArtistCreation()
                }}>
                    Create Band
                </button>
                )}               
            </div>
        </div>
    )
}