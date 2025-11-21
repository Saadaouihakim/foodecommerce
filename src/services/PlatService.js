const PLAT_API = "/plats/";

const buildURL = (path = "") => `${process.env.API_URL}${PLAT_API}${path}`;

export const fetchPlats = async () => {
    const res = await fetch(buildURL(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch plats');
    return await res.json();
};

export const fetchPlatById = async (platId) => {
    const res = await fetch(buildURL(platId), { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch plat');
    return await res.json();
};

export const fetchPlatsPaginationFilter = async (page, limit, searchTerm, prixMax, restaurantID) => {
  const query = `paginationFilter?page=${page}&limit=${limit}&searchTerm=${searchTerm}&prixMax=${prixMax}&restaurantID=${restaurantID}`;
  const res = await fetch(buildURL(query), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch filtered plats');
  return await res.json();
};


export const updateQuantity = async (lineOrder) => {
    const path = "qty/";
    const promises = lineOrder.map(async (line) => {
        const res = await fetch(buildURL(`${path}${line.articleID}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: line.quantity }),
        });
        if (!res.ok) throw new Error(`Failed to update quantity for ${line.articleID}`);
        return await res.json();
    });
    return await Promise.all(promises);
};

export const deletePlat = async (platId) => {
    const res = await fetch(buildURL(platId), { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete plat');
    return await res.json();
};

export const addPlat=async(plat)=> {
    const res = await fetch(process.env.API_URL+PLAT_API, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(plat),
    });
    const response = await res.json();
    return response;
}

export const editPlat = async (plat) => {
    const res = await fetch(buildURL(plat._id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plat),
    });
    if (!res.ok) throw new Error('Failed to update plat');
    return await res.json();
};
