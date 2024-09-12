import ListTablePage from '~/pages/ListTable';
// import MapsPage from '~/pages/Maps';
import OrderPage from '~/pages/Order';
import Category from '~/pages/Category';

const privateRouter = [
  {
    path: '',
    component: ListTablePage,
    name: 'Danh sách bàn',
  },
  // {
  //   path: '',
  //   component: MapsPage,
  //   name: 'Sơ đồ vị trí',
  // },
  {
    path: '/order',
    component: OrderPage,
    name: 'Danh sách đơn đặt bàn',
  },
  {
    path: '/category',
    component: Category,
    name: 'Khu vực trong nhà hàng',
  },
];

const publicRouter = [];

export { privateRouter, publicRouter };
