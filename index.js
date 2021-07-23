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
  #currentSelectedOption;

  constructor(id, options) {
    this.#id = id;
    this.#options = options;
    this.#cls = 'select-dropdown';
    this.#currentSelectedOption = '';
  }

  #createElement(props) {
    const { tag, cls = [], attr = {}, text = '' } = props;

    const el = document.createElement(tag);
    if (cls.length) el.classList.add(...cls);
    if (Object.keys(attr).length) {
      Object.entries(attr).forEach(([key, value]) =>
        el.setAttribute(key, value)
      );
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
      cls: this.#getClasses(),
    });

    const button = this.#createElement({
      tag: 'button',
      cls: this.#getClasses('button'),
    });
    const buttonText = this.#createElement({
      tag: 'span',
      cls: this.#getClasses(),
      text: 'Select an item...',
    });
    button.append(buttonText);
    select.append(button);

    const list = this.#createElement({
      tag: 'ul',
      cls: this.#getClasses('list'),
    });
    select.append(list);

    this.#options.forEach((item) => {
      list.append(
        this.#createElement({
          tag: 'li',
          cls: [this.#getClasses('list-item')[0]],
          attr: { 'data-value': item.value },
          text: item.text,
        })
      );
    });

    return select;
  }

  #openSelect() {
    const button = document.querySelector('.select-dropdown__button');
    const list = document.querySelector('.select-dropdown__list');

    button.addEventListener('click', () => {
      list.classList.add('active');
    });
  }

  #selectItem() {
    const list = document.querySelector('.select-dropdown__list');
    const span = document.querySelector('span.select-dropdown');

    list.addEventListener('click', (event) => {
      const { target } = event;

      if (target.closest('.select-dropdown__list-item')) {
        document
          .querySelectorAll('.select-dropdown__list-item')
          .forEach((item) => item.classList.remove('selected'));

        target.classList.add('selected');
        this.#currentSelectedOption = target.dataset.value;
        span.textContent = `${target.dataset.value}. ${target.textContent}`;
        list.classList.remove('active');
        console.log(this.#selectedValue);
      }
    });
  }

  get #selectedValue() {
    return this.#options
      .filter((item) => String(item.value) === this.#currentSelectedOption);
  }

  render(container) {
    container.append(this.#createSelect());
    this.#openSelect();
    this.#selectItem();
    return this;
  }
}

const customSelect = new CustomSelect(ID, options);

customSelect.render(container);
