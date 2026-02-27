import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArtistById, updateArtist } from "../../services/artistService"
import { getGenres } from "../../services/genreService"

export const EditArtist = () => {
    const { artistId } = useParams()
    const navigate = useNavigate()

    const [artist, setArtist] = useState({})
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    
    useEffect(() => {
        getArtistById(artistId).then(setArtist)
        getGenres().then(setGenres)
    }, [artistId])

    useEffect(() => {
        const genre = genres.filter((genre) => genre.id === artist.genreId)
        setGenre(genre[0])
    }, [genres, artist])

        const handleUpdateArtist = () => {
            if (artist.name && artist.genreId) {
                const updatedArtist = {
                    id: artist.id,
                    name: artist.name,
                    managerId: artist.managerId,
                    genreId: artist.genreId,
                    isBand: artist.isBand

                }

                updateArtist(updatedArtist).then(navigate("/managers"))               
            } else {
                window.alert("Please make sure all the fields are filled out")
            }
        }




    return (
        <div className="clients-section">
            <div className="create-container">
                <h2>{artist.name} Edits</h2>
                <div className="filter-group">
                    <p>Name</p>
                    <input type="text" value={artist.name} onChange={(e) => {
                        const artistCopy = {...artist}
                        artistCopy.name = e.target.value
                        setArtist(artistCopy)
                    }}/>
                </div>
                <div className="filter-group">
                    <p>Genre</p>
                    <select onChange={(e) => {
                        const artistCopy = {...artist}
                        artistCopy.genreId = parseInt(e.target.value)
                        setArtist(artistCopy)
                    }}>
                        <option key={genre?.id} value={genre?.id} selected>{genre?.name}</option>
                        {genres.map(
                            (genre) => {
                                return <option value={genre.id} key={genre.id}>{genre.name}</option>
                            }
                        )}
                    </select>
                </div>
                <div>
                    <button className="submit-btn" onClick={() => {
                        handleUpdateArtist()
                    }}>
                        <a>Save Changes</a>
                    </button>          
                </div>
            </div>
        </div>
    )
}