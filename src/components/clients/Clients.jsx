import { useEffect, useState } from "react"
import { deleteArtist, getArtists } from "../../services/artistService"
import { Link } from "react-router-dom"

export const Clients = ({ manager }) => {
    const [artists, setArtists] = useState([])

    const getAndSetClients = (managerId) => {
        getArtists(managerId).then(setArtists)
        
    }

    useEffect(() => {
        getAndSetClients(manager.id)
    }, [manager])

    const handleDeleteArtist = (artist) => {
        deleteArtist(artist).then(() => {
            getAndSetClients(manager.id)
        })
    }

    return (
        <div>
            <div>
                <div>
                    <Link to={"/managers/create-artist"}>
                        <button>
                            Create Client
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                {artists.map((artist) => {
                    return <>
                        <div key={artist.id}>
                            <div>
                                <Link to={`/managers/artist-shows/${artist.id}`}>
                                    <div>{artist.artistName}</div>
                                    <div>{artist.genre.name}</div>
                                    <div>
                                        <img src={artist.img} />
                                    </div>

                                </Link>
                            </div>
                            <div>
                                <Link to={`/managers/edit-artist/${artist.id}`}>
                                    {artist.isBand === false ? (
                                        <button>Edit Artist</button>
                                    ) : (
                                        <button>Edit Band</button>
                                    )}
                                </Link>
                            </div>
                            <div>
                                {artist.isBand === false ? (
                                    <button onClick={() => {
                                        handleDeleteArtist(artist)
                                    }}>Delete Artist</button>
                                ) : (
                                    <button onClick={() => {
                                        handleDeleteArtist(artist)
                                    }}>Delete Band</button>
                                )}
                            </div>
                        </div>
                        
                    </>
                })}
            </div>
        </div>
    )
}