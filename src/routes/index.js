import ListTablePage from '~/pages/ListTable';
import MapsPage from '~/pages/Maps';
import OrderPage from '~/pages/Order';
import SettingPage from '~/pages/Setting';

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
    path: '/KTC_FE_MINI_PROJECT/setting',
    component: SettingPage,
    name: 'Cài đặt',
  },
];

const publicRouter = [];

export { privateRouter, publicRouter };
