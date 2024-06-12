import "./Header.css";
import Image from "next/image"
import Logo from "@/src/app/assets/Logo.png";
import Queue from "@/src/app/assets/Queue-icon.png";
import Cart from "@/src/app/assets/Cart-icon.png";
import Dolar from "@/src/app/assets/Dolar-icon.png";


export default function Header (){

    return (
    <header>

        <div className="bg"></div>

        <Image src={Logo} alt="logo" className="logo"></Image>

        <section className="total-transactions">

            <div className="card">

                <div className="total-info">
                    <h2> Pessoas na fila</h2>
                    <Image src={Queue} alt="queue icon"></Image>
                </div>

                <h1>7</h1>
            </div>


            <div className="card">

                <div className="total-info">
                    <h2> Pães vendidos</h2>
                    <Image src={Cart} alt="sales icon"></Image>
                </div>

                <h1>350</h1>
            </div>

            <div className={`${"card"} ${"total-amount"}`}>

                <div className="total-info">
                    <h2> Entrada </h2>
                    <Image src={Dolar} alt="entrance icon"></Image>
                </div>

                <h1>R$ 175,00</h1>
            </div>

        </section>

    </header> );
}

