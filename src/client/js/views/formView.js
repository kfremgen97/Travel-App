// FormView
class FormView {
  // Constructor
  constructor() {
    this.form = document.querySelector('.form');
    this.locationInput = document.querySelector('.form__input--location');
    this.dateInput = document.querySelector('.form__input--date');
    this.submitButton = document.querySelector('.button--trip');
  }

  clearInputs() {
    // Clear form inputs
    this.locationInput.value = '';
    this.dateInput.value = '';
  }

  renderSpinner() {
    // Disable the button
    this.submitButton.disabled = true;
    // Clear the submit button
    this.submitButton.innerHTML = '';
    // Add the loading modifier to the button class list
    this.submitButton.classList.add('button--loading');
    // Add the spinner
    const spinnerString = `
    <svg>
    <use href="./assets/sprite/regular.svg#spinner"></use>
    </svg>
    `;
    // Set the submit button
    this.submitButton.insertAdjacentHTML('afterbegin', spinnerString);
  }

  renderSubmit() {
    // Enable the button
    this.submitButton.disabled = false;
    // Clear the submit button
    this.submitButton.innerHTML = '';
    // Removethe loading modifier to the button class list
    this.submitButton.classList.remove('button--loading');
    // Add the submit message
    this.submitButton.textContent = 'Submit';
  }

  // Form submit publisher
  addFormPublisher(handler) {
    this.form.addEventListener('submit', (event) => {
      // Prevent default action
      event.preventDefault();
      // Create the form data object
      const formData = new FormData(this.form);
      handler(formData);
    });
  }
}

// Export a single isntance of MapView
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new FormView();
