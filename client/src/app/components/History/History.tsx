
// reutiliza a formatação do componente fila
import '../Queue/Queue.css'

export default function History (){

    return (

    <section className="queue">

        <ul>
            <li className='order'>

                <div className='client-info'>

                    <h1>Nome do cliente</h1>

                    <div className="order-info">
                        <p> Valor pago: <span>R$25,00</span></p>
                        <p> Total de pães: <span>50 pães</span></p>
                    </div>

                </div>

            </li>

            <li className='order'>

                <div className='client-info'>

                    <h1>Nome do cliente</h1>

                    <div className="order-info">
                        <p> Valor pago: <span>R$25,00</span></p>
                        <p> Total de pães: <span>50 pães</span></p>
                    </div>

                </div>

            </li>

        </ul>

    </section> );
}