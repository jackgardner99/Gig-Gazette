import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGenres } from "../../services/genreService"
import { getBandById, updateBand } from "../../services/bandService"

export const EditBand = () => {
    const { bandId } = useParams()
    const navigate = useNavigate()

    const [band, setBand] = useState({})
    const [genres, setGenres] = useState([])

    useEffect(() => {
        getBandById(bandId).then(setBand)
        getGenres().then(setGenres)
    }, [bandId])

        const handleUpdateBand = () => {
            if (band.bandName && band.genreId) {
                const updatedBand = {
                    id: band.id,
                    bandName: band.bandName,
                    managerId: band.managerId,
                    genreId: band.genreId,
                    img: band.img
                }

                updateBand(updatedBand).then(navigate("/managers"))
                

            } else {
                window.alert("Please make sure all the fields are filled out")
            }
        }




    return (
        <div>
            <div>
                <input type="text" value={band.bandName} onChange={(e) => {
                    const bandCopy = {...band}
                    bandCopy.bandName = e.target.value
                    setBand(bandCopy)
                }}/>
            </div>
            <div>
                <select onChange={(e) => {
                    const bandCopy = {...band}
                    bandCopy.genreId = parseInt(e.target.value)
                    setBand(bandCopy)
                }}>
                    <option value={band.genreId} key={band.genreId} selected>{band.genre?.name}</option>
                    {genres.map(
                        (genre) => {
                            return <option value={genre.id} key={genre.id}>{genre.name}</option>
                        }
                    )}
                </select>
            </div>
            <div>
                <button onClick={() => {
                    handleUpdateBand()
                }}>
                    Save Changes
                </button>          
            </div>
        </div>
    )
}