<script setup>
import HistoryItem from './HistoryItem.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-6">
      <div class="flow-root">
        <ul class="-mb-8">
          <HistoryItem
            v-for="(item, index) in items"
            :key="item.id"
            :item="item"
            :is-last="index === items.length - 1"
          />
        </ul>
      </div>
    </div>
  </div>
</template>