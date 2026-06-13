import { useNavigate, useParams, useLocation } from "react-router-dom"
import { getShowById } from "../../services/artistShowsService"
import { getOpenMicById, getWritersRoundById } from "../../services/eventService"
import { getEventPhotos, uploadEventPhoto, deleteEventPhoto } from "../../services/eventPhotosService"
import { API_URL } from "../../services/config"
import { useEffect, useRef, useState } from "react"

const CONFIG = {
    show: {
        label: 'Artist Show',
        getFn: (id) => getShowById(id).then(data => Array.isArray(data) ? data[0] : data),
        hasDate: true,
        hasTicketLink: true,
        photoEndpoint: 'show_photos',
        photoIdParam: 'show_id',
    },
    openMic: {
        label: 'Open Mic',
        getFn: getOpenMicById,
        hasDate: false,
        photoEndpoint: 'open_mic_photos',
        photoIdParam: 'open_mic_id',
    },
    writersRound: {
        label: "Writers Round",
        getFn: getWritersRoundById,
        hasDate: true,
        photoEndpoint: 'writers_round_photos',
        photoIdParam: 'writers_round_id',
    },
}

const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
}

const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const h12 = hours % 12 || 12
    return `${h12}:${String(minutes).padStart(2, '0')} ${period}`
}

export const EventDetails = ({ eventType }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [details, setDetails] = useState(null)
    const [photos, setPhotos] = useState([])
    const [uploading, setUploading] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const fileInputRef = useRef(null)
    const config = CONFIG[eventType]
    const user = JSON.parse(sessionStorage.getItem("user"))
    const isLoggedIn = !!user?.token

    useEffect(() => {
        config.getFn(id).then(data => {
            setDetails({
                event_title: data.event_title ?? '',
                date: data.date ?? '',
                start_time: data.start_time ?? '',
                end_time: data.end_time ?? '',
                description: data.description ?? ''
            })
        })
    }, [id, config])

    useEffect(() => {
        if (!config.photoEndpoint) return
        getEventPhotos(config.photoEndpoint, config.photoIdParam, id).then(data => {
            setPhotos(Array.isArray(data) ? data : (data?.results ?? []))
        })
    }, [id, config])

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (!isLoggedIn) { navigate('/login', { state: { from: location.pathname } }); return }
        setUploading(true)
        const formData = new FormData()
        formData.append('photo', file)
        formData.append(config.photoIdParam.replace('_id', ''), id)
        try {
            const newPhoto = await uploadEventPhoto(config.photoEndpoint, formData)
            setPhotos(prev => [...prev, newPhoto])
        } finally {
            setUploading(false)
            e.target.value = ''
        }
    }

    const handleDelete = async (photoId) => {
        await deleteEventPhoto(config.photoEndpoint, photoId)
        setPhotos(prev => prev.filter(p => p.id !== photoId))
        if (lightboxIndex !== null) setLightboxIndex(null)
    }

    if (!details) return null

    return (
        <div className="page-content">
            <div className="event-detail">
                <button className="btn btn--secondary btn--sm event-detail__back" onClick={() => navigate("/")}>
                    ← Back
                </button>
                <div className="event-detail__card">
                    <span className="event-detail__type-badge">{config.label}</span>
                    <h1 className="event-detail__title">{details.event_title}</h1>
                    <div className="event-detail__meta">
                        {details.date && (
                            <div className="event-detail__meta-item">
                                <i className="fas fa-calendar-alt"></i>
                                <span>{formatDate(details.date)}</span>
                            </div>
                        )}
                        <div className="event-detail__meta-item">
                            <i className="fas fa-clock"></i>
                            <span>{formatTime(details.start_time)} – {formatTime(details.end_time)}</span>
                        </div>
                    </div>
                    {details.description && (
                        <p className="event-detail__description">{details.description}</p>
                    )}
                </div>

                {config.photoEndpoint && (
                    <div className="event-photos">
                        <div className="event-photos__header">
                            <h2 className="event-photos__title">Photos</h2>
                            <button
                                className="btn btn--primary btn--sm"
                                onClick={() => fileInputRef.current.click()}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading…' : '+ Add Photo'}
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleUpload}
                            />
                        </div>

                        {photos.length === 0 ? (
                            <p className="event-photos__empty">No photos yet. Be the first to share one!</p>
                        ) : (
                            <div className="event-photos__grid">
                                {photos.map((photo, index) => (
                                    <div key={photo.id} className="event-photos__item" onClick={() => setLightboxIndex(index)}>
                                        <img src={`${API_URL}${photo.photo}`} alt="" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {lightboxIndex !== null && (
                <div className="lightbox" onClick={() => setLightboxIndex(null)}>
                    <button className="lightbox__close" onClick={() => setLightboxIndex(null)}>✕</button>
                    {lightboxIndex > 0 && (
                        <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); setLightboxIndex(i => i - 1) }}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    )}
                    <div className="lightbox__content" onClick={e => e.stopPropagation()}>
                        <img src={`${API_URL}${photos[lightboxIndex].photo}`} alt="" />
                        {isLoggedIn && (
                            <button
                                className="btn btn--danger btn--sm lightbox__delete"
                                onClick={() => handleDelete(photos[lightboxIndex].id)}
                            >
                                Delete Photo
                            </button>
                        )}
                    </div>
                    {lightboxIndex < photos.length - 1 && (
                        <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); setLightboxIndex(i => i + 1) }}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
