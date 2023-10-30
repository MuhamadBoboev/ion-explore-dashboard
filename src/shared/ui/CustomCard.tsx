import React from 'react'
import Card, { CardTypeMap } from '@mui/material/Card'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const CustomCard: OverridableComponent<CardTypeMap<{}, 'div'>> = (props: any) => {
  return (
    <Card
      {...props}
      sx={{
        minHeight: '100%',
        position: 'relative',
        ...props.sx
      }}
    >
      {props.children}
    </Card>
  )
}

export default CustomCard
