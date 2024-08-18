import './Button.scss';

function Button({ ...props }) {
  const { icon, title, classes, onClick } = props;

  return (
    <>
      <button className={classes} onClick={onClick}>
        <img src={icon} alt='Icon Button' /> {title}
      </button>
    </>
  );
}

export default Button;
