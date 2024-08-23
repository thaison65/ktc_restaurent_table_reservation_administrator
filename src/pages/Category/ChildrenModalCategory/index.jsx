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

    if (!checkLength(name, 3, 100)) {
      console.error('Sai tên khu vực');
      return;
    }

    if (!checkLength(description, 5, 500)) {
      console.error('Sai mô tả khu vực');
      return;
    }

    try {
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
      console.log('Cập nhật khu vực thành công');
    } catch (e) {
      setShowAlert({
        show: true,
        onClose: handleCloseError,
        title: 'Lỗi khi cập nhật',
        message: 'Cập nhật trạng thái không thành công',
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
          required
          readOnly
        />
        <InputField
          label={'Tên khu vực'}
          id={'name'}
          name={name}
          placeholder={'Nhập tên khu vực'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label={'Mô tả'}
          id={'description'}
          name={description}
          placeholder={'Nhập tên khu vực'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
