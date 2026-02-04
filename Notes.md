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

### Navbar

## ManagerView {currentUser = manager}

### Components

#### Navbar

#### Clients

#### Shows

#### CreateClients

#### EditClients

#### CreateShow

#### EditShow

#### ManagerMap

### Services

#### ArtistService
-getArtists
-createArtist
-updateArtist
-deleteArtist

#### BandService
-getBands - expand BandMembers
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
-getManagerByUserId