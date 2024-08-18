import { closeSVGIcon } from '~/assets/icons';
import './ModalDialog.scss';

function ModelDialog({ ...props }) {
  const { show, onClose, children, title } = props;

  if (!show) {
    return null;
  }

  const handleOutsideClick = (e) => {
    if (e.target.id === 'container-modal') {
      onClose();
    }
  };

  return (
    <>
      <div id='container-modal' className='modal' onClick={handleOutsideClick}>
        <div className='content-modal'>
          <div className='header-modal'>
            <div className='empty'></div>
            <h2>{title}</h2>
            <button className='icon-close' onClick={onClose}>
              <img src={closeSVGIcon} alt='Icon Element' />
            </button>
          </div>

          <div className='main-modal'>{children}</div>
        </div>
      </div>
    </>
  );
}

export default ModelDialog;
