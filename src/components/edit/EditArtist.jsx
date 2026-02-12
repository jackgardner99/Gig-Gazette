import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArtistById, updateArtist } from "../../services/artistService"
import { getGenres } from "../../services/genreService"

export const EditArtist = () => {
    const { artistId } = useParams()
    const navigate = useNavigate()

    const [artist, setArtist] = useState({})
    const [genres, setGenres] = useState([])

    const getAndSetEdits = (artistId) => {
        getArtistById(artistId).then(setArtist).then(getGenres().then(setGenres))
    }
    
    useEffect(() => {
        getAndSetEdits(artistId)
    }, [artistId])

        const handleUpdateArtist = () => {
            if (artist.artistName && artist.genreId) {
                updateArtist(artist).then(navigate("/managers"))               
            } else {
                window.alert("Please make sure all the fields are filled out")
            }
        }




    return (
        <div>
            <div>
                <input type="text" value={artist.artistName} onChange={(e) => {
                    const artistCopy = {...artist}
                    artistCopy.artistName = e.target.value
                    setArtist(artistCopy)
                }}/>
            </div>
            <div>
                <select onChange={(e) => {
                    const artistCopy = {...artist}
                    artistCopy.genreId = parseInt(e.target.value)
                    setArtist(artistCopy)
                }}>
                    <option value={artist.genreId} key={artist.genreId} selected>{artist.genre?.name}</option>
                    {genres.map(
                        (genre) => {
                            return <option value={genre.id} key={genre.id}>{genre.name}</option>
                        }
                    )}
                </select>
            </div>
            <div>
                <button onClick={() => {
                    handleUpdateArtist()
                }}>
                    Save Changes
                </button>          
            </div>
        </div>
    )
}