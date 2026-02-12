import { Outlet, Route, Routes } from "react-router-dom"
import { Clients } from "../clients/Clients"
import { CreateArtist } from "../create/CreateArtist"
import { EditArtist } from "../edit/EditArtist"
import { CreateBand } from "../create/CreateBand"
import { EditBand } from "../edit/EditBand"
import { ManagerNavbar } from "../nav/ManagerNavbar"
import { ArtistShows } from "../shows/ArtistShows"
import { CreateArtistShow } from "../create/CreateArtistShow"
import { BandShows } from "../shows/BandShows"
import { CreateBandShow } from "../create/CreateBandShow"
import { EditArtistShow } from "../edit/EditArtistShow"
import { EditBandShow } from "../edit/EditBandShow"

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
                <Route path='edit-artist/:artistId' element={<EditArtist manager={ manager } />} />
                <Route path='create-band' element={<CreateBand manager={ manager }/>} />
                <Route path='edit-band/:bandId' element={<EditBand manager={ manager }/>} />
                <Route path='artist-shows'>
                    <Route path=':artistId' element={<ArtistShows />} />
                    <Route path='create/:artistId' element={<CreateArtistShow />} />
                    <Route path='edit-show/:id' element={<EditArtistShow />} />
                </Route>
                <Route path='band-shows'>
                    <Route path=':bandId' element={<BandShows />} />
                    <Route path='create/:bandId' element={<CreateBandShow />} />
                    <Route path='edit-show/:id' element={<EditBandShow />} />
                </Route>
            </Route>
        </Routes>
    )
}