import './CreateOrder.css';
import './EditOrder.css';
import { useEffect, useState } from "react";
import axios from "axios";


interface Order {
    id: number;
    customer_name: string;
    numberOfBreads: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    FulfilledOrder: boolean;
  }

interface EditOrderProps {
    closeEditOrderForm: () => void;
    order: Order;
}

const EditOrder: React.FC<EditOrderProps> = ({ closeEditOrderForm, order}) => {

    // colocar o nome antigo do cliente como estado inicial
    const [customerName, setCustomerName] = useState<string>(order.customer_name);
    // colocar aqui o número de pães referentes ao id do cliente
    const [totalBreads, setTotalBreads] = useState<number>(order.numberOfBreads);

    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const requestData = {
          customer_name: customerName,
          numberOfBreads: totalBreads,
        };
      
        try {
          // Atualiza os dados do pedido
          const response = await axios.put(`http://localhost:8080/order/${order.id}`, requestData);
      
          // Se a caixa de seleção estiver marcada, finaliza o pedido
          if (isChecked) {
            await axios.patch(`http://localhost:8080/order/${order.id}/finish`);
          }
      
          // Fecha o formulário depois de enviar
          closeEditOrderForm();
          window.location.reload();
      
        } catch (error) {
          console.error('Erro ao editar ou finalizar o pedido:', error);
        }
      };
    

    return (
        <section id="edit-order">

            <form className="edit-order-form" onSubmit={handleSubmit}>

                <h1> Editar pedido </h1>

                <label htmlFor="customerName"> Nome do cliente: </label>

                <input
                    type="text"
                    id="customerName"
                    //colocar como placeholder o nome antigo do cliente
                    placeholder={customerName}
                    className='order-input'
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />

                <label htmlFor="totalBreads"> Total de pães: </label>

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

                <div className='finish-order'>
                        <label htmlFor="isFinished"> Finalizar pedido?</label>

                    <input
                        id="isFinished"
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                </div>

                <p className='checkbox-info'> (Pedidos finalizados não podem ser editados) </p>

                <div className='form-buttons'>
                    <button type="submit" className='send-button'> Enviar </button>
                    <button type="button" className='cancel-button' onClick={closeEditOrderForm}> Cancelar </button>
                </div>

            </form>
        </section>
    );
}

export default EditOrder;
