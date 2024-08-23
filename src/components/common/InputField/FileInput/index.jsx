import { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import './FileInput.scss';

function FileInput({ placeholderLabel = 'Upload Image', onFileSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'do8fw064u', // Replace with your Cloudinary cloud name
    },
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your-upload-preset'); // Replace with your upload preset

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cld.cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        onFileSelect(data.secure_url); // Return the Cloudinary URL of the uploaded image
      } catch (error) {
        console.error('Error uploading the image:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className='file-input-container'>
      <div className='image-preview'>{selectedImage ? <img src={selectedImage} alt='Selected' /> : <div className='empty-placeholder'></div>}</div>
      <input type='file' id='file-upload' accept='image/*' onChange={handleFileChange} disabled={uploading} />
      <label htmlFor='file-upload' className='custom-file-upload'>
        {uploading ? 'Uploading...' : placeholderLabel}
      </label>
    </div>
  );
}

export default FileInput;
