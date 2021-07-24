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
  #select;
  #cls;
  #currentSelectedOption;

  constructor(id, options) {
    this.#id = id;
    this.#options = options;
    this.#cls = 'select-dropdown';
    this.#currentSelectedOption = '';
    this.#select = this.#createElement({
      tag: 'div',
      cls: this.#getClasses(),
    });
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
    this.#select.append(button);

    const list = this.#createElement({
      tag: 'ul',
      cls: this.#getClasses('list'),
    });
    this.#select.append(list);

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

    return this.#select;
  }

  #openSelect() {
    const button = this.#select.querySelector('.select-dropdown__button');
    const list = this.#select.querySelector('.select-dropdown__list');

    button.addEventListener('click', () => {
      list.classList.add('active');
    });
  }

  #closeSelect() {
    this.#select
      .querySelector('.select-dropdown__list')
      .classList.remove('active');
  }

  #selectItemHandler = (event) => {
    const span = this.#select.querySelector('span.select-dropdown');
    const { target } = event;

    if (target.closest('.select-dropdown__list-item')) {
      this.#select
        .querySelectorAll('.select-dropdown__list-item')
        .forEach((item) => item.classList.remove('selected'));

      target.classList.add('selected');
      this.#currentSelectedOption = target.dataset.value;
      span.textContent = `${target.dataset.value}. ${target.textContent}`;
      this.#closeSelect();
      console.log(this.#selectedValue);
    }
  };

  #selectItem() {
    this.#select
      .querySelector('.select-dropdown__list')
      .addEventListener('click', this.#selectItemHandler);
  }

  get #selectedValue() {
    return this.#options.filter(
      (item) => String(item.value) === this.#currentSelectedOption
    );
  }

  render(container) {
    container.append(this.#createSelect());
    this.#openSelect();
    this.#selectItem();
  }
}

const customSelect = new CustomSelect(ID, options);

customSelect.render(container);
