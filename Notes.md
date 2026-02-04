# Gig Gazette

## CustomerView {currentUser = customer}
CustomerView {
    <Navbar />
    <Outlet/>
        <Map />
        <ManagerSignIn />
}

### MapPage
MapPage{
    const [allShows, setAllShows] = useState([])
    const [filteredShows, setFilteredShows] = useState([])
    const [artistOnlyShows, setArtistOnlyShows] = useState(false)
    const [bandOnlyShows, setBandOnlyShows] = useState(false)
    const [genre, setGenre] = useState([])

    useEffect (
        getArtistShows
        getBandShows

        setAllShows(combinedShows)
    )

    useEffect(
        -condition check (artistShowOnly)
            -allShows.filter()
                -filter shows with artistId
        - else if (bandShowOnly)
            - allShows.filter()
                -filter shows with bandId
        -else, setFilteredShows(allShows)
    )

    useEffect(
        -condition check (genre.id)
            -allShows.filter()
                -filter shows with genreId that matches the genre.id
            -setFilteredShows()
        -else, setFilteredShows(allShows)
    )



    return html
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

#### Shows {client}
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

    return html
        -filteredShows.map()
        -each show will be clickable
            -navigate("/shows/edit-show")
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

#### EditBand

#### CreateShow

#### EditShow

#### ManagerMap

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