import { useEffect, useState } from 'react';

import InputField from '~/components/common/InputField';
import FileInput from '~/components/common/InputField/FileInput';
import Button from '~/components/common/Button';
import SelectArea from '~/components/common/SelectItem';

import './ChildrenModal.scss';

const categories = [
  {
    id: 1,
    title: 'Sân vườn',
  },
  {
    id: 2,
    title: 'Quầy bar',
  },
  {
    id: 3,
    title: 'Trong sảnh',
  },
  {
    id: 4,
    title: 'Cạnh biển',
  },
];

function ChildrenModal({ ...props }) {
  const { onClose, item = {} } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '', errors: '' });

  const handleSelect = (event) => {
    console.log('Select:', event.target.value);
    setSelectedArea(event.target.value);
    console.log(selectedArea);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file); // Lưu file đã chọn vào state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (description.trim() === '') {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('id', id);
    formData.append('name', name);
    formData.append('selectedArea', selectedArea);
    formData.append('description', description);

    console.log('Submitting form with data:', { id, name, selectedArea, description, selectedFile });

    // Clear the form after submission (optional)
    setID('');
    setName('');
    setSelectedArea('');
    setDescription('');
    setSelectedFile(null);
    setErrors({ name: '', description: '', errors: '' });
  };

  useEffect(() => {
    if (item) {
      setID(item.id || '');
      setName(item.name || '');
      setSelectedArea(item.selectedArea || '');
      setDescription(item.description || '');
      // Set file if item has one
      // setSelectedFile(item.file || null);
    }
  }, [item]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <FileInput placeholderLabel='Chọn hình' onFileSelect={handleFileSelect} />

        <InputField id='id' name='id' label='ID:' value={id} onChange={(e) => setID(e.target.value)} required readOnly />
        <InputField
          id='name'
          name='name'
          label='Tên chỗ ngồi: '
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />

        <SelectArea title={'Chọn khu vực'} options={categories} onSelect={handleSelect} selectedValue={selectedArea} />

        <InputField
          id='description'
          name='description'
          label='Mô tả: '
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          required
        />

        <div className='container-btn'>
          <Button type='submit' title={'Thêm'} classes={'button btn-submit'} />
          <Button onClick={onClose} title={'Đóng'} classes={'button btn-close'} />
        </div>
      </form>
    </>
  );
}

export default ChildrenModal;
