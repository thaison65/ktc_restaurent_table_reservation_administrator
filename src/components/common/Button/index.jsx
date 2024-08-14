function Button({ ...props }) {
  const { icon } = props;

  return (
    <div>
      <button className='btn-dropdown'>
        <img src={icon} alt='Icon Element' /> Trạng thái
      </button>
    </div>
  );
}

export default Button;
