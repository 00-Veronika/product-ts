<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const cart = ref<CartItem[]>([])
const orderCompleted = ref<boolean>(false)

const totalPrice = () => {
  return cart.value.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
}

const removeFromCart = (index: number): void => {
  cart.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const increaseQuantity = (index: number): void => {
  cart.value[index].quantity += 1
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const clearCart = (): void => {
  cart.value = []
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const completeOrder = (): void => {
  orderCompleted.value = true
  cart.value = []
  localStorage.setItem('cart', JSON.stringify(cart.value))

  // Скриване на съобщението след 5 секунди
  setTimeout(() => {
    orderCompleted.value = false
  }, 5000)
}

const loadCart = (): void => {
  const storedCart = (JSON.parse(localStorage.getItem('cart') || '""') as CartItem[]) || []

  // Филтриране на невалидни продукти
  cart.value = storedCart.filter((product: CartItem) => product && product.name && product.price)

  // Ако липсва ID, добавяме уникален такъв
  cart.value = cart.value.map((product, index) => ({
    id: product.id || index,
    name: product.name,
    price: product.price || 0,
    quantity: product.quantity || 1,
  }))
}

onMounted(loadCart)
</script>

<template>
  <section class="cart">
    <h2>Your Cart</h2>

    <div v-for="(product, index) in cart" :key="product.id" class="cart-item">
      <p v-if="product && product.name" class="cart-item-details">
        {{ product.name }} - ${{ product.price.toFixed(2) }} x {{ product.quantity }}
      </p>
      <div class="item-actions">
        <button v-if="product" @click="increaseQuantity(index)" class="increase-btn">Add</button>
        <button v-if="product" @click="removeFromCart(index)" class="remove-btn">Remove</button>
      </div>
    </div>

    <div v-if="cart.length > 0" class="cart-summary">
      <button @click="clearCart" class="clear-cart-btn">Clear Cart</button>
      <p class="total-price">Total Price: ${{ totalPrice().toFixed(2) }}</p>
      <button @click="completeOrder" class="complete-order-btn">Complete Order</button>
    </div>

    <div v-else>
      <p class="empty-cart-message">Your cart is empty!</p>
    </div>

    <!-- Съобщение за успешна поръчка -->
    <div v-if="orderCompleted" class="order-message">
      <p>Thank you! Your payment was successful. Your order has been completed.</p>
    </div>
  </section>
</template>

<style scoped>
.cart {
  background-color: #f4f4f9;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item-details {
  font-size: 16px;
  color: #555;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.remove-btn,
.increase-btn,
.clear-cart-btn,
.complete-order-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover,
.increase-btn:hover,
.clear-cart-btn:hover,
.complete-order-btn:hover {
  background-color: #e60000;
}

.increase-btn {
  background-color: #4caf50;
}

.cart-summary {
  margin-top: 20px;
  text-align: center;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.empty-cart-message {
  text-align: center;
  font-size: 18px;
  color: #888;
}

.order-message {
  text-align: center;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  margin-top: 20px;
  border-radius: 5px;
}

.clear-cart-btn,
.complete-order-btn {
  background-color: #ffbb33;
}

.clear-cart-btn:hover,
.complete-order-btn:hover {
  background-color: #e68900;
}

@media (max-width: 768px) {
  .cart {
    padding: 15px;
    width: 100%;
    max-width: 100%;
  }

  h2 {
    font-size: 20px;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .cart-item-details {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .item-actions {
    width: 100%;
    justify-content: space-between;
    gap: 5px;
  }

  .remove-btn,
  .increase-btn,
  .clear-cart-btn,
  .complete-order-btn {
    padding: 6px 12px;
    font-size: 14px;
  }

  .cart-summary {
    font-size: 16px;
  }

  .total-price {
    font-size: 16px;
  }

  .empty-cart-message {
    font-size: 16px;
  }

  .order-message {
    font-size: 16px;
    padding: 12px;
  }

  .clear-cart-btn,
  .complete-order-btn {
    font-size: 14px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .cart-item {
    padding: 8px;
  }

  .cart-item-details {
    font-size: 13px;
  }

  .remove-btn,
  .increase-btn,
  .clear-cart-btn,
  .complete-order-btn {
    padding: 5px 10px;
    font-size: 12px;
  }

  .order-message {
    font-size: 14px;
    padding: 10px;
  }

  .total-price {
    font-size: 14px;
  }

  .empty-cart-message {
    font-size: 14px;
  }
}
</style>
