import type { CSSProperties } from "vue"

export type SupportAnimationType = "opacity" | "translate" | "scale" | "rotate"

type OverrideTypes = "rotate"

export interface AnimationType extends Omit<Pick<CSSProperties, SupportAnimationType>, OverrideTypes> {
  rotate?: number
}

interface ScrollAnimationDataType {
  percentage: {
    from: number
    to: number
  }
  animation: {
    from: AnimationType
    to: AnimationType
  }
}

const generateScrollTimeline = (animation: AnimationType[]) => {
  const data = animation.reduce<ScrollAnimationDataType[]>((acc, item, index) => {
    if (index === 0) return acc

    const last_item_of_acc = acc[acc.length - 1]

    const from = last_item_of_acc ? last_item_of_acc.percentage.to : 0
    const to = (100 / (animation.length - 1)) * index

    const from_animation = last_item_of_acc ? last_item_of_acc.animation.to : animation[0]
    const to_animation = item

    return [
      ...acc,
      {
        percentage: { from: from, to: to },
        animation: { from: from_animation, to: to_animation },
      },
    ]
  }, [])
  return data
}

const generateScrollAnimationFunctionsByScrollTimeline = (
  animation_data: ReturnType<typeof generateScrollTimeline>
) => {
  return animation_data.map((v, index) => {
    const style_keys = Object.keys(v.animation.to) as unknown as (keyof CSSProperties)[]

    return (scroll_percentage: number, element: HTMLElement) => {
      const in_range = v.percentage.from <= scroll_percentage && scroll_percentage < v.percentage.to
      if (!in_range) return

      const scroll = scroll_percentage * animation_data.length
      const section_scroll_percentage = scroll - index * 100

      if (style_keys.includes("opacity")) {
        if (v.animation.from.opacity === undefined || v.animation.to.opacity === undefined) {
          throw new Error("opacity property not available")
        }

        if (v.animation.from.opacity > v.animation.to.opacity) {
          const opacity = 1 - section_scroll_percentage / 100
          element.style.opacity = opacity.toString()
        } else if (v.animation.from.opacity < v.animation.to.opacity) {
          const opacity = section_scroll_percentage / 100
          element.style.opacity = opacity.toString()
        }
      }

      if (style_keys.includes("translate")) {
        if (v.animation.from.translate === undefined || v.animation.to.translate === undefined) {
          throw new Error("translate property not available")
        }

        const [before_x = 0, before_y = 0] = v.animation.from.translate.toString().split(" ").map(Number)
        const [current_x = 0, current_y = 0] = v.animation.to.translate.toString().split(" ").map(Number)

        const translate_y = (current_y - before_y) * (section_scroll_percentage / 100) + before_y
        const translate_x = (current_x - before_x) * (section_scroll_percentage / 100) + before_x

        element.style.translate = `${translate_x}px ${translate_y}px`
      }

      if (style_keys.includes("scale")) {
        if (v.animation.from.scale === undefined || v.animation.to.scale === undefined) {
          throw new Error("scale property not available")
        }

        if (v.animation.from.scale > v.animation.to.scale) {
          const from = parseInt(v.animation.from.scale.toString())
          const to = parseInt(v.animation.to.scale.toString())

          const scale = to + (1 - section_scroll_percentage / 100) * (from - to)
          element.style.scale = scale.toString()
        } else if (v.animation.from.scale < v.animation.to.scale) {
          const from = parseInt(v.animation.from.scale.toString())
          const to = parseInt(v.animation.to.scale.toString())

          const scale = from + (section_scroll_percentage / 100) * (to - from)
          element.style.scale = scale.toString()
        }
      }

      if (style_keys.includes("rotate")) {
        if (v.animation.from.rotate === undefined || v.animation.to.rotate === undefined) {
          throw new Error("scale property not available")
        }

        if (v.animation.from.rotate > v.animation.to.rotate) {
          const from = parseInt(v.animation.from.rotate.toString())
          const to = parseInt(v.animation.to.rotate.toString())

          const rotate = from + to * (section_scroll_percentage / 100)
          element.style.rotate = `${rotate}deg`
        } else if (v.animation.from.rotate < v.animation.to.rotate) {
          const from = parseInt(v.animation.from.rotate.toString())
          const to = parseInt(v.animation.to.rotate.toString())

          const rotate = from + to * (section_scroll_percentage / 100)
          element.style.rotate = `${rotate}deg`
        }
      }
    }
  })
}

/**
 * @deprecated Rendring bug exist when set will-change manually
 * @param animation
 * @returns
 */
const getAnimationKeys = (animation: AnimationType[]) => {
  const animation_keys = new Set<CSSProperties>()
  animation.map((v) => {
    const keys = Object.keys(v) as unknown as CSSProperties[]
    keys.forEach((item) => animation_keys.add(item))
  })
  animation_keys.delete("opacity" as Pick<CSSProperties, "opacity">)
  return Array.from(animation_keys)
}

type AnimationFunctionType = (scroll_percentage: number, element: HTMLElement) => void
type getAnimationTimelineDataReturnType = {
  start_style: AnimationType
  end_style: AnimationType
  animation_functions: AnimationFunctionType[]
  animation_keys: CSSProperties[]
}
export const getAnimationTimelineData = (animation: AnimationType[]): getAnimationTimelineDataReturnType => {
  const scroll_timeline_data = generateScrollTimeline(animation)
  const animation_keys = getAnimationKeys(animation)
  const animation_functions = generateScrollAnimationFunctionsByScrollTimeline(scroll_timeline_data)

  return {
    start_style: scroll_timeline_data[0].animation.from,
    end_style: scroll_timeline_data[scroll_timeline_data.length - 1].animation.to,
    animation_functions,
    animation_keys,
  }
}
