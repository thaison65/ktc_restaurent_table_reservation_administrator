import { useEffect, useState } from 'react';

import InputField from '~/components/common/InputField';
import FileInput from '~/components/common/InputField/FileInput';
import Button from '~/components/common/Button';
import SelectArea from '~/components/common/SelectItem';
import Loading from '~/components/common/Dialog/Loading';
import Alert from '~/components/common/Dialog/Alert';

import { getCategories, postView, putView } from '~/services';
import { checkLength, checkRequired } from '~/utils/validation';
import { uploadFile } from '~/services/upload-file';

import './ChildrenModal.scss';

function ChildrenModal({ ...props }) {
  const { onClose, item = {}, action, handleTriggerReload } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [selectedArea, setSelectedArea] = useState(0);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '', errors: '' });

  const [showLoading, setShowLoading] = useState(false);
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
      if (!checkRequired(selectedFile)) {
        throw new Error('Hình ảnh không được để trống');
      }

      if (!checkRequired(name)) {
        setErrors({ name: 'Tên bàn không được trống' });
        throw new Error('Tên bàn không được trống');
      }

      if (!checkLength(description, 5, 500)) {
        console.error('Mô tả của bàn có ít nhất 5 ký tự');
        setErrors({ description: 'Mô tả của bàn có ít nhất 5 ký tự' });
        throw new Error('Mô tả của bàn có ít nhất 5 ký tự');
      }

      let urlImage = '';
      setShowLoading(true);

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const reponse = await uploadFile(formData);
        urlImage = reponse.data;
      }

      const data = {
        name: name,
        desk_img: urlImage,
        description: description,
        category_id: selectedArea,
      };

      if (action === 'add') {
        await postView(data);
        setShowLoading(false);
        setShowAlert({
          show: true,
          onClose: handleCloseAlert,
          title: 'Thêm thông tin bàn ăn',
          message: 'Thông tin được thêm thành công',
          status: 'success',
        });
      } else {
        await putView(id, data);
        setShowLoading(false);
        setShowAlert({
          show: true,
          onClose: handleCloseAlert,
          title: 'Cập nhật thông tin bàn ăn',
          message: 'Thông tin được cập nhật thành công',
          status: 'success',
        });
      }

      // Clear the form after submission (optional)
      handleTriggerReload();

      setName('');
      setSelectedArea('');
      setDescription('');
      setSelectedFile(null);
      setErrors({ name: '', description: '', errors: '' });
    } catch (e) {
      setShowLoading(false);
      setShowAlert({
        show: true,
        onClose: handleCloseError,
        title: 'Thông tin nhập sai!!!',
        message: e.message,
        status: 'error',
      });
      console.error(e);
    }
  };

  useEffect(() => {
    if (item) {
      setID(item.id || '');
      setSelectedFile(item.image || '');
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
          setSelectedArea(tables[0]?.id);

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
        <FileInput placeholderLabel='Chọn hình' onFileSelect={handleFileSelect} selectedFile={selectedFile} />

        {item.id && <InputField id='id' name='id' label='ID: ' value={id} onChange={(e) => setID(e.target.value)} readOnly />}

        <InputField id='name' name='name' label='Tên bàn: ' value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />

        <SelectArea title={'Chọn khu vực'} options={categories} onSelect={handleSelect} selectedValue={selectedArea} />

        <InputField
          id='description'
          name='description'
          label='Mô tả: '
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        {showLoading ? (
          <Loading show={showLoading} />
        ) : (
          <div className='container-btn'>
            <Button type='submit' title={'Gửi thông tin'} classes={'button btn-submit'} />
            <Button onClick={onClose} title={'Đóng'} classes={'button btn-close'} />
          </div>
        )}
      </form>

      <Alert onClose={showAlert.onClose} show={showAlert.show} title={showAlert.title} message={showAlert.message} status={showAlert.status} />
    </>
  );
}

export default ChildrenModal;
