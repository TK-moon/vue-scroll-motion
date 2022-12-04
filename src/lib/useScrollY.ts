import { ref, onBeforeMount, onBeforeUnmount, Ref } from "vue"
import throttle from "lodash/throttle"

/**
 * 문서의 수직 방향으로 얼만큼 스크롤 되었는지 px 단위로 반환
 * Lodash Throttle 적용
 *
 * @param wait Default 50
 * @returns window.pageYOffset || window.scrollY
 */
const useScrollY = (
  wait = 50,
  options = { center_scroll_y: false }
): { scrollY: Ref<number>; centerScrollY: Ref<number> } => {
  const { center_scroll_y: center_scroll_y_requested = false } = options

  const scrollPosition = window.pageYOffset || window.scrollY
  const scrollY = ref(0)
  const centerScrollY = ref(scrollPosition + window.innerHeight / 2)

  const onScroll = () => {
    const scrollPosition = window.pageYOffset || window.scrollY
    scrollY.value = scrollPosition // top
    if (center_scroll_y_requested) {
      centerScrollY.value = scrollPosition + window.innerHeight / 2 // center of viewport
    }
  }

  const handleDebouceScroll = throttle(onScroll, wait)

  onBeforeMount(() => window.addEventListener("scroll", handleDebouceScroll, { capture: false }))
  onBeforeUnmount(() => window.removeEventListener("scroll", handleDebouceScroll))

  return { scrollY, centerScrollY }
}

export default useScrollY
