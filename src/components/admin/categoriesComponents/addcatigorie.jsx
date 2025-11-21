'use client';

import { useState } from 'react';
import { addCategorie } from '@/services/CategorieService';
import { useRouter } from 'next/navigation';

export default function AddCategorie() {
  const [formData, setFormData] = useState({
    nomcategorie: '',
    imagecategorie: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategorie(formData);
      router.push('/categories');
    } catch (err) {
      alert('Erreur lors de l’ajout');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label>Nom de la catégorie</label>
        <input
          type="text"
          name="nomcategorie"
          value={formData.nomcategorie}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label>Image (URL)</label>
        <input
          type="text"
          name="imagecategorie"
          value={formData.imagecategorie}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Enregistrer
      </button>
    </form>
  );
}
