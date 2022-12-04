import AnimationSection from "./components/AnimationSection.vue"
import Animator from "./components/Animator.vue"

export default {
  AnimationSection: AnimationSection,
  Animator: Animator,
  install(app: any) {
    app.component("AnimationSection", AnimationSection)
    app.component("Animator", Animator)
  },
}
