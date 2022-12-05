# vue-scroll-motion

## install

```
npm install vue-scroll-motion
```

## Usage

```
<template>
  <VueScrollMotion
    disable_multiple_animation
    :animation="[
      { opacity: 0, translate: '0 100' },
      { opacity: 1, translate: '0 0' },
      { opacity: 0, translate: '0 -100' },
    ]"
  >
    ...
  </VueScrollMotion>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import VueScrollMotoin from 'vue-scroll-motion'

export default defineComponent({
  components: {
    VueScrollMotion,
  },
})
</script>
```
