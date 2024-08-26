import { useEffect, useState } from 'react';
import './FileInput.scss';

function FileInput({ placeholderLabel = 'Upload Image', onFileSelect, selectedFile }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        onFileSelect(file); // Pass file back to the parent when selected
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      return;
    }
    if (selectedFile) {
      setSelectedImage(selectedFile);
    }
  }, [selectedFile, selectedImage]);

  return (
    <div className='file-input-container'>
      <div className='image-preview'>{selectedImage ? <img src={selectedImage} alt='' /> : <div className='empty-placeholder'></div>}</div>
      <input type='file' id='file-upload' accept='image/*' onChange={handleFileChange} />
      <label htmlFor='file-upload' className='custom-file-upload'>
        {placeholderLabel}
      </label>
    </div>
  );
}

export default FileInput;
