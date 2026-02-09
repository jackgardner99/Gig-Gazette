import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"

export const CreateArtist = () => {
    const [newArtist, setNewArtist] = useState({})
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getGenres().then(setGenres)
    }, [])


    
    return (
        <div>
            <div>
                <input type="text" />
            </div>
            <div>
                <select></select>
            </div>
            <div>
                <button>
                    Create Artist
                </button>
            </div>
        </div>
    )
}