import './ItemDesk.scss';
function ItemDesk({ ...props }) {
  const { id, title } = props;

  const handleClick = () => {
    console.log(id, title);
  };

  return (
    <>
      <div className={`item-desk `} onClick={handleClick}>
        <span>{title}</span>
      </div>
    </>
  );
}

export default ItemDesk;
