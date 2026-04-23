import { useEffect, useState } from "react"
import { deleteClient, getClients } from "../../services/clientService"
import { Link } from "react-router-dom"
import { deleteOpenMic, getOpenMicsByManagerId } from "../../services/eventService"

export const Clients = ({ manager }) => {
    const [clients, setClients] = useState([])
    const [openMics, setOpenMics] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(manager) {
            setIsLoading(true)

            Promise.all([
                getClients(manager.id),
                getOpenMicsByManagerId(manager.id)
            ]).then(([artistsArray, openMicsArray]) => {
                setClients(artistsArray)
                setOpenMics(openMicsArray)
            })
        }
    }, [manager])

    useEffect(() => {
        if (clients.length > 0 && openMics.length > 0) {
            setIsLoading(false)
        }
    }, [clients, openMics])

    const handleDeleteClient = (client) => {
        deleteClient(client).then(() => {
            getClients(manager.id).then(setClients)
        })
    }

    const handleDeleteOpenMic = (openMic) => {
        deleteOpenMic(openMic).then(() => {
            getOpenMicsByManagerId(manager.id).then(setOpenMics)
        })
    }

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <main>
            <h1>Clients</h1>
                <div>
                    <div>
                        <Link to={"/managers/create-artist"}>
                            <button className="btn--primary">
                                Create Client
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/managers/create-event"}>
                            <button className="btn--primary">Create Open Mic</button>
                        </Link>
                    </div>
                </div>
                <div>
                    {clients.length > 0 && 
                        <div>
                            <h2 className="form__section-title">Artists</h2>
                    <div className="card-grid">
                        {clients.map((client) => {
                            return <>
                                <div key={client.id}>
                                    <Link to={`/managers/edit-artist/${client.id}`}>
                                        <div className="card">
                                            <div className="card__title">{client.name}</div>
                                            <div className="card__subtitle">{client.genre?.name}</div>
                                        </div>
                                    </Link>
                                    {/* <Link to={`/managers/profile-picture/${artist.id}`}>
                                        <div>
                                            <img className="artist-image" src={artist.img} loading="lazy" />
                                        </div>                               
                                    </Link> */}
                                    <div>
                                        <div>
                                            <Link to={`/managers/artist-shows/${client.id}`}>
                                                {client.isBand === false ? (
                                                    <button className="btn--primary">Artist Shows</button>
                                                ) : (
                                                    <button className="btn--primary">Band Shows</button>
                                                )}
                                            </Link>
                                        </div>
                                        <div>
                                            {client.isBand === false ? (
                                                <button className="btn--danger" onClick={() => {
                                                    handleDeleteClient(client)
                                                }}>Delete client</button>
                                            ) : (
                                                <button className="btn--danger" onClick={() => {
                                                    handleDeleteClient(client)
                                                }}>Delete Band</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                            </>
                        })}
                    </div>
                </div>
                    }
                    {openMics.length > 0 && 
                        <div>
                            <h2 className="form__section-title">Open Mics</h2>
                            <div className="card-grid">
                                {openMics.map((openMic) => {
                                    return <div>
                                        <Link to={`/managers/edit-openMic/${openMic.id}`}>
                                            <div className="card">
                                                <div className="card__title">{openMic.eventTitle}</div>
                                                <div className="card__subtitle">{openMic.venue?.venueName}</div>
                                            </div>
                                        </Link>
                                        <div>
                                            <button className="btn--danger" onClick={() => {
                                                handleDeleteOpenMic(openMic)
                                            }}>Delete Open Mic</button>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        }
                </div>
        </main>        
    )
}