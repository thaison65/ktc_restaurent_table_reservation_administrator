import './ConfirmationDialog.scss'; // Import the CSS file

const ConfirmationDialog = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className='overlay'>
      <div className='dialog'>
        <h3 className='title'>Xác nhận xóa</h3>
        <p>{message}</p>
        <div className='actions'>
          <button className='confirmButton' onClick={onConfirm}>
            Xác nhận
          </button>
          <button className='cancelButton' onClick={onCancel}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
