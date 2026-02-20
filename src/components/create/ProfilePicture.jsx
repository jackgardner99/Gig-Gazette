import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { storage } from "../../services/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"

export const ProfilePicture = () => {
    const { artist } = useParams()
    const [img, setImg] = useState(null)

    useEffect(() => {

    }, [artist])

    // const handleUpload = () => {
    //     if (img === null || !artist) return;

    //     const imageRef = ref(storage, `GIGprofilePics/${artist}`)

    // }


    return (
        <div {...console.log(artist)}>
            <input type="file" onChange={(e) => {
                setImg(e.target.files[0])
            }} />
            <div>
                <button></button>
            </div>
        </div>
    )
}