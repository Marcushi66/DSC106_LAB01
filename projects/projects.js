// ---- projects/projects.js ----
import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let projects = [];

(async function initProjects() {
  try {
    projects = await fetchJSON('../lib/projects.json');

    console.log(`✅ Projects loaded: ${projects.length}`);
    
    const container = document.querySelector('.projects');
    if (!container) {
      console.warn('⚠️ .projects container not found.');
      return;
    }

    renderProjects(projects, container, 'h2');
    console.log('✅ Rendering complete');

    const titleEl = document.querySelector('.projects-title');
    if (titleEl) {
        const n = Array.isArray(projects) ? projects.length : 0;
        titleEl.textContent = n > 0 ? `My Projects — ${n} Total` : 'My Projects — No Projects Yet';
    }

  } catch (err) {
    console.error('❌ Error loading projects:', err);
  }
})();

// ===== D3 Pie Plot =====
let data = [
  { value: 1, label: 'apples' },
  { value: 2, label: 'oranges' },
  { value: 3, label: 'mangos' },
  { value: 4, label: 'pears' },
  { value: 5, label: 'limes' },
  { value: 5, label: 'cherries' },
];


const svg = d3.select('#projects-pie-plot');
let sliceGenerator = d3.pie().value(d => d.value);
const arcData = sliceGenerator(data);

const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(50);

const colors = d3.scaleOrdinal(d3.schemeTableau10);

svg.selectAll('path')
  .data(arcData)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', (d, i) => colors(i))


// ===== Legend =====
let legend = d3.select('.legend');

legend.selectAll('li')
  .data(data)
  .join('li')
  .attr('class', 'legend-item')
  .style('--color', (_d, i) => colors(i))
  .html(d => `<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);

