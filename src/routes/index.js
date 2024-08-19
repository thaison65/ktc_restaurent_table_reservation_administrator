import ListTablePage from '~/pages/ListTable';
import MapsPage from '~/pages/Maps';
import OrderPage from '~/pages/Order';
import Category from '~/pages/Category';

const privateRouter = [
  {
    path: '/KTC_FE_MINI_PROJECT/list-table',
    component: ListTablePage,
    name: 'Danh sách bàn',
  },
  {
    path: '/KTC_FE_MINI_PROJECT',
    component: MapsPage,
    name: 'Sơ đồ vị trí',
  },
  {
    path: '/KTC_FE_MINI_PROJECT/order',
    component: OrderPage,
    name: 'Danh sách đơn đặt bàn',
  },
  {
    path: '/KTC_FE_MINI_PROJECT/category',
    component: Category,
    name: 'Khu vực trong nhà hàng',
  },
];

const publicRouter = [];

export { privateRouter, publicRouter };
