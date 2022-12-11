# vue-scroll-motion

## install

```
npm install vue-scroll-motion
```

---

## Import components

```
import VueScrollMotion from 'vue-scroll-motion'
```

---

## Example

```
<template>
  <VueScrollMotion
    disable_multiple_animation
    :animation="[
      { opacity: 0, translate: '0 100', rotate: 180 },
      { opacity: 1, translate: '0 0', rotate: 0 },
      { opacity: 0, translate: '0 -100', rotate: -180 },
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

---

## Options

| option                     | description                                      | type                   | default |
| -------------------------- | ------------------------------------------------ | ---------------------- | ------- |
| animation                  | [Reference](#animation-prop-example)             | `Array<AnimationType>` |
| disable_multiple_animation | Prevent animations from running at the same time | `boolean`              | false   |
| height                     | Section height for scroll percentage.            | `number`               | 100(vh) |

---

## Animation Prop Example

```
[
  { opacity: 0, translate: '0 100' },
  { opacity: 1, translate: '0 0' },
  { opacity: 0, translate: '0 -100' },
]
```

### Explain

| scroll percentage | description                                         |
| ----------------- | --------------------------------------------------- |
| 0% ~ 50% scroll   | `opacity` `0` to `1` and `translateY` `100` to `0`  |
| 50% ~ 100% scroll | `opacity` `1` to `0` and `translateY` `0` to `-100` |

> If the component is located at the top of the document, the scroll percentage starts at 50%.

---

## Supported Animation Type

`opacity`, `translate`, `rotate`, `scale`

> Support for custom animation features will be provided
