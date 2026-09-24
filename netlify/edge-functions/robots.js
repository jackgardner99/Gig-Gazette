// Served dynamically so the Sitemap line always points at the current domain
// (production, deploy previews, or a custom domain).
export default (request) => {
    const { origin } = new URL(request.url)
    const body = `User-agent: *
Disallow: /submit
Disallow: /edit/
Disallow: /venues/new
Disallow: /venues/edit/

Sitemap: ${origin}/sitemap.xml
`
    return new Response(body, {
        headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' },
    })
}

export const config = { path: '/robots.txt' }
