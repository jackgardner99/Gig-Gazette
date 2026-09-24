// Shared by the React app and the Netlify edge functions (netlify/edge-functions),
// so keep this file dependency-free and runtime-agnostic.

export const SITE_NAME = 'Gig Gazette'
export const DEFAULT_TITLE = 'Gig Gazette – Live Music, Open Mics & Writers Rounds in Nashville'
export const DEFAULT_DESCRIPTION =
    'Find live music in Nashville tonight. Browse shows, open mics, and writers rounds on an interactive map of venues across Music City.'
export const DEFAULT_IMAGE = '/og-image.png'
const TIME_ZONE = 'America/Chicago'

export const EVENT_TYPES = {
    show: { label: 'Live Show', apiPath: 'shows', routeSegment: 'show' },
    openMic: { label: 'Open Mic', apiPath: 'open_mics', routeSegment: 'open-mic' },
    writersRound: { label: 'Writers Round', apiPath: 'writers_rounds', routeSegment: 'writers-round' },
}

export const eventTypeFromSegment = (segment) =>
    Object.keys(EVENT_TYPES).find(key => EVENT_TYPES[key].routeSegment === segment)

export const eventPath = (eventType, id) => `/details/${EVENT_TYPES[eventType].routeSegment}/${id}`

// The shows endpoint sometimes returns a single-item array
export const normalizeEvent = (data) => Array.isArray(data) ? data[0] : data

const formatLongDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
    })
}

const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${period}`
}

// Nashville's UTC offset on a given date, e.g. "-05:00" (CDT) or "-06:00" (CST)
const nashvilleOffset = (dateStr, timeStr) => {
    try {
        const probe = new Date(`${dateStr}T${timeStr || '12:00:00'}Z`)
        const name = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, timeZoneName: 'longOffset' })
            .formatToParts(probe)
            .find(part => part.type === 'timeZoneName')?.value
        const match = name?.match(/GMT([+-]\d{2}:\d{2})/)
        return match ? match[1] : ''
    } catch {
        return ''
    }
}

const isoDateTime = (dateStr, timeStr) => {
    if (!dateStr) return undefined
    if (!timeStr) return dateStr
    return `${dateStr}T${timeStr}${nashvilleOffset(dateStr, timeStr)}`
}

const streetAddress = (venue) => [venue?.address_number, venue?.address].filter(Boolean).join(' ')

export const eventImage = (event) => event?.poster_img || event?.event_image || event?.venue?.venue_image || null

export const buildEventSeo = (event, eventType, { origin = '' } = {}) => {
    const type = EVENT_TYPES[eventType]
    const venue = event.venue
    const venueName = venue?.name
    const when = event.date
        ? `${formatLongDate(event.date)}${event.start_time ? ` at ${formatTime(event.start_time)}` : ''}`
        : [event.recurrence, event.start_time && `at ${formatTime(event.start_time)}`].filter(Boolean).join(' ')

    let title = event.event_title
    if (venueName && !title?.includes(venueName)) title += ` at ${venueName}`
    if (event.date) title += ` – ${formatLongDate(event.date)}`
    title += ` | ${SITE_NAME}`

    const where = venueName ? ` at ${venueName}${venue.city ? `, ${venue.city}` : ''}` : ' in Nashville'
    let description = `${type.label}${where}${when ? ` – ${when}` : ''}.`
    // Several events store only a genre ("Country") as the description, which isn't worth repeating
    if (event.description && event.description.length > 20) description += ` ${event.description}`
    if (description.length > 200) description = `${description.slice(0, 197).trimEnd()}…`

    const image = eventImage(event)
    const url = `${origin}${eventPath(eventType, event.id)}`

    return { title, description, image, url, jsonLd: buildEventJsonLd(event, { description, image, url }) }
}

// schema.org MusicEvent for Google event results. Recurring events without a date
// (most open mics) are skipped, since Google requires a concrete startDate.
const buildEventJsonLd = (event, { description, image, url }) => {
    if (!event.date) return null
    const venue = event.venue
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        name: event.event_title,
        description,
        url,
        startDate: isoDateTime(event.date, event.start_time),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    }
    if (event.end_time) jsonLd.endDate = isoDateTime(event.date, event.end_time)
    if (image) jsonLd.image = [image]
    if (venue) {
        jsonLd.location = {
            '@type': 'MusicVenue',
            name: venue.name,
            address: {
                '@type': 'PostalAddress',
                streetAddress: streetAddress(venue),
                addressLocality: venue.city,
                addressRegion: venue.state,
                addressCountry: venue.country,
            },
        }
        if (venue.lat && venue.lng) {
            jsonLd.location.geo = { '@type': 'GeoCoordinates', latitude: Number(venue.lat), longitude: Number(venue.lng) }
        }
        if (venue.website_url) jsonLd.location.url = venue.website_url
        jsonLd.organizer = { '@type': 'Organization', name: venue.name, ...(venue.website_url && { url: venue.website_url }) }
    }
    const ticketUrl = event.ticket_link || event.website_url
    if (ticketUrl) {
        jsonLd.offers = {
            '@type': 'Offer',
            url: ticketUrl,
            availability: 'https://schema.org/InStock',
            validFrom: event.date,
        }
    }
    return jsonLd
}
