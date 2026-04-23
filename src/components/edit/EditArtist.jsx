import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClientById, updateClient } from "../../services/clientService"
import { getGenres } from "../../services/genreService"

export const EditArtist = () => {
    const { artistId } = useParams()
    const navigate = useNavigate()

    const [artist, setArtist] = useState({})
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    
    useEffect(() => {
        getClientById(artistId).then(setArtist)
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

                updateClient(updatedArtist).then(navigate("/managers"))               
            } else {
                window.alert("Please make sure all the fields are filled out")
            }
        }




    return (
        <div>
                <h2 className="form__section-title">{artist.name} Edits</h2>
            <div className="form">
                <div>
                    <p>Name</p>
                    <input className="form__input" type="text" value={artist.name} onChange={(e) => {
                        const artistCopy = {...artist}
                        artistCopy.name = e.target.value
                        setArtist(artistCopy)
                    }}/>
                </div>
                <div>
                    <p>Genre</p>
                    <select className="form__select" onChange={(e) => {
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
                    <button className="form__day-btn" onClick={() => {
                        handleUpdateArtist()
                    }}>
                        <a>Save Changes</a>
                    </button>          
                </div>
            </div>
        </div>
    )
}