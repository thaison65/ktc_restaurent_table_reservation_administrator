import Header from '../Header';
import SideBar from '../SideBar';

import './DefaultLayout.scss';

function DefaultLayout({ ...props }) {
  const { children, title } = props;

  return (
    <>
      <div id='container'>
        <Header title={title} />
        <SideBar />
        <main>{children}</main>
      </div>
    </>
  );
}

export default DefaultLayout;
