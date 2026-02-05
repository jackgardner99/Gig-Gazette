```mermaid

    graph TD;

        Main-->App
        App-->CustomerViews
        App-->ManagerViews
        ManagerViews-->Authorized
        CustomerViews-->Navbar
        ManagerViews-->Navbar
        Navbar-->Map
        Navbar-->Clients
        Navbar-->Shows
        Navbar-->ManagerSignIn
        Navbar-->Logout
        Map-->MapIcons
        Clients-->CreateArtist
        Clients-->CreateBand
        Clients-->EditArtist
        Clients-->EditBand
        Clients-->ArtistService
        Clients-->BandService
        CreateArtist-->ArtistService
        EditArtist-->ArtistService
        CreateBand-->BandService
        EditBand-->BandService
        Shows-->CreateShow
        Shows-->EditShow
        
```