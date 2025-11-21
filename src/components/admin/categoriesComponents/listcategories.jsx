'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, deleteCategorie } from "@/services/CategorieService";
import Link from 'next/link';

export default function ListCategories() {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Voulez-vous supprimer cette catégorie ?')) {
      await deleteCategorie(id);
      loadCategories();
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <Link
        href="/admin/categories/addcategorie"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ajouter une Catégorie
      </Link>

      <ul className="mt-6 space-y-3">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <strong>{cat.nomcategorie}</strong><br />
              {cat.imagecategorie && (
                <img src={cat.imagecategorie} alt={cat.nomcategorie} className="w-20 mt-1" />
              )}
            </div>
            <button
              onClick={() => handleDelete(cat._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
