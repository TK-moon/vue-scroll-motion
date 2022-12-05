<template>
  <main>
    <VueScrollMotion :animation="animation1" disable_multiple_animation>
      <div>opacity</div>
    </VueScrollMotion>
    <VueScrollMotion
      :animation="[
        { opacity: 0, translate: '0 -100' },
        { opacity: 1, translate: '0 0' },
        { opacity: 0, translate: '0 100' },
      ]"
    >
      <div>translate</div>
    </VueScrollMotion>
    <VueScrollMotion :animation="[{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]">
      <div>allow multiple animation</div>
    </VueScrollMotion>
  </main>
</template>

<script lang="ts">
import VueScrollMotion from "@/main"
import type { AnimationType } from "@/main"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    VueScrollMotion,
  },
  setup() {
    const animation1: AnimationType[] = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]

    return { animation1 }
  },
})
</script>

<style scoped>
.test {
  color: red;
}
</style>
