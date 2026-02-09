import { useEffect, useState } from "react"
import { getArtists } from "../../services/artistService"
import { Link } from "react-router-dom"

export const Clients = () => {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        getArtists().then(setArtists)
    }, [])

    return (
        <div>
            <div>
                <div>
                    <Link to={"/create-artist"}>
                        <button>
                            Create Artist
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                {artists.map((artist) => {
                    return <>
                        <div key={artist.id}>
                            <div>{artist.artistName}</div>
                            <div>{artist.genre.name}</div>
                            <div>
                                <img src={artist.img} />
                            </div>
                            <div>
                                <Link to={`/edit-artist/${artist.id}`}>
                                    <button>Edit Artist</button>
                                </Link>
                            </div>
                        </div>
                        
                    </>
                })}
            </div>
        </div>
    )
}