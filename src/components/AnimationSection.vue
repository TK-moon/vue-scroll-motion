<template>
  <section
    ref="sectionRef"
    class="animation-section"
    :style="{ marginBottom: disable_multiple_animation ? '100vh' : '0', height: `${height}vh` }"
  >
    <Animator :sectionRef="() => sectionRef" :active="true" :animation="animation">
      <slot></slot>
    </Animator>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import type { PropType } from "vue"
import Animator from "./Animator.vue"
import type { AnimationType } from "@/utils/animation_utils"

export default defineComponent({
  components: { Animator },
  props: {
    animation: { type: Object as PropType<AnimationType[]>, required: true },
    disable_multiple_animation: { type: Boolean },
    height: { type: Number, default: 100, required: false },
  },
  setup() {
    const sectionRef = ref<HTMLElement>()
    return { sectionRef }
  },
})
</script>

<style lang="scss" scoped>
.animation-section {
  position: relative;
  display: flex;
  place-items: center;
}
</style>
