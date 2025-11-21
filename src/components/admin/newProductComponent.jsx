"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { addPlat } from '@/services/PlatService';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';


import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewPlat = ({ restaurants }) => {
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageart, setImageart] = useState("");
  const [restaurantID, setRestaurantID] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  if (form.checkValidity() === true) {
    
    if (!restaurantID || !imageart) {
      alert("Veuillez sélectionner un restaurant et ajouter une image.");
      return;
    }

    const newPlat = {
      nom,
      description,
      prix: prix ? parseFloat(prix) : 0,
      qtestock: qtestock ? parseInt(qtestock, 10) : 0,
      imageart,
      restaurantID,
    };

   
    console.log("newPlat à soumettre:", newPlat);

    try {
      setLoading(true);
      await addPlat(newPlat);
      router.push('/admin/plats');
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de l'insertion :", error);
      alert(`Erreur ! Insertion non effectuée: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  setValidated(true);
};


  const serverOptions = () => ({
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'ecommerce');
      data.append('cloud_name', 'dyv58oaan');
      data.append('public_id', file.name);

      axios.post('https://api.cloudinary.com/v1_1/dyv58oaan/image/upload', data)
        .then((res) => {
          setImageart(res.data.url);
          load(res.data);
        })
        .catch((err) => {
          console.error("Upload failed:", err);
          error('Upload failed');
          abort();
        });
    }
  });

  const handleReset = () => {
    setNom("");
    setDescription("");
    setPrix("");
    setQtestock("");
    setImageart("");
    setRestaurantID("");
    setFiles([]);
    setValidated(false);
  };

  return (
    <div className="container mt-4">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2 className="mb-4">Ajout Plat</h2>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" className="mb-3">
            <Form.Label>Nom *</Form.Label>
            <Form.Control
              required
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du plat"
            />
            <Form.Control.Feedback type="invalid">
              Saisir le nom du plat
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <Form.Control.Feedback type="invalid">
              Saisir une description
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" className="mb-3">
            <Form.Label>Prix *</Form.Label>
            <Form.Control
              required
              type="number"
              min="0"
              step="0.01"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              placeholder="Prix"
            />
            <Form.Control.Feedback type="invalid">
              Saisir un prix valide
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" className="mb-3">
            <Form.Label>Qté en stock *</Form.Label>
            <Form.Control
              required
              type="number"
              min="0"
              value={qtestock}
              onChange={(e) => setQtestock(e.target.value)}
              placeholder="Quantité en stock"
            />
            <Form.Control.Feedback type="invalid">
              Quantité requise
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Image *</Form.Label>
            <FilePond
              files={files}
              acceptedFileTypes="image/*"
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={serverOptions()}
              name="file"
              required
            />
            {validated && !imageart && (
              <div className="text-danger" style={{ fontSize: '0.875em' }}>
                Une image est requise
              </div>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Restaurant *</Form.Label>
            <Form.Control
              as="select"
              value={restaurantID}
              onChange={(e) => setRestaurantID(e.target.value)}
              required
            >
              <option value="">Choisir un restaurant</option>
              {restaurants.map((resto) => (
                <option key={resto._id} value={resto._id}>
                  {resto.nomrestaurant}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Sélectionnez un restaurant
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <div className="d-flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Enregistrement en cours...' : 'Enregistrer'}
          </Button>
          <Button variant="warning" onClick={handleReset} disabled={loading}>
            Annuler
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPlat;