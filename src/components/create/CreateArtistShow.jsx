import { useParams } from "react-router-dom"

export const CreateArtistShow = () => {
    const { artistId } = useParams()
    



    return (
        <div>
            <h2>Create Show</h2>
            <div>
                <h4>Show Name</h4>
                <input type="text"/>
            </div>
            <div>
                <h4>Show Location</h4>
                <select>

                </select>
            </div>
            <div>
                <input type="date" />
            </div>
        </div>
    )
}