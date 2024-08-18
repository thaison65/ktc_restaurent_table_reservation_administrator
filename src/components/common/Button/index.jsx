import './Button.scss';

function Button({ ...props }) {
  const { type = 'button', icon, title, classes, onClick } = props;

  return (
    <>
      <button type={type} className={classes} onClick={onClick}>
        {icon && <img src={icon} alt='Icon Button' />} {title}
      </button>
    </>
  );
}

export default Button;
