import { Outlet, Route, Routes } from "react-router-dom"
import { Clients } from "../clients/Clients"
import { CreateArtist } from "../create/CreateArtist"
import { EditArtist } from "../edit/EditArtist"
import { ManagerNavbar } from "../nav/ManagerNavbar"
import { ArtistShows } from "../shows/ArtistShows"
import { CreateArtistShow } from "../create/CreateArtistShow"
import { EditArtistShow } from "../edit/EditArtistShow"
import { MapPage } from "../map/MapPage"
import { ProfilePicture } from "../create/ProfilePicture"

export const ManagerView = ({ manager }) => {

    return (
        <Routes>
            <Route path="/managers"
            element={<>
                <ManagerNavbar />
                <Outlet />
            </>                
            }>
                <Route index element={<Clients manager={ manager }/>} />
                <Route path='create-artist' element={<CreateArtist manager={ manager } />} />
                <Route path='profile-picture/:artistId' element={<ProfilePicture />} />
                <Route path='edit-artist/:artistId' element={<EditArtist manager={ manager } />} />
                <Route path='artist-shows'>
                    <Route path=':artistId' element={<ArtistShows />} />
                    <Route path='create/:artistId' element={<CreateArtistShow />} />
                    <Route path='edit-show/:id' element={<EditArtistShow />} />
                </Route>
                <Route path="map" element={<MapPage />}/>
            </Route>
        </Routes>
    )
}