"use client";
import React from "react";
import Link from "next/link";

const ListRestaurantsCards = ({ restaurants }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tous les restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((rest) => (
          <div
            key={rest._id}
            className="border rounded shadow p-4 flex flex-col"
          >
            {rest.imagerest && (
              <img
                src={rest.imagerest}
                alt={rest.nomrestaurant}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h2 className="text-xl font-semibold mb-1">{rest.nomrestaurant}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Description:</strong>{" "}
              {rest.description || "Non spécifiée"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Ville:</strong> {rest.ville}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Téléphone:</strong> {rest.telephone || "Non fourni"}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Catégorie:</strong> {rest.categorieID?.nomcategorie || "Inconnue"}
            </p>
            <Link
              href={`/client/cartProductsPagination/${rest._id}`}
              className="mt-auto inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
            >
              Voir les plats
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRestaurantsCards;
