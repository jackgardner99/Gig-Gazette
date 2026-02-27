import { useEffect, useState } from "react"
import { deleteArtist, getArtists } from "../../services/artistService"
import { Link } from "react-router-dom"
import { deleteOpenMic, getOpenMicsByManagerId } from "../../services/eventService"

export const Clients = ({ manager }) => {
    const [artists, setArtists] = useState([])
    const [openMics, setOpenMics] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(manager) {
            setIsLoading(true)

            Promise.all([
                getArtists(manager.id),
                getOpenMicsByManagerId(manager.id)
            ]).then(([artistsArray, openMicsArray]) => {
                setArtists(artistsArray)
                setOpenMics(openMicsArray)
                setIsLoading(false)
            })
        }
    }, [manager])

    const handleDeleteArtist = (artist) => {
        deleteArtist(artist).then(() => {
            getArtists(manager.id).then(setArtists)
        })
    }

    const handleDeleteOpenMic = (openMic) => {
        deleteOpenMic(openMic).then(() => {
            getOpenMicsByManagerId(manager.id).then(setOpenMics)
        })
    }

    if (isLoading) {
        return (
            <div class="spinner-box">
                <div class="circle-border">
                    <div class="circle-core"></div>
                </div>  
            </div>
        )
    }

    return (
        <main className="clients-section">
            <h1>Clients</h1>
                <div className="create-btn-container">
                    <div>
                        <Link to={"/managers/create-artist"}>
                            <button className="create-btn">
                                Create Client
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/managers/create-event"}>
                            <button className="create-btn">Create Open Mic</button>
                        </Link>
                    </div>
                </div>
                {artists.length > 0 && 
                    <div>
                        <h2>Artists</h2>
                <div>
                    {artists.map((artist) => {
                        return <>
                            <div key={artist.id}>
                                <Link to={`/managers/edit-artist/${artist.id}`}>
                                    <div>
                                        <div>{artist.name}</div>
                                        <div>{artist.genre?.name}</div>
                                    </div>
                                </Link>
                                {/* <Link to={`/managers/profile-picture/${artist.id}`}>
                                    <div>
                                        <img className="artist-image" src={artist.img} loading="lazy" />
                                    </div>                               
                                </Link> */}
                                <div>
                                    <Link to={`/managers/artist-shows/${artist.id}`}>
                                        {artist.isBand === false ? (
                                            <button>Artist Shows</button>
                                        ) : (
                                            <button>Band Shows</button>
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
                }
                {openMics.length > 0 && 
                    <div>
                        <h2>Open Mics</h2>
                        <div>
                            {openMics.map((openMic) => {
                                return <>
                                    <Link to={`/managers/edit-openMic/${openMic.id}`}>
                                        <div>
                                            <div>{openMic.eventTitle}</div>
                                            <div>{openMic.venue?.venueName}</div>
                                        </div>
                                    </Link>
                                    <div>
                                        <button onClick={() => {
                                            handleDeleteOpenMic(openMic)
                                        }}>Delete Open Mic</button>
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                }
        </main>        
    )
}