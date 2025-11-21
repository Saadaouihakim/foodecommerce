const CATEGORIE_API = "/categories/";

const buildURL = (path = "") => `${process.env.API_URL}${CATEGORIE_API}${path}`;

export const fetchCategories = async () => {
  const res = await fetch(buildURL(), { cache: 'no-store' });
  if (!res.ok) throw new Error("Échec de récupération des catégories");
  return await res.json();
};

export const fetchCategorieById = async (categorieId) => {
  const res = await fetch(buildURL(categorieId), { method: "GET" });
  if (!res.ok) throw new Error("Échec de récupération de la catégorie");
  return await res.json();
};

export const addCategorie = async (categorie) => {
  const res = await fetch(buildURL(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categorie),
  });
  if (!res.ok) throw new Error("Échec de création de la catégorie");
  return await res.json();
};

export const editCategorie = async (categorie) => {
  const res = await fetch(buildURL(categorie._id), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categorie),
  });
  if (!res.ok) throw new Error("Échec de modification de la catégorie");
  return await res.json();
};

export const deleteCategorie = async (categorieId) => {
  const res = await fetch(buildURL(categorieId), { method: "DELETE" });
  if (!res.ok) throw new Error("Échec de suppression de la catégorie");
  return await res.json();
};
