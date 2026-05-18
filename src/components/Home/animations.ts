export const animateHome = (tl: gsap.core.Timeline) =>
  tl
    .to('#header-text', { opacity: 1, duration: 1, ease: 'expo.out' }, '<-0.4')
    .to(
      '#header-text h1',
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
      },
      '<'
    )
    .to(
      '#header-text h2',
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
      },
      '<0.6'
    )
    .to(
      '#header-nav li',
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.3,
      },
      '<0.3'
    )
    .to(
      '#intro',
      {
        y: 140,
        opacity: 1,
        rotate: -2,
        duration: 2,
        ease: 'power4.out',
      },
      '<0.8'
    );
