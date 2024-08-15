import { Link } from 'react-router-dom';

import './ItemSidebar.scss';

function ItemSidebar({ ...props }) {
  const { icon, alt, title, path, focus } = props;

  return (
    <>
      <li className={`item-sidebar ${focus ? 'focus-sidebar' : ''}`}>
        <Link to={path} className='link-item'>
          <img src={icon} alt={alt} />
          <span >{title}</span>
        </Link>
      </li>
    </>
  );
}

export default ItemSidebar;
