import { useEffect } from "react"
import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_TITLE } from "./eventSeo"

const JSON_LD_ID = 'page-jsonld'

const absoluteUrl = (url) => {
    if (!url) return url
    return url.startsWith('http') ? url : `${window.location.origin}${url}`
}

// Updates the existing tag in place (index.html or the edge function may have
// already rendered it) instead of appending duplicates.
const upsert = (selector, create, apply) => {
    let el = document.head.querySelector(selector)
    if (!el) {
        el = create()
        document.head.appendChild(el)
    }
    apply(el)
}

const setMeta = (attr, key, content) => upsert(
    `meta[${attr}="${key}"]`,
    () => { const el = document.createElement('meta'); el.setAttribute(attr, key); return el },
    el => el.setAttribute('content', content ?? '')
)

const setCanonical = (href) => upsert(
    'link[rel="canonical"]',
    () => { const el = document.createElement('link'); el.rel = 'canonical'; return el },
    el => { el.href = href }
)

const setJsonLd = (data) => {
    const existing = document.getElementById(JSON_LD_ID)
    if (!data) { existing?.remove(); return }
    upsert(
        `#${JSON_LD_ID}`,
        () => { const el = document.createElement('script'); el.id = JSON_LD_ID; el.type = 'application/ld+json'; return el },
        el => { el.textContent = JSON.stringify(data) }
    )
}

const apply = ({ title, description, image, path, jsonLd, noindex }) => {
    const url = absoluteUrl(path ?? window.location.pathname)
    const imageUrl = absoluteUrl(image || DEFAULT_IMAGE)
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setCanonical(url)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
    setJsonLd(jsonLd)
}

// Pass `null` while page data is still loading to leave the current tags alone.
export const useSeo = (seo) => {
    const key = seo && JSON.stringify(seo)
    useEffect(() => {
        if (!key) return
        apply({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...JSON.parse(key) })
        return () => apply({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: null })
    }, [key])
}
