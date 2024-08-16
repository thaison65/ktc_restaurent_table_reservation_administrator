import { closeSVGIcon } from '~/assets/icons';
import './ModalDialog.scss';

function ModelDialog() {
  return (
    <>
      <div id='container-modal'>
        <div className='content-modal'>
          <div className='header-modal'>
            <div className='empty'></div>
            <h2>Thêm vị trí bàn</h2>
            <button className='icon-close'>
              <img src={closeSVGIcon} alt='Icon Element' onClick={() => console.log('Close modal')} />
            </button>
          </div>

          <div className='main-modal'></div>
        </div>
      </div>
    </>
  );
}

export default ModelDialog;
