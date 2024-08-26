import './Loading.scss';

function Loading({ ...props }) {
  const { show } = props;

  if (!show) {
    return null;
  }

  return (
    <>
      <article className='container-loader'>
        <div className='loader'></div>
        <span>loading...</span>
      </article>
    </>
  );
}

export default Loading;
