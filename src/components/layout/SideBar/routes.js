import {
  boxFocusSVGIcon,
  boxSVGIcon,
  // categoryFocusSVGIcon,
  // categorySVGIcon,
  settingFocusSVGIcon,
  settingSVGIcon,
  taskFocusSVGIcon,
  taskSVGIcon,
} from '~/assets/icons';

const ListItemSideBar = [
  // {
  //   id: 'maps',
  //   title: 'Sơ đồ',
  //   path: '/KTC_FE_MINI_PROJECT',
  //   icon: categorySVGIcon,
  //   iconFocus: categoryFocusSVGIcon,
  //   alt: 'Icon Categories',
  // },
  {
    id: 'listtable',
    title: 'Bảng',
    path: '/KTC_FE_MINI_PROJECT',
    icon: taskSVGIcon,
    iconFocus: taskFocusSVGIcon,
    alt: 'Icon Task Table',
  },
  {
    id: 'order',
    title: 'Đơn đặt',
    path: '/KTC_FE_MINI_PROJECT/order',
    icon: boxSVGIcon,
    iconFocus: boxFocusSVGIcon,
    alt: 'Icon Order',
  },
  {
    id: 'category',
    title: 'Khu vực',
    path: '/KTC_FE_MINI_PROJECT/category',
    icon: settingSVGIcon,
    iconFocus: settingFocusSVGIcon,
    alt: 'Icon Category',
  },
];

export { ListItemSideBar };
