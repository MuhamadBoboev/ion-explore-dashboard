import styled from '@emotion/styled'

export const OrderProductCardStyled = styled('div')`
  .order-product-card {
    display: flex;
    align-items: flex-start;
    min-height: 100px;
    margin-bottom: 24px;

    &__left {
      flex-basis: 25%;
      margin-right: 16px;
      flex-shrink: 0;
      position: relative;
      max-height: 100px;

      &::before {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }

    &__img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 12px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &__right {
      flex-grow: 1;
    }

    &__product-name {
      font-size: 15px;
      line-height: 24px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #333;
    }

    &__list {
      margin: 0;
      padding: 0;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 2px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__name,
    &__value {
      margin: 0;
      padding: 0;
      font-size: 13px;
      line-height: 20px;
      color: #626262;
    }

    &__name {
      margin-right: 4px;
      color: #9a9da3;
    }

    &__value {
      color: #626262;
    }

    &__prices {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-top: 10px;
    }

    &__price,
    &__discount-price {
      font-size: 19px;
      font-weight: 700;
      line-height: 32px;
      color: #FE7100;
      margin: 0;

      @media (max-width: 1024px) {
        font-size: 15px;
        line-height: 24px;
      }

      @media (max-width: 768px) {
        font-size: 21px;
        line-height: 33px;
      }
    }

    &__discount-price {
      margin-right: 28px;
    }

    .strike {
      color: #999;
      text-decoration: line-through;
    }
  }
`
