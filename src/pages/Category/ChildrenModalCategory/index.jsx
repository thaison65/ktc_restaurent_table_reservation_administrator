import { useEffect, useState } from 'react';
import Button from '~/components/common/Button';
import Alert from '~/components/common/Dialog/Alert';
import InputField from '~/components/common/InputField';
import { putCategory } from '~/services';
import { checkLength } from '~/utils/validation';

function ChildrenModalCategory({ ...props }) {
  const { onClose, item = {}, handleTriggerReload } = props;

  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '', errors: '' });

  const [showAlert, setShowAlert] = useState({ show: false, onClose: null, title: '', message: '', status: 'success' });

  const handleCloseAlert = () => {
    setShowAlert({ show: false });
    onClose();
  };

  const handleCloseError = () => {
    setShowAlert({ show: false });
  };

  useEffect(() => {
    if (item) {
      setID(item.id || '');
      setName(item.name || '');
      setDescription(item.description || '');
      // Set file if item has one
      // setSelectedFile(item.file || null);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!checkLength(name, 3, 100)) {
        console.error('Tên khu vực có ít nhất 3 ký tự');
        setErrors({ name: 'Tên khu vực có ít nhất 3 ký tự' });
        throw new Error('Tên khu vực có ít nhất 3 ký tự');
      }

      if (!checkLength(description, 5, 500)) {
        console.error('Mô tả của khu vực có ít nhất 5 ký tự');
        setErrors({ description: 'Mô tả của khu vực có ít nhất 5 ký tự' });
        throw new Error('Mô tả của khu vực có ít nhất 5 ký tự');
      }
      const data = {
        name: name,
        description: description,
      };

      await putCategory(id, data);

      setShowAlert({
        show: true,
        onClose: handleCloseAlert,
        title: 'Cập nhật trạng thái',
        message: 'Thông tin trạng thái cập nhật thành công',
        status: 'success',
      });
      handleTriggerReload();
      setErrors({ name: '', description: '', errors: '' });
    } catch (e) {
      setShowAlert({
        show: true,
        onClose: handleCloseError,
        title: 'Lỗi khi cập nhật',
        message: e.message,
        status: 'error',
      });
      console.error(e);
    }
  };
  return (
    <>
      <form id='form-category' onSubmit={handleSubmit}>
        <InputField
          label={'Mã khu vực'}
          id={'id'}
          name={id}
          placeholder={'Nhập mã khu vực'}
          value={id}
          onChange={(e) => setID(e.target.value)}
          readOnly
        />
        <InputField
          label={'Tên khu vực'}
          id={'name'}
          name={name}
          placeholder={'Nhập tên khu vực'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <InputField
          label={'Mô tả'}
          id={'description'}
          name={description}
          placeholder={'Nhập tên khu vực'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <div className='container-btn'>
          <Button type={'submit'} classes={'button btn-submit'} title={'Gửi thông tin'} />
          <Button onClick={onClose} title={'Đóng'} classes={'button btn-close'} />
        </div>
      </form>

      <Alert onClose={showAlert.onClose} show={showAlert.show} title={showAlert.title} message={showAlert.message} status={showAlert.status} />
    </>
  );
}

export default ChildrenModalCategory;
