import ListTable from '~/pages/ListTable';
import Maps from '~/pages/Maps';
import Order from '~/pages/Order';

const privateRouter = [
  {
    path: '/KTC_FE_MINI_PROJECT/list-table',
    component: ListTable,
    name: 'Danh sách bàn',
  },
  {
    path: '/KTC_FE_MINI_PROJECT',
    component: Maps,
    name: 'Sơ đồ vị trí',
  },
  {
    path: '/KTC_FE_MINI_PROJECT/order',
    component: Order,
    name: 'Danh sách đơn đặt bàn',
  },
];

const publicRouter = [];

export { privateRouter, publicRouter };
