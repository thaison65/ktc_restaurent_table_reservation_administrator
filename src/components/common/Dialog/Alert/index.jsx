import { useEffect } from 'react';

import './Alert.scss';
import { checkedSVGIcon, errorSVGIcon } from '~/assets/icons';

function Alert({ ...props }) {
  const { show, onClose, title, message, status } = props;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(
        () => {
          onClose();
        },
        status === 'success' ? 800 : 1200
      );

      // Clear timeout nếu component unmount trước khi timer kết thúc
      return () => clearTimeout(timer);
    }
  }, [show, onClose, status]);

  if (!show) {
    return null;
  }

  return (
    <div id='container-alert'>
      <div className={`alert ${status}`}>
        <h4>{title}</h4>
        <div className='content-alert'>
          <img src={status === 'success' ? checkedSVGIcon : errorSVGIcon} alt='' />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default Alert;
