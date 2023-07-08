<template>
  <VApp>
    <VMain>
      <router-view v-slot="{Component}">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </VMain>
  </VApp>
</template>
<script setup>

</script>
