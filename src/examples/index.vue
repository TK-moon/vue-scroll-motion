<template>
  <main>
    <AnimationSection :animation="[{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]" disable_multiple_animation>
      <div>opacity</div>
    </AnimationSection>
    <AnimationSection
      :animation="[
        { opacity: 0, translate: '0 -100' },
        { opacity: 1, translate: '0 0' },
        { opacity: 0, translate: '0 100' },
      ]"
    >
      <div>translate</div>
    </AnimationSection>
    <AnimationSection :animation="[{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]">
      <div>allow multiple animation</div>
    </AnimationSection>
  </main>
</template>

<script lang="ts">
import AnimationSection from "@/components/AnimationSection.vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    AnimationSection,
  },
})
</script>

<style scoped>
.test {
  color: red;
}
</style>
