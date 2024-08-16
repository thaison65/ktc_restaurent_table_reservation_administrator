import './ItemDesk.scss';
function ItemDesk({ ...props }) {
  const { id, title, status } = props;

  const handleClick = () => {
    console.log(id, title, status);
  };

  return (
    <>
      <div className={`item-desk ${status === '1' ? 'desk-active' : ''} `} onClick={handleClick}>
        <span>{title}</span>
      </div>
    </>
  );
}

export default ItemDesk;
