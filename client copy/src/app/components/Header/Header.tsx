import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Logo from "@/src/app/assets/Logo.png";
import QueueIcon from "@/src/app/assets/Queue-icon.png";
import CartIcon from "@/src/app/assets/Cart-icon.png";
import DolarIcon from "@/src/app/assets/Dolar-icon.png";
import "./Header.css";

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
  peopleInQueue: number;
  breadsSold: number;
  totalSold: number;
}

export default function Header() {
  const [stats, setStats] = useState<Stats>({
    peopleInQueue:0,
    breadsSold: 0,
    totalSold: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
        const ordersRes = await axios.get<Order[]>("http://localhost:8080/orders");
        const ordersData = ordersRes.data;

        const peopleInQueue = ordersData.filter((order) => !order.FulfilledOrder).length;
        const fulfilledOrders = ordersData.filter((order) => order.FulfilledOrder);
        const breadsSold = fulfilledOrders.reduce((sum, order) => sum + order.numberOfBreads, 0);
        const totalSold = fulfilledOrders.reduce((sum, order) => sum + order.totalPrice, 0);

        setStats({
          peopleInQueue,
          breadsSold,
          totalSold,
        });
    };

    fetchOrders();
  }, []);

  return (
    <header>
      <div className="bg"></div>
      <Image src={Logo} alt="logo" className="logo" />

      <section className="total-transactions">
        <div className="card">
          <div className="total-info">
            <h2>Pessoas na fila</h2>
            <Image src={QueueIcon} alt="queue icon" />
          </div>
          <h1>{stats.peopleInQueue}</h1>
        </div>

        <div className="card">
          <div className="total-info">
            <h2>Pães vendidos</h2>
            <Image src={CartIcon} alt="sales icon" />
          </div>
          <h1>{stats.breadsSold}</h1>
        </div>

        <div className={`${"card"} ${"total-amount"}`}>
          <div className="total-info">
            <h2>Entrada</h2>
            <Image src={DolarIcon} alt="entrance icon" />
          </div>
          <h1>R$ {stats.totalSold.toFixed(2)}</h1>
        </div>
      </section>
    </header>
  );
}
