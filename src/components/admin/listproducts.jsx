"use client";

import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import Image from "next/image";

import Button from "react-bootstrap/Button";
import { deletePlat } from "@/services/PlatService";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";

const ListPlats = ({ plats }) => {
  const router = useRouter();

  const deletePlatHandler = (id) => {
    if (window.confirm("Supprimer le plat ?")) {
      deletePlat(id)
        .then((res) => {
          console.log(res);
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "imageart",
        header: "Image",
        Cell: ({ cell }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Image
              src={cell.getValue() || "/default-image.png"} 
              alt="plat"
              height={50}
              width={50}
            />
          </Box>
        ),
      },
      {
        accessorKey: "nom", 
        header: "Nom",
        size: 150,
      },
      {
        accessorKey: "description", 
        header: "Description",
        size: 250,
        Cell: ({ cell }) => (
          <span>
            {cell.getValue().length > 50
              ? cell.getValue().substring(0, 50) + "..."
              : cell.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "prix",
        header: "Prix (TND)",
        size: 100,
      },
      {
        accessorKey: "qtestock",
        header: "Stock",
        size: 100,
      },
      {
        accessorKey: "_id",
        header: "Actions",
        size: 120,
        Cell: ({ cell }) => (
          <div>
            <Button size="md" className="text-primary btn-link edit">
              <Link href={`/admin/plats/updatePlat/${cell.row.original._id}`}>
                <EditOutlinedIcon />
              </Link>
            </Button>

            <Button
              onClick={() => deletePlatHandler(cell.row.original._id)}
              variant="danger"
              size="md"
              className="text-danger btn-link delete"
            >
              <DeleteForeverIcon />
            </Button>
          </div>
        ),
      },
    ],
    [plats]
  );

  return (
    <div className="container">
      <Button variant="dark" size="sm" className="mb-3">
        <Link
          href="/admin/plats/newPlat"
          style={{
            textDecoration: "none",
            color: "aqua",
            fontSize: 14,
          }}
        >
          <AddCircleOutlineIcon /> Nouveau
        </Link>
      </Button>

      <MaterialReactTable columns={columns} data={plats} />
    </div>
  );
};

export default ListPlats;
