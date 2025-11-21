'use client';
import ListCategories from '@/components/admin/categoriesComponents/listcategories';

export default function CategoriesPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Catégories</h1>
      <ListCategories />
    </div>
  );
}
