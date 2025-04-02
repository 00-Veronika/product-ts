<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const cartItems = ref<number>(0)
const isEmpty = ref<boolean>(true)
const products = ref<Product[]>([])

interface Product {
  category: string
  description: string
  items: ProductItem[]
  selected: ProductItem | null
}

interface ProductItem {
  id: number
  name: string
  color: string
  price: number
  image: string
}

const getImage = (image: string): string => {
  return new URL(`../assets/images/${image}`, import.meta.url).href
}

const data: Product[] = [
  {
    category: 'T-Shirts',
    description:
      'Основата на всеки гардероб. Изработена от висококачествени материали, нашата тениска осигурява комфорт и стил през целия ден.',
    items: [
      {
        id: 100,
        name: 'Red T-shirt',
        color: 'red',
        price: 25,
        image: getImage('red_tshirt.png'),
      },
      {
        id: 101,
        name: 'Yellow T-shirt',
        color: 'yellow',
        price: 26,
        image: getImage('yellow_tshirt.png'),
      },
      {
        id: 102,
        name: 'Black T-shirt',
        color: 'black',
        price: 27,
        image: getImage('black_tshirt.png'),
      },
      {
        id: 103,
        name: 'Green T-shirt',
        color: 'green',
        price: 28,
        image: getImage('green_tshirt.png'),
      },
    ],
    selected: null,
  },
  {
    category: 'Sunglasses',
    description:
      'Защита от слънцето и безупречен стил в едно. Нашите слънчеви очила съчетават качество и модерен дизайн, за да се чувствате уверени и комфортни.',
    items: [
      {
        id: 200,
        name: 'Red Sunglasses',
        color: 'red',
        price: 15,
        image: getImage('red_sunglasses.png'),
      },
      {
        id: 201,
        name: 'Yellow Sunglasses',
        color: 'yellow',
        price: 16,
        image: getImage('yellow_sunglasses.png'),
      },
      {
        id: 202,
        name: 'Black Sunglasses',
        color: 'black',
        price: 17,
        image: getImage('black_sunglasses.png'),
      },
      {
        id: 203,
        name: 'Green Sunglasses',
        color: 'green',
        price: 18,
        image: getImage('green_sunglasses.png'),
      },
    ],
    selected: null,
  },
  {
    category: 'Hats',
    description:
      'Допълнете стила си с нашите модерни шапки. Те са практични и стилни, осигуряващи комфорт и защита от слънцето, без да правят компромис с визията.',
    items: [
      {
        id: 300,
        name: 'Red Hat',
        color: 'red',
        price: 100,
        image: getImage('hat_1.png'),
      },
      {
        id: 301,
        name: 'Yellow Hat',
        color: 'yellow',
        price: 101,
        image: getImage('hat_2.png'),
      },
      {
        id: 302,
        name: 'Green Hat',
        color: 'green',
        price: 102,
        image: getImage('hat_3.png'),
      },
      {
        id: 303,
        name: 'Black Hat',
        color: 'black',
        price: 103,
        image: getImage('hat_4.png'),
      },
    ],
    selected: null,
  },
  {
    category: 'Watches',
    description:
      'Комбинация от стил и функционалност. Нашите часовници са перфектни за всеки, който търси изтънченост и точност в ежедневието си.',
    items: [
      {
        id: 400,
        name: 'Red Watch',
        color: 'red',
        price: 50,
        image: getImage('red_watch.png'),
      },
      {
        id: 401,
        name: 'Yellow Watch',
        color: 'yellow',
        price: 51,
        image: getImage('yellow_watch.png'),
      },
      {
        id: 402,
        name: 'Green Watch',
        color: 'green',
        price: 52,
        image: getImage('green_watch.png'),
      },
      {
        id: 403,
        name: 'Black Watch',
        color: 'black',
        price: 53,
        image: getImage('black_watch.png'),
      },
    ],
    selected: null,
  },
  {
    category: 'Diamonds',
    description:
      'Превърнете всеки момент в незабравим с нашите изключителни диаманти. Идеални за специални поводи, те са символ на вечна красота и стойност.',
    items: [
      {
        id: 500,
        name: 'Red Diamond',
        color: 'red',
        price: 1000,
        image: getImage('red_diamond.png'),
      },
      {
        id: 501,
        name: 'Yellow Diamond',
        color: 'yellow',
        price: 1020,
        image: getImage('yellow_diamond.png'),
      },
      {
        id: 502,
        name: 'Green Diamond',
        color: 'green',
        price: 1030,
        image: getImage('green_diamond.png'),
      },
      {
        id: 503,
        name: 'Black Diamond',
        color: 'black',
        price: 1040,
        image: getImage('black_diamond.png'),
      },
    ],
    selected: null,
  },
  {
    category: 'Bracelets',
    description:
      'Перфектният аксесоар, който добавя стил и елегантност на всяко облекло. Изработени с внимание към детайлите, нашите гривни са подходящи за всеки повод.',
    items: [
      {
        id: 600,
        name: 'Red Bracelets',
        color: 'red',
        price: 150,
        image: getImage('red_bracelet.png'),
      },
      {
        id: 601,
        name: 'Yellow Bracelets',
        color: 'yellow',
        price: 151,
        image: getImage('yellow_bracelet.png'),
      },
      {
        id: 602,
        name: 'Green Bracelets',
        color: 'green',
        price: 152,
        image: getImage('green_bracelet.png'),
      },
      {
        id: 603,
        name: 'Black Bracelets',
        color: 'black',
        price: 153,
        image: getImage('black_bracelet.png'),
      },
    ],
    selected: null,
  },
]

products.value = data

const selectProduct = (product: ProductItem, index: number) => {
  products.value[index].selected = product
}

const addToCart = (product: ProductItem) => {
  if (!product || !product.name || !product.price) {
    console.error('Продуктът е невалиден!')
    return
  }

  const cart = JSON.parse(localStorage.getItem('cart') || '""') || []

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  })

  localStorage.setItem('cart', JSON.stringify(cart))
  cartItems.value++
  setCartCount()
}

const handleClick = () => {
  router.replace('/cart')
}

const setCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') ?? '') || []
  const count = cart?.length ?? 0
  const empty = count === 0

  cartItems.value = count
  isEmpty.value = empty
}
</script>

<template>
  <!-- Заглавие -->
  <header class="header">
    <h1>Продуктов каталог</h1>
  </header>

  <div class="product-grid">
    <section v-for="(product, index) in products" :key="index" class="product">
      <div class="product__photo">
        <div class="photo-container">
          <div class="photo-main">
            <img :src="product.selected?.image ?? product.items[0]?.image" alt="product image" />
          </div>
          <div class="photo-album">
            <ul>
              <li>
                <h3>{{ product.category }}</h3>
                <ul>
                  <li v-for="(item, idx) in product.items" :key="idx">
                    <img
                      :src="item.image"
                      :alt="item.color + ' ' + product.category"
                      @click="selectProduct(item, index)"
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="product__info">
        <div class="title">
          <h1>{{ product.selected?.name ?? product.items[0]?.name }}</h1>
          <span>COD: 457777799</span>
        </div>
        <div class="price">
          <span>{{ product.selected?.price ?? product.items[0]?.price }} $</span>
        </div>

        <div class="description">
          <h3>Описание:</h3>
          <ul class="noPoint">
            <li>{{ product.description }}</li>
          </ul>
        </div>
        <button class="buy--btn" @click="addToCart(product.selected ?? product.items[0])">
          ADD TO CART
        </button>
      </div>
    </section>
  </div>
  <div v-if="!isEmpty" class="cart-button" @click="handleClick">🧺 Cart ({{ cartItems }})</div>
  <!-- Footer -->
  <footer class="footer">
    <p>Изготвено от Вероника Пенева - 2101681046</p>
  </footer>
</template>

<style scoped>
.cart-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2d844e;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}
.cart-button:hover {
  background-color: #58cb4b;
  transform: scale(1.05);
}

/* Контейнер за продукти */
.product-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr); /* 4 колони */
  margin-bottom: 20px;
}

/* Навигация */
.navbar {
  text-align: center;
  margin-bottom: 20px;
}

.navbar ul {
  list-style: none;
  padding: 0;
}

.navbar li {
  display: inline;
  margin: 0 15px;
}

.navbar a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.navbar a:hover {
  color: #71a61d;
}

/* Заглавие */
.header h1 {
  text-align: center;
  font-size: 36px;
}

.product {
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Лява част (снимки) */
.product__photo {
  width: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;
}

.photo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.photo-main {
  position: relative;
  width: 100%;
  background: linear-gradient(45deg, #f0f0f0, #ddd);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.photo-main img {
  width: 250px;
  height: 300px;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
}

/* Албум със снимки */
.photo-album ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
  list-style: none;
}

.photo-album li img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.photo-album li img:hover {
  transform: scale(1.1);
}

/* Дясна част (информация) */
.product__info {
  flex: 1;
  padding: 10px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.title h1 {
  font-size: 28px;
  color: #333;
  text-align: center;
}

.title span {
  display: block;
  font-size: 16px;
  color: #777;
}

.price {
  font-size: 26px;
  color: #44981a;
  font-weight: bold;
  text-align: center;
}

.variant h3,
.description h3 {
  color: #555;
  text-align: center;
}

.noPoint {
  list-style-type: none;
}

.variant {
  text-align: center;
}

.variant ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.variant ul li img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.variant ul li img:hover {
  transform: scale(1.1);
}

.buy--btn {
  margin-top: 10px;
  padding: 12px 20px;
  background-color: #71a61d;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buy--btn:hover {
  background-color: #385307;
}

.buy--btn:active {
  transform: scale(0.98);
}

/* Responsive */

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 колони */
  }

  .product {
    flex-direction: column;
    align-items: center;
  }

  .product__photo {
    width: 100%;
    margin-bottom: 20px;
  }

  .product__info {
    flex: 1;
    width: 100%;
  }

  .title h1 {
    font-size: 24px;
  }

  .price {
    font-size: 22px;
  }

  .buy--btn {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-button {
    padding: 10px 15px;
    font-size: 14px;
    bottom: 15px;
    right: 15px;
  }

  .product-grid {
    grid-template-columns: 1fr; /* 1 колона */
  }

  .product__photo {
    width: 100%;
    padding: 20px;
  }

  .photo-main img {
    width: 200px;
    height: 250px;
  }

  .product__info {
    padding: 10px;
  }

  .title h1 {
    font-size: 20px;
  }

  .price {
    font-size: 18px;
  }

  .buy--btn {
    padding: 10px;
    font-size: 14px;
  }

  .navbar a {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .product__photo {
    padding: 15px;
  }

  .product__info {
    padding: 8px;
  }

  .title h1 {
    font-size: 18px;
  }

  .price {
    font-size: 16px;
  }

  .buy--btn {
    padding: 8px 16px;
    font-size: 12px;
  }

  .navbar a {
    font-size: 14px;
  }
}
</style>
