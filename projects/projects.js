// ---- projects/projects.js ----
import { fetchJSON, renderProjects } from '../global.js';

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
      titleEl.textContent = `${projects.length} Projects`;
    }

  } catch (err) {
    console.error('❌ Error loading projects:', err);
  }
})();

window.projects = projects;

// Update the projects title with the number of projects
const titleEl = document.querySelector('.projects-title');
if (titleEl) {
  const n = Array.isArray(projects) ? projects.length : 0;
  titleEl.textContent = n > 0 ? `${n} Project${n === 1 ? '' : 's'}` : 'No Projects';
}

