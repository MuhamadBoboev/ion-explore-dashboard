import { IOrderItem } from '@modules/order/model/IOrderItem'
import Image from 'next/image'
import clsx from 'clsx'
import { getPriceWithDiscount } from '@modules/order/lib/getPriceWithDiscount'
import { OrderProductCardStyled } from '@modules/order/ui/OrderProductCard/OrderProductCardStyled'
import { useState } from 'react'

function OrderProductCard({
                            product_name,
                            product_image,
                            product_sku,
                            product_discount,
                            quantity,
                            product_base_price,
                            attributes,
                          }: IOrderItem) {
  const [srcImage, setSrcImage] = useState(product_image)

  return (
    <OrderProductCardStyled>
      <article className="order-product-card">
        <div className="order-product-card__left">
          <Image
            className="order-product-card__img"
            src={srcImage || '/images/box.svg'}
            alt={product_name}
            width={100}
            height={100}
            onError={() => {
              setSrcImage('/images/box.svg')
            }}
          />
        </div>
        <div className="order-product-card__right">
          <h3 className="order-product-card__product-name">{product_name}</h3>
          <dl className="order-product-card__list">
            <div className="order-product-card__item">
              <dt className="order-product-card__name">Код товара:</dt>
              <dd className="order-product-card__value">{product_sku}</dd>
            </div>
            <div className="order-product-card__item">
              <dt className="order-product-card__name">Количество:</dt>
              <dd className="order-product-card__value">{quantity}</dd>
            </div>
            {!!product_discount && <div className="order-product-card__item">
              <dt className="order-product-card__name">Скидка:</dt>
              <dd className="order-product-card__value">{product_discount}%</dd>
            </div>}
          </dl>
          {attributes.map(({id, attribute_name, attribute_value, attribute_unit}) => (
            <div key={id} className="order-product-card__item">
              <dt className="order-product-card__name">{attribute_name}:</dt>
              <dd className="order-product-card__value">{attribute_value} {attribute_unit}</dd>
            </div>
          ))}
          <div className="order-product-card__prices">
            {(product_discount || 0) > 0 && (
              <p className="order-product-card__discount-price">
                {getPriceWithDiscount(product_base_price, product_discount || 0)} с.
              </p>
            )}
            <p
              className={clsx('order-product-card__price', product_discount && 'order-product-card__strike')}
            >{product_base_price} с.</p>
          </div>
        </div>
      </article>
    </OrderProductCardStyled>
  )
}

export { OrderProductCard }
