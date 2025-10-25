// ---- index.js ----
import { fetchJSON, renderProjects } from './global.js';

(async function showLatestProjects() {
  try {
    const projects = await fetchJSON('./lib/projects.json');
    const latestProjects = projects.slice(0, 3);

    const container = document.querySelector('.projects');
    if (!container) {
      console.warn('⚠️ No .projects container found in index.html');
      return;
    }

    renderProjects(latestProjects, container, 'h2');

    console.log('✅ Rendered latest projects on homepage.');
  } catch (err) {
    console.error('❌ Error loading latest projects:', err);
  }
})();
