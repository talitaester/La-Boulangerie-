import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createOrder(customer_name: string, numberOfBreads: number): Promise<any> {
  const totalPrice = numberOfBreads * 0.5; // Calculando o preço total assumindo que cada pão custa R$0,50
  try {
    const newOrder = await prisma.order.create({
      data: {
        customer_name,
        numberOfBreads,
        totalPrice,
        FulfilledOrder: false,
      },
    });
    return newOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao criar o pedido');
  }
}

export async function updateOrder(id: number, customer_name: string, numberOfBreads: number): Promise<any> {
  const totalPrice = numberOfBreads * 0.5; // Calculando o preço total assumindo que cada pão custa R$0,50
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        customer_name,
        numberOfBreads,
        totalPrice,
      },
    });
    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao atualizar o pedido');
  }
}

export async function finishOrder(id: number): Promise<any> {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        FulfilledOrder: true,
      },
    });
    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao finalizar o pedido');
  }
}

export async function deleteOrder(id: number): Promise<void> {
  try {
    await prisma.order.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao excluir o pedido');
  }
}

export async function getAllOrders(): Promise<any[]> {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao obter todos os pedidos');
  }
}
