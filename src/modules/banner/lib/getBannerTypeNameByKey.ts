import { BannerType } from '@modules/banner/model/IBanner'

export function getBannerTypeNameByKey(type: BannerType) {
  const names = {
    main: 'Первый экран',
    secondary: 'В середине',
    tertiary: 'Внизу',
  }
  return names[type]
}
