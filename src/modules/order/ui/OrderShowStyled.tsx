import styled from '@emotion/styled'

export const OrderShowStyled = styled('div')`
  flex-basis: 45%;
  width: 48%;
  overflow: hidden;

  .list {
    list-style: none;
    margin: 0 0 0;
    padding: 0;
  }

  .item {
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .name,
  .value {
    padding: 0;
    margin: 0;
  }

  .name {
    font-size: 13px;
    line-height: 20px;
    margin-bottom: 4px;
  }

  .value {
    display: block;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
    padding: 12px;
    width: 100%;
  }
`
