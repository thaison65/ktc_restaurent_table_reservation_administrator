import { boxSVGIcon, categorySVGIcon, taskSVGIcon } from '~/assets/icons';

const ListItemSideBar = [
  {
    id: 'maps',
    title: 'Sơ đồ',
    path: '/KTC_FE_MINI_PROJECT',
    icon: categorySVGIcon,
    alt: 'Icon Categories',
  },
  {
    id: 'listtable',
    title: 'Bảng',
    path: '/KTC_FE_MINI_PROJECT/list-table',
    icon: taskSVGIcon,
    alt: 'Icon Task Table',
  },
  {
    id: 'order',
    title: 'Đơn đặt',
    path: '/KTC_FE_MINI_PROJECT/order',
    icon: boxSVGIcon,
    alt: 'Icon Order',
  },
];

export { ListItemSideBar };
