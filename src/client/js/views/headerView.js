// Header view
class HeaderView {
  // Constructor
  constructor() {
    this.openButton = document.querySelector('.button--bars');
    this.closeButton = document.querySelector('.button--x');
  }

  toggleOpenButton() {
    this.openButton.classList.toggle('hidden');
  }

  toggleCloseButton() {
    this.closeButton.classList.toggle('hidden');
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
