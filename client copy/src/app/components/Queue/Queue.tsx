"use client";
import axios from 'axios';
import { CiEdit,  CiTrash } from "react-icons/ci";
import './Queue.css';
import { useEffect, useState } from 'react';
import EditOrder from '../Forms/EditOrder';

interface Order {
  id: number;
  customer_name: string;
  numberOfBreads: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  FulfilledOrder: boolean;
}

interface Stats {
  peopleInQueue: Order[];
}

export default function Queue() {
  const [stats, setStats] = useState<Stats>({
    peopleInQueue: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
        const ordersRes = await axios.get<Order[]>('http://localhost:8080/orders');
        const ordersData = ordersRes.data;

        const peopleInQueue = ordersData.filter((order) => !order.FulfilledOrder);

        setStats({
          peopleInQueue,
        });
    };

    fetchOrders();
  }, []);
    
  const handleDelete = async (orderId: number) => {
    const response = await axios.delete(`http://localhost:8080/order/${orderId}`);

    // atualiza da pagina
    window.location.reload();

};

  // State para ver se o form de editar pedido está aberto
  const [editOrder, setEditOrder] = useState<boolean>(false);

  const initialOrder : Order ={
      id: 0,
      customer_name: "",
      numberOfBreads: 0,
      totalPrice: 0,
      createdAt: "",
      updatedAt: "",
      FulfilledOrder: false
    }

  const [currentOrder, setCurrentOrder] = useState<Order>(initialOrder);

  // abrir form de editar pedido
  const OpenEditOrderForm = () => {
    setEditOrder(true);
  };

    // adiciona classe ao html para não haver overflow-y (para que o form ocupe toda tela)
  useEffect(() => {
    if (editOrder) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [editOrder]);

  // fechar form de editar pedido
  const CloseEditOrderForm = () =>{
    setEditOrder(false);
  }

  const handleEdit = (order: Order) => {
    setCurrentOrder(order);
    OpenEditOrderForm();
  };

  return (
    <section className="queue">
      <ul>
        {stats.peopleInQueue.map((order) => (
          <li key={order.id} className="order">
            <div className="client-info">
              <h1>{order.customer_name}</h1>
              <div className="order-info">
                <p>
                  Total a pagar: <span>R${order.totalPrice.toFixed(2)}</span>
                </p>
                <p>
                  Total de pães: <span>{order.numberOfBreads} pães</span>
                </p>
              </div>
            </div>
            <div className='custom-icons'>
              <button onClick={() => handleDelete(order.id)}> <CiTrash size={30} className="custom-icon"/> </button>
              <button onClick={() => handleEdit(order)}><CiEdit size={30} className="custom-icon" /></button>
            </div>

          </li>
        ))}

      </ul>

    {editOrder?
    <EditOrder closeEditOrderForm={CloseEditOrderForm} order={currentOrder}></EditOrder>: ""}

    </section>
  );
}
