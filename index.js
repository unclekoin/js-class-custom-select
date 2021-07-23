const container = document.querySelector('#container');
const ID = Math.random().toString(16).slice(-4);
const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
];

class CustomSelect {
  #id;
  #options;
  #cls;

  constructor(id, options) {
    this.#id = id;
    this.#options = options;
    this.#cls = 'select-dropdown';
  }

  #createElement(props) {
    const { tag, cls = [], attr = {}, text = '' } = props;

    const el = document.createElement(tag);
    if (cls.length) el.classList.add(...cls);
    if (Object.keys(attr).length) {
      Object.entries(attr).forEach(([key, value]) => el.setAttribute(key, value));
    }
    if (text) el.textContent = text;

    return el;
  }

  #getClasses(postfix = '') {
    return [
      `${this.#cls}${postfix ? `__${postfix}` : ''}`,
      `${this.#cls}${postfix ? `__${postfix}` : ''}--${this.#id}`,
    ];
  }

  #createSelect() {
    const select = this.#createElement({
      tag: 'div',
      cls: this.#getClasses()
    });
    
    const button = this.#createElement({
      tag: 'button',
      cls: this.#getClasses('button'),
    });
    const buttonText = this.#createElement({
      tag: 'span',
      cls: this.#getClasses(),
      text: 'Выберите элемент',
    });
    button.append(buttonText);
    select.append(button);

    const list = this.#createElement({
      tag: 'ul',
      cls: this.#getClasses('list')
    });
    select.append(list)

    this.#options.forEach((item) => {
      list.append(this.#createElement({
        tag: 'li',
        cls: [this.#getClasses('list-item')[0]],
        attr: { 'data-value': item.value },
        text: item.text
      }));
    });

    return select;
  }

  render(container) {
    container.append(this.#createSelect());
    return this;
  }
}


const select = new CustomSelect(ID, options);

select.render(container);