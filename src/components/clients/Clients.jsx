import { useEffect, useState } from "react"
import { getArtists } from "../../services/artistService"
import { useNavigate } from "react-router-dom"

export const Clients = () => {
    const [artists, setArtists] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getArtists().then(setArtists)
    }, [])

    return (
        <div>
            <div>
                <div>
                    <button onClick={() => {
                        navigate("/create-artist")
                    }}>
                        Create Artist
                    </button>
                </div>
            </div>
            <div>
                {artists.map((artist) => {
                    return <>
                        <div key={artist.id}>{artist.artistName}</div>
                        <div>
                            <img src={artist.img} />
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}