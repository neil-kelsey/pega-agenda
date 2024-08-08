export const applyCategoryStyles = () => {

    // Wrap this up into 'full width logic' as a props option on the component so if we don't like it we can turn it off
    // as it's hard coded to category-2 - then this could be developed into selecting a dynamic category where the developer can
    // pick which category they want to be full width - do that if I have time
    const category2Elements = document.querySelectorAll('.activity-wrapper.category-2');
  
    category2Elements.forEach((el, index) => {
      // Remove any existing half-width classes to ensure clean state
      el.classList.remove('half-width');
    });
  
    for (let i = 0; i < category2Elements.length - 1; i++) {
      if (category2Elements[i].nextElementSibling === category2Elements[i + 1]) {
        category2Elements[i].classList.add('half-width');
        category2Elements[i + 1].classList.add('half-width2');
        i++; // Skip the next element as it's already been processed
      }
    }
  };
  