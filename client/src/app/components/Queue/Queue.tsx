import Image from 'next/image'
import Delete from '@/src/app/assets/Delete-icon.png'
import './Queue.css';

export default function Queue (){

    return (

    <section className="queue">

        <ul>
            <li className='order'>

                <div className='client-info'>

                    <h1>Nome do cliente</h1>

                    <div className="order-info">
                        <p> Total a pagar: <span>R$25,00</span></p>
                        <p> Total de pães: <span>50 pães</span></p>
                    </div>

                </div>

                <Image src={Delete} alt="delete order"></Image>

            </li>

            <li className='order'>

                <div className='client-info'>

                    <h1>Nome do cliente</h1>

                    <div className="order-info">
                        <p> Total a pagar: <span>R$25,00</span></p>
                        <p> Total de pães: <span>50 pães</span></p>
                    </div>

                </div>

                <Image src={Delete} alt="delete order"></Image>

            </li>

        </ul>

    </section> );
}

