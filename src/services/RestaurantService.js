const RESTAURANT_API = "/restaurants/";

const buildURL = (path = "") => `${process.env.API_URL}${RESTAURANT_API}${path}`;

export const fetchRestaurants = async () => {
    const res = await fetch(buildURL(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch restaurants');
    return await res.json();
};

export const fetchRestaurantById = async (restaurantId) => {
    const res = await fetch(buildURL(restaurantId), { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch restaurant');
    return await res.json();
};

export const deleteRestaurant = async (restaurantId) => {
    const res = await fetch(buildURL(restaurantId), { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete restaurant');
    return await res.json();
};

export const addRestaurant = async (restaurant) => {
    const res = await fetch(buildURL(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant),
    });
    if (!res.ok) throw new Error('Failed to add restaurant');
    return await res.json();
};

export const editRestaurant = async (restaurant) => {
    const res = await fetch(buildURL(restaurant._id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant),
    });
    if (!res.ok) throw new Error('Failed to update restaurant');
    return await res.json();
};
