// Header view
class HeaderView {
  // Constructor
  constructor() {
    this.openButton = document.querySelector('.button--bars');
    this.closeButton = document.querySelector('.button--x');
  }

  showOpenButton() {
    this.closeButton.classList.remove('show--header-button');
    this.openButton.classList.remove('hidden');
  }

  showCloseButton() {
    this.openButton.classList.add('hidden');
    this.closeButton.classList.add('show--header-button');
  }

  addOpenPublisher(handler) {
    this.openButton.addEventListener('click', (event) => {
      // Prevent default
      event.preventDefault();
      handler();
    });
  }

  addClosePublisher(handler) {
    this.closeButton.addEventListener('click', (event) => {
      // Prevent default
      event.preventDefault();
      handler();
    });
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new HeaderView();
