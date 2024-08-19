import { useEffect, useState } from 'react';
import Button from '~/components/common/Button';
import InputField from '~/components/common/InputField';

function ChildrenModalCategory({ ...props }) {
  const { onClose, item = {} } = props;

  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (item) {
      setID(item.id || '');
      setName(item.name || '');
      setDescription(item.description || '');
      // Set file if item has one
      // setSelectedFile(item.file || null);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form
    //...
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
    </>
  );
}

export default ChildrenModalCategory;
