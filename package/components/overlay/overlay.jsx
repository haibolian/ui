import { Teleport, Transition } from "vue";

export default {
  name: 'LOverlay',
  props: {
    show: Boolean
  },
  setup(props, { slots }) {
    
    return () => (
      <Teleport to="body">
        <Transition name="l-overlay">
          <div v-show={ props.show } class="l-overlay">
            { slots.default() }
          </div>
        </Transition>
    </Teleport>
    )
  },
}