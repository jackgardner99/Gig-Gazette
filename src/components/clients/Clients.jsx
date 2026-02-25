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
        <main>
            <h2 className="about-header">Clients</h2>
                <div>
                    <div>
                        <Link to={"/managers/create-artist"}>
                            <button className="cta-button">
                                Create Client
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/managers/create-event"}>
                            <button className="cta-button">Create Open Mic</button>
                        </Link>
                    </div>
                </div>
                {artists.length > 0 && 
                    <div className="coverflow-container">
                        <h2>Artists</h2>
                <div>
                    {artists.map((artist) => {
                        return <>
                            <div key={artist.id} className="showcase-display">
                                <Link to={`/managers/artist-shows/${artist.id}`}>
                                    <div className="badge">
                                        <div className="badge-text">{artist.name}</div>
                                        <div className="badge-text">{artist.genre?.name}</div>
                                    </div>
                                </Link>
                                {/* <Link to={`/managers/profile-picture/${artist.id}`}>
                                    <div>
                                        <img className="artist-image" src={artist.img} loading="lazy" />
                                    </div>                               
                                </Link> */}
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
                }
                {openMics.length > 0 && 
                    <div className="coverflow-container">
                        <h2>Open Mics</h2>
                        <div>
                            {openMics.map((openMic) => {
                                return <>
                                    
                                        <div className="badge">
                                            <div className="badge-text">{openMic.eventTitle}</div>
                                            <div className="badge-text">{openMic.venue?.venueName}</div>
                                        </div>
        
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