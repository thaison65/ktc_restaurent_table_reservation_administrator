import { Link } from 'react-router-dom';

import './ItemSidebar.scss';

function ItemSidebar({ ...props }) {
  const { icon, alt, title, path } = props;

  return (
    <>
      <li className='item-sidebar'>
        <Link to={path} className='link-item'>
          <img src={icon} alt={alt} />
          <span className='title-sibar'>{title}</span>
        </Link>
      </li>
    </>
  );
}

export default ItemSidebar;
