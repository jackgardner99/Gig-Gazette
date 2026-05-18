export const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "en" } }
    )
    const data = await res.json()
    const { road, city, town, village, state } = data.address ?? {}
    const locality = city ?? town ?? village ?? ''
    return [road, locality, state].filter(Boolean).join(', ') || null
}
