import { ENUM_SORT_BY } from 'src/constants/enum.sort.by'
import { ENUM_SORT_ORDER } from 'src/constants/enum.sort.order'

export const DEFAULTS = {
  PAGE_SIZE: 100,
  PAGE: 0,
  SORT_ORDER: ENUM_SORT_ORDER.ASC,
  SORT_BY: ENUM_SORT_BY.CREATED_AT,
}
