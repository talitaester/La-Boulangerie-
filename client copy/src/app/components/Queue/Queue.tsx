import Image from 'next/image';
import axios from 'axios';
import Delete from '@/src/app/assets/Delete-icon.png';
import { CiEdit } from "react-icons/ci";
import './Queue.css';
import { useEffect, useState } from 'react';

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
            <div style={{gap:'100px'}}>
              <button onClick={() => handleDelete(order.id)}> <Image src={Delete} alt="delete order" /> </button>
              <button><CiEdit size={35} color="#5F3305"  style={{backgroundColor:'rgba(255, 255, 255, 0.8'}}className="custom-icon" /></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
