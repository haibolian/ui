import { Teleport, Transition } from "vue";

export default {
  name: 'LOverlay',
  props: {
    show: Boolean,
    disabled: Boolean
  },
  setup(props, { slots }) {
    
    return () => (
      <Teleport to="body">
        <Transition name="l-overlay">
          <div v-show={ props.show } class={`l-overlay ${props.disabled ? 'l-overlay__disabled' : ''}`}>
            { slots.default() }
          </div>
        </Transition>
      </Teleport>
    )
  },
}