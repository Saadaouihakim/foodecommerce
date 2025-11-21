"use client";
import React from "react";
import { useParams } from "next/navigation";
import CartPlatsItem from '@/components/client/shoppingCart/CartPlatsItem';
import { fetchPlatsPaginationFilter } from "@/services/PlatService";
import TablePagination from '@mui/material/TablePagination';

async function getPlats(page, rowsPerPage, searchTerm, prixMax, restaurantID) {
  page++;
  const data = await fetchPlatsPaginationFilter(page, rowsPerPage, searchTerm, prixMax, restaurantID);
  return data;
}

const CartProductsWithPaginationPage = () => {
  const { id: restaurantID } = useParams();

  const [plats, setPlats] = React.useState([]);
  const [tot, setTot] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [prixMax, setPrixMax] = React.useState('');
  const [maxValuePrix, setMaxValuePrix] = React.useState('');

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    if (!restaurantID) return;
    getPlats(page, rowsPerPage, searchTerm, prixMax, restaurantID).then((res) => {
      setTot(res.total);
      setPlats(res.plats);
      setMaxValuePrix(res.maxValuePrix);
    });
  }, [page, rowsPerPage, searchTerm, prixMax, restaurantID]);

  return (
    <div className="row">
      {/* Filtres */}
      <div className="col-sm-3 mt-5">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Filtre nom</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Prix Max {prixMax}</span>
          </div>
          <input
            type="range"
            className="form-range"
            min="0"
            max={maxValuePrix}
            step="1"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des plats */}
      <div className="col-sm">
        <div className="row">
          {plats && plats.map((plat) => (
            <CartPlatsItem key={plat?._id} plat={plat} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TablePagination
            component="div"
            count={tot}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductsWithPaginationPage;
