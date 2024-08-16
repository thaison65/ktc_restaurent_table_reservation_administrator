import './Main.scss';

function Main({ ...props }) {
  const { children } = props;

  return <main>{children}</main>;
}

export default Main;
