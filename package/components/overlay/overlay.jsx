import { Teleport } from "vue";

export default {
  name: 'LOverlay',
  props: {
    show: Boolean
  },
  setup(props, { slots }) {
    
    return () => (
      <Teleport to="body">
      <div v-show={ props.show } class="l-overlay">
        { slots.default() }
      </div>
    </Teleport>
    )
  },
}