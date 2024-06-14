import './CreateOrder.css';
import { useEffect, useState } from "react";
import axios from "axios";

interface CreateOrderProps {
    closeCreateOrderForm: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ closeCreateOrderForm }) => {
    const [customerName, setCustomerName] = useState<string>("");
    const [totalBreads, setTotalBreads] = useState<number>(0);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

            const response = await axios.post("http://localhost:8080/order", {
                customer_name: customerName,
                numberOfBreads: totalBreads,
            });

            // fecha o formulário dps de enviar
            closeCreateOrderForm();
            window.location.reload();

    };

    return (
        <section className="create-order">
            <form className="create-order-form" onSubmit={handleSubmit}>

                <label htmlFor="customerName"> Adicionar pessoa a fila</label>

                <input
                    type="text"
                    id="customerName"
                    placeholder='Nome completo do cliente'
                    className='order-input'
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />

                <input
                    type="number"
                    id="totalBreads"
                    placeholder='Total de pães'
                    className='order-input'
                    required
                    min="0"
                    value={totalBreads}
                    onChange={(e) => setTotalBreads(parseInt(e.target.value))}

                />

                <div className='form-buttons'>
                    <button type="submit" className='send-button'> Enviar </button>
                    <button type="button" className='cancel-button' onClick={closeCreateOrderForm}> Cancelar </button>
                </div>

            </form>
        </section>
    );
}

export default CreateOrder;
