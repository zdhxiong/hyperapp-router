import { h } from "hyperapp"

export function Link(props, children) {
  return function(state, actions) {
    var to = props.to
    var location = state.location
    var onclick = props.onclick
    delete props.to
    delete props.location

    props.href = to
    props.onclick = function(e) {
      if (onclick) {
        onclick(e)
      }
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        props.target === "_blank"
      ) {
      } else {
        e.preventDefault()

        if (to !== location.pathname) {
          history.pushState(location.pathname, "", to)
        }
      }
    }

    return h("a", props, children)
  }
}
