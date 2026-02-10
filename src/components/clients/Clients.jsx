import { useEffect, useState } from "react"
import { deleteArtist, getArtists } from "../../services/artistService"
import { Link } from "react-router-dom"
import { deleteBand, getBands } from "../../services/bandService"

export const Clients = ({ manager }) => {
    const [artists, setArtists] = useState([])
    const [bands, setBands] = useState([])

    const getAndSetClients = (managerId) => {
        getArtists(managerId).then(setArtists).then(getBands(managerId).then(setBands))
        
    }

    useEffect(() => {
        getAndSetClients(manager.id)
    }, [manager])

    const handleDeleteArtist = (artist) => {
        deleteArtist(artist).then(() => {
            getAndSetClients(manager.id)
        })
    }

    const handleDeleteBand = (band) => {
        deleteBand(band).then(() => {
            getAndSetClients(manager.id)
        })
    }

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
                <div>
                    <Link to={"/create-band"}>
                        <button>Create Band</button>
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
                            <div>
                                <button onClick={() => {
                                    handleDeleteArtist(artist)
                                }}>Delete Artist</button>
                            </div>
                        </div>
                        
                    </>
                })}
            </div>
            <div>
                {bands.map((band) => {
                    return <>
                        <div key={band.id}>
                            <div>{band.bandName}</div>
                            <div>{band.genre?.name}</div>
                            <div>
                                <img src={band.img} />
                            </div>
                            <div>
                                <Link to={`/edit-band/${band.id}`}>
                                    <button>Edit Band</button>
                                </Link>
                            </div>
                            <div>
                                <button onClick={() => {
                                    handleDeleteBand(band)
                                }}>Delete Band</button>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}