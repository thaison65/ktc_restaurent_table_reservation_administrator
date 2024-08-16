import './Button.scss';

function Button({ ...props }) {
  const { icon, title, classes } = props;

  return (
    <>
      <button className={classes}>
        <img src={icon} alt='Icon Button' /> {title}
      </button>
    </>
  );
}

export default Button;
