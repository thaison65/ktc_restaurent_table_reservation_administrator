import { useState } from 'react';
import './FileInput.scss';

function FileInput({ ...props }) {
  const { placeholderLabel = 'Upload Image', onFileSelect } = props;

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        onFileSelect(file); // Trả file ra ngoài khi chọn
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='file-input-container'>
      <div className='image-preview'>{selectedImage ? <img src={selectedImage} alt='Selected' /> : <div className='empty-placeholder'></div>}</div>
      <input type='file' id='file-upload' accept='image/*' onChange={handleFileChange} />
      <label htmlFor='file-upload' className='custom-file-upload'>
        {placeholderLabel}
      </label>
    </div>
  );
}

export default FileInput;
