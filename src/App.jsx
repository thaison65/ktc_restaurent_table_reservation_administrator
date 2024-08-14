import { Routes, Route } from 'react-router-dom';
import './App.scss';

import { privateRouter } from './routes';
import DefaultLayout from './components/layout/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        {privateRouter.map((route, index) => {
          const Layout = DefaultLayout;
          const Page = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout title={route.name}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
