'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { editPlat } from '@/services/PlatService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdatePlat = ({ plat, restaurants }) => {
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [qtestock, setQtestock] = useState('');
  const [imageart, setImageart] = useState('');
  const [restaurantID, setRestaurantID] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setNom(plat.nom);
    setDescription(plat.description);
    setPrix(plat.prix);
    setQtestock(plat.qtestock);
    setImageart(plat.imageart);
    setRestaurantID(plat.restaurantID);

    setFiles([
      {
        source: plat.imageart,
        options: { type: 'local' }
      }
    ]);
  }, [plat]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const platEdited = {
        _id: plat._id,
        nom,
        description,
        prix,
        qtestock,
        imageart,
        restaurantID
      };

      await editPlat(platEdited)
        .then((res) => {
          router.push('/admin/plats');
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
          alert('Erreur ! Modification non effectuée');
        });
    }
    setValidated(true);
  };

  const serverOptions = () => {
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'iset-sfax');
        data.append('public_id', file.name);

        axios
          .post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            setImageart(data.url);
            load(data);
          })
          .catch((error) => {
            console.error('Erreur lors du téléchargement de l\'image:', error);
            error('Upload failed');
            abort();
          });
      }
    };
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Modifier un Plat</h2>
        <div className="container w-100 d-flex justify-content-center">
          <div className="form mt-3">
            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label>Nom *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Saisir le nom du plat
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Saisir une description
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Prix"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Qté Stock</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Qté Stock"
                  value={qtestock}
                  onChange={(e) => setQtestock(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Saisir une quantité valide
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label>Image</Form.Label>
                <div style={{ width: '100%', margin: 'auto' }}>
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    server={serverOptions()}
                    name="file"
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Restaurant</Form.Label>
                <Form.Control
                  as="select"
                  value={restaurantID}
                  onChange={(e) => setRestaurantID(e.target.value)}
                >
                  <option value="">Choisir un restaurant</option>
                  {restaurants?.map((resto) => (
                    <option key={resto._id} value={resto._id}>
                      {resto.nom}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>

            <Button type="submit" className="mt-3">
              Valider
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePlat;
