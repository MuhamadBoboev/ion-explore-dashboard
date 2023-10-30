import { IOrderItem } from '@modules/order/model/IOrderItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { OrderProductCard } from '@modules/order/ui/OrderProductCard'

interface Props {
  items: IOrderItem[]
}

function OrderProducts({items}: Props) {
  if (!items) {
    return null
  }

  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        mb={10}
      >
        Товары
      </Typography>
      <Box
        component="ul"
        m={0}
        p={0}
        sx={{listStyle: 'none',}}
      >
        {items.map(item => (
          <li key={item.id}>
            <OrderProductCard {...item} />
          </li>
        ))}
      </Box>
    </Box>
  )
}

export { OrderProducts }
