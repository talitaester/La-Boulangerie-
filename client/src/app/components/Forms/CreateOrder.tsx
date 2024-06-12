"use client";
import './CreateOrder.css'

interface CreateOrderProps {
    closeCreateOrderForm: () => void;
  }
  

// export default function CreateOrder<CreateOrderProps> ({ closeCreateOrderForm }){

const CreateOrder: React.FC<CreateOrderProps> = ({ closeCreateOrderForm }) => {
    return (

    <section className="create-order">
        <form className="create-order-form">

            <label htmlFor="customerName"> Adicionar pessoa a fila</label>

            <input
            type="text"
            id="customerName"
            placeholder='Nome completo do cliente'
            className='order-input'
            required
            />

            <input
            type="text"
            id="totalBreads"
            placeholder='Total de pães'
            className='order-input'
            required
            />

            <div className='form-buttons'>
                <button className='send-button'> Enviar </button>
                <button className='cancel-button' onClick={closeCreateOrderForm}> Cancelar </button>
            </div>

        </form>
    </section> );
}

export default CreateOrder;
