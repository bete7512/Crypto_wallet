<template>
  <div>
    <div v-for="product in customer_products" :key="product.id">
      <input
        type="checkbox"
        :id="`product-${product.id}`"
        v-model="product.is_selected"
      />
      <label :for="`product-${product.id}`">{{ product.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const customer_products = ref([
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
  {
    id: 4,
    name: 'Product 4',
  },
  {
    id: 5,
    name: 'Product 5',
  },
  {
    id: 6,
    name: 'Product 6',
  },
  {
    id: 7,
    name: 'Product 7',
  },
  {
    id: 8,
    name: 'Product 8',
  },
  {
    id: 9,
    name: 'Product 9',
  },
  {
    id: 10,
    name: 'Product 10',
  },
  {
    id: 11,
    name: 'Product 11',
  },
  {
    id: 12,
    name: 'Product 12',
  },
  {
    id: 13,
    name: 'Product 13',
  },
  {
    id: 14,
    name: 'Product 14',
  },
  {
    id: 15,
    name: 'Product 15',
  },
  {
    id: 16,
    name: 'Product 16',
  },
  {
    id: 17,
    name: 'Product 17',
  },
  {
    id: 18,
    name: 'Product 18',
  },
  {
    id: 19,
    name: 'Product 19',
  },
  {
    id: 20,
    name: 'Product 20',
  },
  {
    id: 21,
    name: 'Product 21',
  },
  {
    id: 22,
    name: 'Product 22',
  },
  {
    id: 23,
    name: 'Product 23',
  },
  {
    id: 24,
    name: 'Product 24',
  },
  {
    id: 25,
    name: 'Product 25',
  },
  {
    id: 26,
    name: 'Product 26',
  },
  {
    id: 27,
    name: 'Product 27',
  },

]);

watchEffect(() => {
  if (customer_products.value) {
    customer_products.value.forEach((product) => {
      if (!product.hasOwnProperty('is_selected')) {
        product['is_selected'] = false;
      }
          
    });
  }
});
</script>
