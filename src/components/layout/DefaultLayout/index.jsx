import Header from '../Header';
import SideBar from '../SideBar';

import './DefaultLayout.scss';

function DefaultLayout({ children, title }) {
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
