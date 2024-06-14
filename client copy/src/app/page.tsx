"use client";
import "./page.css";
import axios from 'axios';

import Header from "./components/Header/Header";
import Queue from "./components/Queue/Queue";
import History from "./components/History/History";
import CreateOrder from "./components/Forms/CreateOrder";

import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  customer_name: string;
  numberOfBreads: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  FulfilledOrder: boolean;
}


export default function Home() {

  // State para ver se o form de adicionar cliente/pedido está aberto
  const [createOrder, setCreateOrder] = useState<boolean>(false);

  // adiciona classe ao html para não haver overflow-y (para que o form ocupe toda tela)
  useEffect(() => {
    if (createOrder) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [createOrder]);


  // abrir form de adicionar cliente/pedido
  const OpenCreateOrderForm = () => {
    setCreateOrder(true);
  };

  // fechar form de adicionar cliente/pedido
  const CloseCreateOrderForm = () =>{
    setCreateOrder(false);
  }

  return (
    <div className="home">
      
      <Header></Header>

      {createOrder?
      <CreateOrder closeCreateOrderForm={CloseCreateOrderForm} ></CreateOrder>: ""}

      <main className="main">

        <button className="add-order" onClick={OpenCreateOrderForm}> + Adicione pessoas a fila </button>

        <Queue></Queue>

        <p className="finished"> Finalizados </p>

        <History></History>

      </main>

    </div>
  );
}
