import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"
import { createBand } from "../../services/bandService"
import { useNavigate } from "react-router-dom"

export const CreateBand = ({ manager }) => {
    const [bandName, setBandName] = useState({ bandName: "" })
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getGenres().then(setGenres)
    }, [])

    const handleCreateBand = () => {
        if (bandName.bandName && genre) {
            const band = {
                bandName: bandName.bandName,
                genreId: genre,
                managerId: manager.id,
            }

            createBand(band)
            navigate("/managers")
        } else {
            window.alert("Please make sure all fields are filled out before creating")
        }
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Band Name" onChange={(e) => {
                    const bandNameCopy = {...bandName}
                    bandNameCopy.bandName = e.target.value
                    setBandName(bandNameCopy)
                }}/>
            </div>
            <div>
                <select onChange={(e) => {
                    setGenre(e.target.value)
                }}>
                    <option value={0} key={0}>Please select genre</option>
                    {genres.map((genre) => {
                        return <option value={genre.id} key={genre.id}>{genre.name}</option>
                    })}
                </select>
            </div>
            <div>
                <button onClick={handleCreateBand}>Create Band</button>
            </div>
        </div>
    )
}