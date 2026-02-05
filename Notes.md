# Gig Gazette

## CustomerView {currentUser = customer}
CustomerView {
    <Navbar />
    <Outlet/>
        <Map />
        <ManagerSignIn />
}

#### Map
-set venues to correct coordinates on both the customer and manager maps
ManagerMap {
    -get all shows, expand artist and band to get the manager id, expand venues
    -set shows
    -filter shows by manager id
    -filter shows by genre
    -filter shows that are artist
    -filter shows that are band

    return html
        -map with icons rendered on the map with the correct coordinates
        -ternary operator
            -check if user is manager
                -then filter shows by managerId will display
            -else
                -regular map
        
}

### Customer Navbar
CustomerNavbar {
    return html
        - Links to Map and Manager sign in
}

### ManagerSignIn
ManagerSignIn {
    const [email, setEmail] = useState("")
    const navigate

    handleLogin(
        getManagerByEmail(email).then(
            -condition check (manager.length === 1)
                -const user = manager[0]
                localStorage.setItem("manager",
                    JSON.stringify({
                        user.id,
                        user.name
                        user.email
                    })
                )
                navigate("/clients")
            - else, "invalid login"
        )
    )

    return html
        -input field to enter in email
            -onclick{handleLogin}
}

## ManagerView {currentUser = manager}

### Components

#### ManagerNavbar
ManagerNavbar {
    return html
        -Links to "/map", "/clients", "/shows"
}
#### Clients
Clients {
    const [clients, setClients] = useState([])

    useEffect(
        getArtistsByManagerId(currentUser.id)
        getBandsByManagerId(currentUser.id)
        
        setClients(artists and bands)
    )

    return html with clients rendered
        -each client will have an edit and delete button
        -props
            -<EditArtist {client.id}>
            -<EditBand {client.id}>
}

#### Shows {artistId, bandId}
-talk to greg about deleting shows, if it will delete all shows with the artist or band id
Shows {
    const [shows, setShows] = useState([])
    const [filteredShows, setFilteredShows] = useState([])
    const navigate = useNavigate()

    useEffect(
        getArtistShows
        getBandShows

        -setShows(artist and band shows)
    )

    useEffect(
        shows.filter(show => show.bandId === client.id || show.artistId === client.id)

        setFilteredShows(clientShows)
    )

    handleShowDeletion(
        -condition check (artistId)
            -deleteArtistShow(artistId)
        -else
            -deleteBandShow(bandId)
    )

    return html
        -filteredShows.map()
        -each show will be clickable
            -navigate("/shows/edit-show")
        -delete show button
            -onclick={handleShowDeletion}
}

#### CreateArtist {manager}
CreateArtist {
    const [artist, setArtist] = useState({name: "", image: ""})
    const [genres, setGenres]
    const [genre, setGenre] = useState({})

    useEffect(
        getGenres().then(setGenres)
    )

    handleArtistCreation {
        -condition check (artist.name && genre && artist.image)
            newArtist = {
                name: artist.name
                genreId: genre.id
                managerId: manager.id
                img: artist.image
            }

            createArtist(newArtist)
        -else, error message
    }

    return html
        -input fields to add artist info
        -selection dropdown with genres
            -genres.map()
            -selected genre will call setGenre
        -create artist button onclick{handleArtistCreation}
}

#### EditArtist {id}
EditArtist {
    const [artist, setArtist] = useState({})

    useEffect(
        getArtistById(id).then(setArtist)
    )

    handleArtistEdit(
        -object

        updateArtist(updatedArtistObject)
    )

    return html
        -input fields that have current information of artist
        -genre selection to change genre
        -save edits button
            -onclick{handleArtistEdit}
}

#### CreateBand
-talk to greg about creating band members without a bandId already in the database
CreateBand {
    const [newBand, setNewBand] = useState({bandName: "", img: ""})
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    const [bandMembers, setBandMembers] = useState([])

    useEffect(
        -getGenres then set
    )

    -possibly need a useEffect for setting the genre

    -creating band members
        -set an empty array
        -populate that array with .push() to add each band member without changing the original state
            -newMember = {
                id
                name
                bandId
            }

    return html
        -have input fields to enter in name and image, along with band member inputs
        -have a genre selection dropdown
            -onClick will set the genre
        

}

#### EditBand

#### CreateShow - props {artistId, bandId}
CreateShow {
    const [newShow, setNewShow] = useState({})
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState({})
    const navigate = useNavigate()

    handleShowCreation {
        -condition check (artistId)
            - newArtistShow = {
                artistId
                venueId
                img
                link
                showDate
            }

            createArtistShow(newArtistShow)
        -condition check (bandId)
            - newBandShow = {
                bandId
                venueId
                img
                link
                showDate
            }

            createBandShow(newBandShow)
    }

    return html
        -input fields to enter in show details
        -dropdown selection of venues - use .map()
            -each venue will have a value
            -onclick={setVenue}
        -Create show button
            -onclick to handleShowCreation, then navigate back to shows page
}

#### EditShow - props {artistId, bandId}
EditShow {
    const [show, setShow] = useState({})
    const navigate = useNavigate()

    useEffect(
        -condition check (artistId)
            -getShowByArtistId(artistId) then setShow
        -else
            -getShowByBandId(bandId) then setShow
    )

    handleShowUpdate (
        -condition check (artistId)
            -artist show object with updated changes
            -updateArtistShow(artistShowObject)
        -else
            -band show object with updated changes
            -updateBandShow(bandShowObject)
    )

    return html of show information
        -input fields that are editable
        -venue selection dropdown?
        -save changes button
            -onclick={handleShowUpdate}
            -navigate="/shows"
}

### Services

#### ArtistService
-getArtists
-getArtistsByManagerId
-getArtistById
-createArtist
-updateArtist
-deleteArtist

#### BandService
-getBands - expand BandMembers
-getBandsByManagerId
-createBand
-createBandMember
-updateBand
-updateBandMember
-deleteBand
-deleteBandMember

#### VenueService
-getVenues

#### ShowsService
-getArtistShows - expand artist
-getBandShows - expand band
-createArtistShow
-updateArtistShow
-deleteArtistShow
-createBandShow
-updateBandShow
-deleteBandShow

#### MapService
-getMap
-updateMap

#### GenreService
-getGenres

#### MusicPlatformsService
-getMusicPlatforms

#### ManagerService
-getManagerByEmail