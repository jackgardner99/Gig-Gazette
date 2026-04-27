export const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "en" } }
    )
    const data = await res.json()
    return data.display_name ?? null
}
