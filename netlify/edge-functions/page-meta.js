// Runs on Netlify before the SPA's index.html is served. Crawlers and link-preview
// bots (iMessage, Slack, Facebook) don't run our JavaScript, so this writes the
// page's title, description, Open Graph tags, and JSON-LD into the HTML itself.
import {
    DEFAULT_IMAGE,
    SITE_NAME,
    buildEventSeo,
    eventTypeFromSegment,
    EVENT_TYPES,
    normalizeEvent,
} from '../../src/seo/eventSeo.js'

const DEFAULT_API_URL = 'https://gig-gazette-api-production.up.railway.app'

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const setTag = (html, pattern, tag) =>
    pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)

const setMeta = (html, attr, key, content) => setTag(
    html,
    new RegExp(`<meta ${attr}="${escapeRegex(key)}" content="[^"]*"\\s*/?>`),
    `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`
)

const applySeo = (html, { title, description, url, image, jsonLd }) => {
    if (title) {
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
        html = setMeta(html, 'property', 'og:title', title)
        html = setMeta(html, 'name', 'twitter:title', title)
    }
    if (description) {
        html = setMeta(html, 'name', 'description', description)
        html = setMeta(html, 'property', 'og:description', description)
        html = setMeta(html, 'name', 'twitter:description', description)
    }
    html = setMeta(html, 'property', 'og:url', url)
    html = setMeta(html, 'property', 'og:image', image)
    html = setMeta(html, 'name', 'twitter:image', image)
    html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeHtml(url)}" />`)
    if (jsonLd) {
        // Same id as src/seo/useSeo.js so the client updates this tag rather than adding a second one
        const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        html = html.replace('</head>', `    <script id="page-jsonld" type="application/ld+json">${json}</script>\n  </head>`)
    }
    return html
}

// Plain-HTML version of the event for crawlers; React replaces it on first render.
const eventFallback = (event, eventType, seo) => {
    const venue = event.venue
    const address = venue && [[venue.address_number, venue.address].filter(Boolean).join(' '), venue.city, venue.state]
        .filter(Boolean).join(', ')
    const link = event.ticket_link || event.website_url
    return `<main class="page-content">
      <p>${escapeHtml(EVENT_TYPES[eventType].label)}</p>
      <h1>${escapeHtml(event.event_title)}</h1>
      <p>${escapeHtml(seo.description)}</p>
      ${venue ? `<p>${escapeHtml(venue.name)}${address ? ` – ${escapeHtml(address)}` : ''}</p>` : ''}
      ${link ? `<p><a href="${escapeHtml(link)}" rel="noreferrer">${event.ticket_link ? 'Tickets' : 'Event website'}</a></p>` : ''}
      <p><a href="/">More live music in Nashville on ${SITE_NAME}</a></p>
    </main>`
}

const fetchEvent = async (eventType, id) => {
    const apiUrl = Netlify.env.get('VITE_API_URL') || DEFAULT_API_URL
    const res = await fetch(`${apiUrl}/${EVENT_TYPES[eventType].apiPath}/${encodeURIComponent(id)}`, {
        signal: AbortSignal.timeout(4000),
    })
    if (res.status === 404) return { notFound: true }
    if (!res.ok) throw new Error(`API responded ${res.status}`)
    const event = normalizeEvent(await res.json())
    return event?.id ? { event } : { notFound: true }
}

export default async (request, context) => {
    const response = await context.next()
    if (!response.headers.get('content-type')?.includes('text/html')) return response

    const { origin, pathname } = new URL(request.url)
    let html = await response.text()
    let status = response.status
    let seo = { url: `${origin}${pathname}`, image: `${origin}${DEFAULT_IMAGE}` }

    const match = pathname.match(/^\/details\/([a-z-]+)\/(\d+)\/?$/)
    const eventType = match && eventTypeFromSegment(match[1])
    if (eventType) {
        try {
            const { event, notFound } = await fetchEvent(eventType, match[2])
            if (notFound) {
                status = 404
                html = setMeta(html, 'name', 'robots', 'noindex')
            } else {
                const eventSeo = buildEventSeo(event, eventType, { origin })
                seo = { ...eventSeo, image: eventSeo.image || seo.image }
                html = html.replace('<div id="root"></div>', `<div id="root">${eventFallback(event, eventType, eventSeo)}</div>`)
            }
        } catch (error) {
            // Serve the generic page rather than failing; the client still renders the event
            console.error(`page-meta: could not load ${pathname}`, error)
        }
    }

    const headers = new Headers(response.headers)
    headers.delete('content-length')
    headers.delete('etag')
    return new Response(applySeo(html, seo), { status, headers })
}

export const config = {
    path: ['/', '/contact', '/details/*'],
}
