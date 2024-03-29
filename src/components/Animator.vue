<template>
  <div ref="animator_ref" class="animator" :class="[in_range ? 'animator-in-range' : 'animator-outof-range']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import type { PropType } from "vue"
import useScrollY from "@/lib/useScrollY"
import { computed } from "@vue/reactivity"
import { getAnimationTimelineData } from "@/utils/animation_utils"
import type { AnimationType } from "@/utils/animation_utils"

export default defineComponent({
  props: {
    /**
     * @deprecated
     * use computed section_ref
     */
    sectionRef: {
      type: Function as PropType<() => HTMLElement | undefined>,
      required: true,
    },
    animation: { type: Object as PropType<AnimationType[]>, required: true },
  },
  setup(props) {
    const animator_ref = ref<HTMLElement>()

    const throttle_wait = 0
    const { scrollY } = useScrollY(throttle_wait)
    const is_RAF_activated = throttle_wait !== 0

    const section_ref = computed(() => props.sectionRef())
    const animation_timeline_data = getAnimationTimelineData(props.animation)

    return { animator_ref, section_ref, scrollY, animation_timeline_data, is_RAF_activated }
  },
  data() {
    return {
      RAF_timeout: undefined as number | undefined,
      in_range: false,
    }
  },
  mounted() {
    this.renderAnimationWithRAF(this.scrollY)
  },
  methods: {
    /**
     * getScrollPercentage
     * @param current_scroll
     */
    getScrollPercentage: function (current_scroll: number) {
      if (!this.section_ref) {
        return 0
      }
      const section_offset_top = this.section_ref.offsetTop
      const section_offset_height = this.section_ref.offsetHeight

      /**
       * Section이 viewport에 조금이라도 보여질때부터 시작하여야 하기 때문에 window.innerHeight를 빼준다.
       */
      const startPosition = section_offset_top - innerHeight
      const currentPositionBySection = current_scroll - startPosition
      /**
       * Section이 viewport에서 전부 사라져야 애니메이션이 끝나기때문에 innerHieht를 더해준다.
       */
      const ratio = currentPositionBySection / (section_offset_height + innerHeight)

      const scroll_percentage = ratio * 100
      return scroll_percentage
    },
    initializeStartAnimation: function () {
      const animation_init_data = this.animation_timeline_data.start_style
      if (this.animator_ref) Object.assign(this.animator_ref.style, animation_init_data)
    },
    initializeEndAnimation: function () {
      const animation_init_data = this.animation_timeline_data.end_style
      if (this.animator_ref) Object.assign(this.animator_ref.style, animation_init_data)
    },
    renderAnimation: function (scroll: number) {
      if (!this.animator_ref) return
      const animatorRef = this.animator_ref

      const scroll_percentage = this.getScrollPercentage(scroll)
      const is_out_of_scroll_range = 0 >= scroll_percentage || scroll_percentage >= 100

      if (is_out_of_scroll_range) {
        this.in_range = false
        if (scroll_percentage <= 0) {
          return this.initializeStartAnimation()
        } else if (scroll_percentage >= 100) {
          return this.initializeEndAnimation()
        }
      }

      this.in_range = true
      this.animation_timeline_data.animation_functions.forEach((renderSectionAnimation) => {
        renderSectionAnimation(scroll_percentage, animatorRef)
      })
    },
    renderAnimationWithRAF: function (scroll: number) {
      if (!this.animator_ref) return

      if (this.is_RAF_activated) {
        this.renderAnimation(scroll)
      } else {
        if (this.RAF_timeout) {
          cancelAnimationFrame(this.RAF_timeout)
          this.RAF_timeout = undefined
        }
        this.RAF_timeout = requestAnimationFrame(() => {
          this.renderAnimation(scroll)
        })
      }
    },
  },
  watch: {
    scrollY: function (nv) {
      this.renderAnimationWithRAF(nv)
    },
  },
  unmounted: function () {
    this.RAF_timeout = undefined
  },
})
</script>

<style lang="scss" scoped>
.animator {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.animator-in-range {
    position: fixed;
    will-change: auto;
  }
  &.animator-outof-range {
    position: absolute;
    will-change: unset;
    z-index: -1;
  }
}
</style>
