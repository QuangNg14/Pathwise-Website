// Navigation utility functions

/**
 * Navigate to the application section on the home page
 * Works from any page - if already on home page, scrolls directly
 * If on another page, navigates to home first then scrolls
 * @param {Object} router - Next.js router object
 */
export const navigateToApplication = (router) => {
  // Check if we're already on the home page
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    // If on home page, just scroll to the application section
    const applicationSection = document.getElementById("application");
    if (applicationSection) {
      applicationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  } else {
    // If on a different page, navigate to home page first, then scroll
    router.push("/");

    // Wait for navigation to complete, then scroll to application section
    setTimeout(() => {
      const applicationSection = document.getElementById("application");
      if (applicationSection) {
        applicationSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500); // Give time for the page to load
  }
};

/**
 * Navigate to any section on the home page
 * @param {Object} router - Next.js router object
 * @param {string} sectionId - ID of the section to scroll to
 */
export const navigateToSection = (router, sectionId) => {
  // Check if we're already on the home page
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    // If on home page, just scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  } else {
    // If on a different page, navigate to home page first, then scroll
    router.push("/");

    // Wait for navigation to complete, then scroll to section
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500); // Give time for the page to load
  }
};
