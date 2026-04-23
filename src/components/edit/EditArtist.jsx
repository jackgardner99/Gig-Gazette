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
        const genre = genres.filter((genre) => genre.id === artist.genre?.id)
        setGenre(genre[0])
    }, [genres, artist])

        const handleUpdateArtist = () => {
            if (artist.client_name && artist.genre) {
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
                    <input className="form__input" type="text" value={artist.client_name} onChange={(e) => {
                        const artistCopy = {...artist}
                        artistCopy.client_name = e.target.value
                        setArtist(artistCopy)
                    }}/>
                </div>
                <div>
                    <p>Genre</p>
                    <select className="form__select" onChange={(e) => {
                        const selectedGenre = genres.find(g => g.id === parseInt(e.target.value))
                        setArtist({ ...artist, genre: selectedGenre })
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