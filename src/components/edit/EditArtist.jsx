import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArtistById } from "../../services/artistService"

export const EditArtist = () => {
    const { artistId } = useParams()

    const [artist, setArtist] = useState({})

    useEffect(() => {
        getArtistById(artistId).then(setArtist)
    }, [artistId])

    return <>{artist.artistName}</>
}