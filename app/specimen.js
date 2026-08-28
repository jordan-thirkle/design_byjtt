export function getSpecimenContent(project) {
  const premium = project.design.direction.toLowerCase().includes('premium');
  return {
    brand: project.business.name,
    eyebrow: project.business.location,
    title: premium ? 'Gardens made to feel considered.' : 'A better garden starts with a better plan.',
    intro: premium
      ? 'Thoughtful garden design, planting and maintenance for homes that deserve more from their outdoor space.'
      : 'Garden design, planting and maintenance from a local team that cares about the details.',
    primaryAction: project.primaryAction,
    secondaryAction: 'View recent work',
    services: [
      ['Garden design', 'A clear plan for planting, layout, materials and the way you want to use your garden.'],
      ['Planting', 'Seasonal planting and considered combinations that look good without becoming hard work.'],
      ['Maintenance', 'Reliable ongoing care that keeps the garden looking like someone is paying attention.'],
    ],
    proof: ['Local team', 'Clear quotes', 'Work you can visit'],
  };
}

export function renderSpecimen(project, target) {
  const content = getSpecimenContent(project);
  target.innerHTML = `
    <div class="site-specimen">
      <header class="specimen-header">
        <a class="specimen-logo" href="#" aria-label="${content.brand} home">${content.brand}</a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a>
        </nav>
        <a class="specimen-header-cta" href="#contact">${content.primaryAction}</a>
      </header>
      <main>
        <section class="specimen-hero" aria-labelledby="specimen-title">
          <div class="specimen-hero-copy">
            <p class="specimen-kicker">${content.eyebrow}</p>
            <h1 id="specimen-title">${content.title}</h1>
            <p class="specimen-intro">${content.intro}</p>
            <div class="specimen-actions"><a class="specimen-primary" href="#contact">${content.primaryAction} <span aria-hidden="true">↗</span></a><a class="specimen-secondary" href="#work">${content.secondaryAction}</a></div>
            <ul class="specimen-proof" aria-label="Why choose us">${content.proof.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="specimen-garden" role="img" aria-label="A calm, mature garden with structured planting and a stone path"><div class="garden-sun"></div><div class="garden-tree garden-tree-one"></div><div class="garden-tree garden-tree-two"></div><div class="garden-path"></div><div class="garden-bed"></div></div>
        </section>
        <section class="specimen-services" id="services" aria-labelledby="services-title">
          <div class="section-intro"><p class="specimen-kicker">What we do</p><h2 id="services-title">Good gardens need a good idea first.</h2></div>
          <div class="service-list">${content.services.map(([name, copy], index) => `<article><span class="service-index">0${index + 1}</span><h3>${name}</h3><p>${copy}</p><a href="#contact">Explore service <span aria-hidden="true">↗</span></a></article>`).join('')}</div>
        </section>
        <section class="specimen-quote" id="about" aria-label="About the business"><p>“The best gardens don't announce themselves. They make you want to stay outside a little longer.”</p><span>Northshore Landscapes</span></section>
        <section class="specimen-contact" id="contact" aria-labelledby="contact-title"><div><p class="specimen-kicker">Start a project</p><h2 id="contact-title">Tell us what you're thinking.</h2></div><a class="specimen-primary" href="mailto:hello@example.com">${content.primaryAction} <span aria-hidden="true">↗</span></a></section>
      </main>
      <footer class="specimen-footer"><span>${content.brand}</span><span>Designed with ByJTT</span></footer>
    </div>`;
}
