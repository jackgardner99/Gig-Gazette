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
            if (artist.artistName && artist.genreId) {
                const updatedArtist = {
                    id: artist.id,
                    artistName: artist.artistName,
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
                    <option key={genre?.id} value={genre?.id} selected>{genre?.name}</option>
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