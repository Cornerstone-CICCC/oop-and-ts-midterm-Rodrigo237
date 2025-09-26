export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  update() {
    const newEl = this.render();
    this.element.replaceWith(newEl);
    this.element = newEl;
  }

  render() {
    throw new Error('Component should have a render() method!');
  }

  async mount(container) {
    this.element = await this.render();
    container.appendChild(this.element);
  }
}