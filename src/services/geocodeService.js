export const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "en" } }
    )
    const data = await res.json()
    const { house_number, road, city, town, village, state } = data.address ?? {}
    const street = [house_number, road].filter(Boolean).join(' ')
    const locality = city ?? town ?? village ?? ''
    return [street, locality, state].filter(Boolean).join(', ') || null
}
