import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, firestore, ref, uploadBytes, getDownloadURL, setDoc, doc } from '../firebase';
import { useUser } from '@clerk/clerk-react';

const ImageUploadPage = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImages([...images, ...files]);
    }
  };

  const handleUpload = async () => {
    setUploading(true);

    const uploadedURLs: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const storageRef = ref(storage, `uploads/${user?.id}/${file.name}`);
      
      const snapshot = await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedURLs.push(downloadURL);
    }

    setUploadedImages([...uploadedImages, ...uploadedURLs]);
    setUploading(false);
  };

  const handleFinish = async () => {
    if (uploadedImages.length === 0) return;
    
    await setDoc(doc(firestore, 'users', user?.id!), {
      images: uploadedImages,
      username: user?.firstName,
    });

    navigate('/');
  };

  const handleCancel = () => {
    setImages([]);
    setUploadedImages([]);
    navigate('/');
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <div>
        {images.length > 0 && (
          <div>
            <p>Selected Images:</p>
            <ul>
              {images.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
        {uploadedImages.length > 0 && (
          <button onClick={handleFinish}>Finish</button>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <ul>
            {uploadedImages.map((url, index) => (
              <li key={index}><img src={url} alt={`Uploaded Image ${index + 1}`} width="100" /></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPage;
