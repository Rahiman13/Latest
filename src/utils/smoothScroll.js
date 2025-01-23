export const smoothScroll = {
  enable: () => {
    document.body.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollBehavior = 'smooth';
  },
  
  disable: () => {
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';
  }
}; 