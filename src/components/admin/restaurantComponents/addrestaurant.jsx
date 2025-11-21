'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addRestaurant } from '@/services/RestaurantService';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddRestaurant = ({ categories }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    nomrestaurant: '',
    imagerest: '',
    description: '',
    ville: '',
    telephone: '',
    categorieID: ''
  });
  const [files, setFiles] = useState([]);
  const [validated, setValidated] = useState(false);

  
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

 
  const serverOptions = {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'ecommerce'); 
      data.append('cloud_name', 'dyv58oaan');    

     
      const url = 'https://api.cloudinary.com/v1_1/dyv58oaan/image/upload';

      import('axios').then(({default: axios}) => {
        axios.post(url, data, {
          onUploadProgress: (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          }
        }).then(res => {
          setForm(prev => ({...prev, imagerest: res.data.secure_url}));
          load(res.data.public_id);
        }).catch(err => {
          console.error("Upload failed:", err);
          error('Upload failed');
          abort();
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    if (formEl.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await addRestaurant(form);
      router.push('/admin/restaurants');
    } catch (err) {
      alert('Erreur lors de l\'ajout');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="mb-4">Ajouter un restaurant</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom *</Form.Label>
          <Form.Control
            required
            name="nomrestaurant"
            value={form.nomrestaurant}
            onChange={handleChange}
            placeholder="Nom du restaurant"
          />
          <Form.Control.Feedback type="invalid">
            Veuillez saisir un nom.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ville *</Form.Label>
          <Form.Control
            required
            name="ville"
            value={form.ville}
            onChange={handleChange}
            placeholder="Ville"
          />
          <Form.Control.Feedback type="invalid">
            Veuillez saisir une ville.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Catégorie *</Form.Label>
          <Form.Select
            required
            name="categorieID"
            value={form.categorieID}
            onChange={handleChange}
          >
            <option value="">-- Sélectionner une catégorie --</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.nomcategorie}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Veuillez sélectionner une catégorie.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Image du restaurant</Form.Label>
          <FilePond
            files={files}
            allowMultiple={false}
            onupdatefiles={setFiles}
            acceptedFileTypes={['image/*']}
            server={serverOptions}
            name="file"
            labelIdle='Glissez & déposez votre image ou <span class="filepond--label-action"> Parcourir </span>'
          />
          {form.imagerest && (
            <img src={form.imagerest} alt="Aperçu" className="mt-2 max-w-full h-auto rounded" />
          )}
        </Form.Group>

        <Button type="submit">Ajouter</Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
