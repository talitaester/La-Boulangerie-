import { useEffect, useState } from "react";
import axios from "axios";
import "../Queue/Queue.css";

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
  fulfilled: Order[];
}

export default function History() {
  const [stats, setStats] = useState<Stats>({
    fulfilled: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRes = await axios.get<Order[]>("http://localhost:8080/orders");
        const ordersData = ordersRes.data;

        const fulfilled = ordersData.filter((order) => order.FulfilledOrder);

        setStats({
          fulfilled,
        });
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="history">
      <ul>
        {stats.fulfilled.map((order) => (
          <li key={order.id} className="order">
            <div className="client-info">
              <h1>{order.customer_name}</h1>
              <div className="order-info">
                <p>
                  Valor pago: <span>R${order.totalPrice.toFixed(2)}</span>
                </p>
                <p>
                  Total de pães: <span>{order.numberOfBreads} pães</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
