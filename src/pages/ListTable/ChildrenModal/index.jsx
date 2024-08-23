import { useEffect, useState } from 'react';

import InputField from '~/components/common/InputField';
import FileInput from '~/components/common/InputField/FileInput';
import Button from '~/components/common/Button';
import SelectArea from '~/components/common/SelectItem';

import './ChildrenModal.scss';
import { getCategories, postView, putView } from '~/services';
import { checkRequired } from '~/utils/validation';
import Alert from '~/components/common/Dialog/Alert';

function ChildrenModal({ ...props }) {
  const { onClose, item = {}, action, handleTriggerReload } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '', errors: '' });

  const [showAlert, setShowAlert] = useState({ show: false, onClose: null, title: '', message: '', status: 'success' });

  const handleSelect = (event) => {
    console.log('Select:', event.target.value);
    setSelectedArea(event.target.value);
    console.log(selectedArea);
  };

  const handleCloseAlert = () => {
    setShowAlert({ show: false });
    onClose();
  };

  const handleCloseError = () => {
    setShowAlert({ show: false });
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file); // Lưu file đã chọn vào state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = {};

      if (!checkRequired(name)) {
        newErrors.name = 'Tên bàn không được trống';
      }

      if (!checkRequired(description)) {
        newErrors.description = 'Mô tả của bàn không được trống';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      console.log('Submitting form with data:', { name, selectedArea, description, selectedFile });

      const data = {
        name: name,
        desk_img: 'Not image',
        description: description,
        category_id: selectedArea,
      };

      if (action === 'add') {
        await postView(data);
        setShowAlert({
          show: true,
          onClose: handleCloseAlert,
          title: 'Thêm thông tin bàn ăn',
          message: 'Thông tin được thêm thành công',
          status: 'success',
        });
        return;
      } else {
        await putView(id, data);
        setShowAlert({
          show: true,
          onClose: handleCloseAlert,
          title: 'Cập nhật thông tin bàn ăn',
          message: 'Thông tin được cập nhật thành công',
          status: 'success',
        });
      }

      // Clear the form after submission (optional)
      setName('');
      setSelectedArea('');
      setDescription('');
      setSelectedFile(null);
      setErrors({ name: '', description: '', errors: '' });

      handleTriggerReload();
    } catch (e) {
      setShowAlert({
        show: true,
        onClose: handleCloseError,
        title: 'Bị lỗi rồi nè!!!!',
        message: e.message,
        status: 'error',
      });
      console.error(e);
    }
  };

  useEffect(() => {
    if (item) {
      setID(item.id || '');
      setName(item.name || '');
      setDescription(item.description || '');
      // Set file if item has one
      // setSelectedFile(item.file || null);

      const getCategory = async () => {
        try {
          const response = await getCategories();
          const tables = response.map((item) => ({
            id: item.id,
            title: item.name,
          }));

          setCategories(tables);

          if (item.categoryName) {
            const category = tables.find((value) => value.title === item.categoryName);
            if (category) {
              setSelectedArea(category.id);
            }
          }
        } catch (e) {
          console.error(e);
        }
      };

      getCategory();
    }
  }, [item]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <FileInput placeholderLabel='Chọn hình' onFileSelect={handleFileSelect} />

        {item.id && <InputField id='id' name='id' label='ID: ' value={id} onChange={(e) => setID(e.target.value)} required readOnly />}

        <InputField id='name' name='name' label='Tên bàn: ' value={name} onChange={(e) => setName(e.target.value)} error={errors.name} required />

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
          <Button type='submit' title={'Gửi thông tin'} classes={'button btn-submit'} />
          <Button onClick={onClose} title={'Đóng'} classes={'button btn-close'} />
        </div>
      </form>

      <Alert onClose={showAlert.onClose} show={showAlert.show} title={showAlert.title} message={showAlert.message} status={showAlert.status} />
    </>
  );
}

export default ChildrenModal;
