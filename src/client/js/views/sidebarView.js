// SidebarView
class SidebarView {
  // Constructor
  constructor() {
    this.sidebarMaster = document.querySelector('.sidebar__master');
    this.sidebarDetail = document.querySelector('.sidebar__detail');
    this.backButton = document.querySelector('.button--back');
  }

  // Show the detail view
  showDetailView() {
    // Hide the master view
    this.sidebarMaster.classList.add('hidden');
    // Show the detail view
    this.sidebarDetail.classList.remove('hidden');
    console.log('yo');
  }

  // Show the master view
  showMasterView() {
    // Hide the detail view
    this.sidebarDetail.classList.add('hidden');
    // Show the master view
    this.sidebarMaster.classList.remove('hidden');
    console.log('yo');
  }

  // Back button click publisher
  addBackPublisher(handler) {
    this.backButton.addEventListener('click', (event) => {
      // Prevent default
      event.preventDefault();
      // Call the handler
      handler();
    });
  }
}

// Export a single instance
// Remember this will only load once no matter how matter times you import,
// there will only be one instance with a live conenction to all imports
export default new SidebarView();
