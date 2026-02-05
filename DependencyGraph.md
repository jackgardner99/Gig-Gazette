```mermaid

    graph TD;

        Main-->App
        App-->CustomerViews
        App-->ManagerViews
        ManagerViews-->Authorized
        CustomerViews-->Navbar
        ManagerViews-->Navbar
        Navbar-->Clients
        Navbar-->Map
        Navbar-->ManagerSignIn
        Navbar-->Shows
        Navbar-->Logout
        Clients-->CreateArtist
        Clients-->CreateBand
        Clients-->EditArtist
        Clients-->EditBand
        Clients-->ArtistService
        Clients-->BandService
        CreateArtist-->ArtistService
        EditArtist-->ArtistService
        CreateArtist-->GenreService
        EditArtist-->GenreService
        CreateBand-->BandService
        EditBand-->BandService
        CreateBand-->GenreService
        EditBand-->GenreService
        Shows-->CreateShow
        Shows-->EditShow
        Shows-->ShowsService
        CreateShow-->ShowsService
        EditShow-->ShowsService
        CreateShow-->VenuesService
        EditShow-->VenuesService
        Map-->MapIcons
        Map-->MapService
        Map-->ShowsService
        Map-->GenreService
        ArtistService-->Database
        BandService-->Database
        MapService-->Database
        ShowsService-->Database
        VenuesService-->Database
        GenreService-->Database

        
```