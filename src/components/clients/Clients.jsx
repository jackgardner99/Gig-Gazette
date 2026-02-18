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
        <div className="section">
            <h2 className="about-header">Clients</h2>
            <div>
                <div>
                    <Link to={"/managers/create-artist"}>
                        <button className="cta-button">
                            Create Client
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                {artists.map((artist) => {
                    return <>
                        <div key={artist.id} className="showcase-display">
                            <Link to={`/managers/artist-shows/${artist.id}`}>
                                <div className="badge">
                                    <div>{artist.artistName}</div>
                                    <div>{artist.genre.name}</div>
                                    <div>
                                        <img className="image-loading" src={artist.img} />
                                    </div>

                                </div>
                            </Link>
                            <div>
                                <Link to={`/managers/edit-artist/${artist.id}`}>
                                    {artist.isBand === false ? (
                                        <button className="cta-button">Edit Artist</button>
                                    ) : (
                                        <button className="cta-button">Edit Band</button>
                                    )}
                                </Link>
                            </div>
                            <div>
                                {artist.isBand === false ? (
                                    <button  className="cta-button" onClick={() => {
                                        handleDeleteArtist(artist)
                                    }}>Delete Artist</button>
                                ) : (
                                    <button  className="cta-button" onClick={() => {
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