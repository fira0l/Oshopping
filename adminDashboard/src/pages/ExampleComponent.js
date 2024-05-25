// src/components/ExampleComponent.js
import React, { useState } from 'react';
import api from '../utils/api';

const ExampleComponent = ({ name }) => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name); 
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      setError(error);
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>{name}</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {fileUrl && (
        <div>
          <p>File uploaded successfully. View it below:</p>
          <img src={fileUrl} alt="Uploaded file" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <p>{name}</p> {/* Display the product name */}
    </div>
  );
};

export default ExampleComponent;