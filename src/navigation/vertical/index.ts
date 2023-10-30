// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Баннера',
      path: '/main/banners',
      icon: 'ion:images-outline',
    },
    {
      title: 'Категории',
      path: '/main/categories',
      icon: 'ep:menu',
    },
    {
      title: 'Поставщики',
      path: '/main/providers',
      icon: 'ic:baseline-shop-2',
    },
    {
      title: 'Товары',
      icon: 'fluent-mdl2:product',
      children: [
        {
          title: 'Все товары',
          path: '/main/products',
        },
        {
          title: 'Добавить товар',
          path: '/main/products/create',
        },
        {
          title: 'Типы товаров',
          path: '/main/products/product-types',
        },
        {
          title: 'Коллекции',
          path: '/main/products/collections',
        },
        {
          title: 'Атрибуты',
          path: '/main/products/attributes',
        },
      ]
    },
    {
      title: 'Специалисты',
      path: '/main/specialists',
      icon: 'iconoir:community',
      children: [
        {
          title: 'Все специалисты',
          path: '/main/specialists',
        },
        {
          title: 'Категории',
          path: '/main/specialists/categories',
        },
      ]
    },
    {
      title: 'Услуги',
      path: '/main/services',
      icon: 'mdi:account-service',
    },
    {
      title: 'Проекты',
      path: '/main/projects',
      icon: 'octicon:project-roadmap-16',
    },
    {
      title: 'Админы',
      path: '/main/admins',
      icon: 'grommet-icons:user-admin',
    },
    {
      title: 'Пользователи',
      path: '/main/users',
      icon: 'fa:users',
    },
    {
      title: 'Методы оплаты',
      path: '/main/payment-methods',
      icon: 'wpf:bank-cards',
    },
    {
      title: 'Типы доставки',
      path: '/main/shipping-types',
      icon: 'iconamoon:delivery-fast-fill',
    },
    {
      title: 'Локации доставки',
      path: '/main/shipping-locations',
      icon: 'ph:map-pin-line',
    },
    {
      title: 'Все заказы',
      path: '/main/orders',
      icon: 'game-icons:box-unpacking',
    },
    {
      title: 'Вакансии',
      icon: 'solar:document-bold',
      children: [
        {
          path: '/main/vacancies',
          title: 'Все вакансии',
        },
        {
          path: '/main/vacancies/create',
          title: 'Добавить вакансию',
        },
        {
          path: '/main/vacancies/categories',
          title: 'Категории',
        },
      ]
    },
  ]
}

export default navigation
