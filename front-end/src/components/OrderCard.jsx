import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function OrderCard(props) {
  const { user } = useContext(Context);
  const { order } = props;
  const { id, status, saleDate, totalPrice, address } = order;

  const formatDate = saleDate.split('T')[0].split('-').reverse().join('/');

  if (user.role === 'seller') {
    return (
      <Link to={ `/seller/orders/${id}` }>
        <div data-testid={ `seller_orders__element-order-id-${id}` }>
          Pedido
          {' '}
          { id }
        </div>
        <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
          { status }
        </div>
        <div data-testid={ `seller_orders__element-order-date-${id}` }>
          { formatDate }
        </div>
        <div>
          R$
          <span data-testid={ `seller_orders__element-card-price-${id}` }>
            {totalPrice.replace('.', ',') }
          </span>
        </div>
        <div data-testid={ `seller_orders__element-card-address-${id}` }>
          { address }
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={ `/${user.role}/orders/${id}` }
      data-testid={ `customer_orders__element-order-id-${id}` }
    >
      <span>
        Pedido
        {' '}
        { id }
      </span>
      <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </div>
      <div data-testid={ `customer_orders__element-order-date-${id}` }>
        { formatDate }
      </div>
      <div>
        R$
        <span data-testid={ `customer_orders__element-card-price-${id}` }>
          { totalPrice.replace('.', ',') }
        </span>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: shape({
    id: string,
    status: string,
    date: string,
    value: string,
    address: string,
  }),
}.isRequired;

export default OrderCard;
