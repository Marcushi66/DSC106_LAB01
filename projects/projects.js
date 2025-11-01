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

    const rolled = d3.rollups(projects, v => v.length, d => String(d.year));
    const pieData = rolled
      .map(([year, count]) => ({ label: year, value: count }))
      .sort((a, b) => a.label.localeCompare(b.label));

    renderPieChart(pieData);
    renderLegend(pieData);
    }

  } catch (err) {
    console.error('❌ Error loading projects:', err);
  }
})();

// ===== D3 Pie Plot & Legend =====
const svg = d3.select('#projects-pie-plot');
const colors = d3.scaleOrdinal(d3.schemeTableau10);

function renderPieChart(data) {
  const sliceGenerator = d3.pie().value(d => d.value);
  const arcData = sliceGenerator(data);
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

  svg.selectAll('path')
    .data(arcData, d => d.data.label)
    .join('path')
    .attr('d', arcGenerator)
    .attr('fill', (_d, i) => colors(i));
}

function renderLegend(data) {
  const legend = d3.select('.legend');

  legend.selectAll('li')
    .data(data, d => d.label)
    .join('li')
    .attr('class', 'legend-item')
    .style('--color', (_d, i) => colors(i))
    .html(d => `<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
}
