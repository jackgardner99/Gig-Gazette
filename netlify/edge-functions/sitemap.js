// Dynamic sitemap built from the API so new events are listed without a redeploy.
import { EVENT_TYPES, eventPath } from '../../src/seo/eventSeo.js'

const DEFAULT_API_URL = 'https://gig-gazette-api-production.up.railway.app'

const escapeXml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Today's date in Nashville, as YYYY-MM-DD
const todayInNashville = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date())

const fetchList = async (apiUrl, eventType) => {
    try {
        const res = await fetch(`${apiUrl}/${EVENT_TYPES[eventType].apiPath}`, { signal: AbortSignal.timeout(8000) })
        if (!res.ok) return []
        const data = await res.json()
        return Array.isArray(data) ? data : (data?.results ?? [])
    } catch (error) {
        console.error(`sitemap: could not load ${eventType}`, error)
        return []
    }
}

export default async (request) => {
    const { origin } = new URL(request.url)
    const apiUrl = Netlify.env.get('VITE_API_URL') || DEFAULT_API_URL
    const today = todayInNashville()

    const urls = [
        { loc: `${origin}/`, changefreq: 'daily', priority: '1.0' },
        { loc: `${origin}/contact`, changefreq: 'yearly', priority: '0.3' },
    ]

    const lists = await Promise.all(Object.keys(EVENT_TYPES).map(async (eventType) => [eventType, await fetchList(apiUrl, eventType)]))
    for (const [eventType, events] of lists) {
        for (const event of events) {
            // Past one-off events drop out; recurring events (no date) always stay
            if (!event?.id || event.is_flagged || (event.date && event.date < today)) continue
            urls.push({
                loc: `${origin}${eventPath(eventType, event.id)}`,
                changefreq: event.date ? 'weekly' : 'monthly',
                priority: event.date ? '0.8' : '0.6',
            })
        }
    }

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, changefreq, priority }) => `  <url><loc>${escapeXml(loc)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`
    return new Response(body, {
        headers: {
            'content-type': 'application/xml; charset=utf-8',
            'cache-control': 'public, max-age=3600',
        },
    })
}

export const config = { path: '/sitemap.xml' }
