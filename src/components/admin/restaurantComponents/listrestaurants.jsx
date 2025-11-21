'use client';
import React, { useEffect, useState } from 'react';
import { fetchRestaurants, deleteRestaurant } from '@/services/RestaurantService';
import Link from 'next/link';

const ListRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const loadRestaurants = async () => {
    try {
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce restaurant ?')) {
      await deleteRestaurant(id);
      loadRestaurants();
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des restaurants</h1>
      <Link href="/admin/restaurants/addrestaurant" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Ajouter un restaurant
      </Link>
      <ul className="mt-4 space-y-3">
        {restaurants.map((rest) => (
          <li key={rest._id} className="border p-3 rounded shadow-sm flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{rest.nomrestaurant}</h2>
              <p className="text-sm text-gray-600">{rest.ville} - {rest.categorieID?.nomcategorie}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/restaurants/edit/${rest._id}`} className="text-blue-500">Modifier</Link>
              <button onClick={() => handleDelete(rest._id)} className="text-red-500">Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRestaurants;
