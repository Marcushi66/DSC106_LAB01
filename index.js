// ---- index.js ----
import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

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

// Fetch GitHub data and log it
(async function initHomePage() {
  const githubData = await fetchGitHubData('Marcushi66');
  console.log("✅ GitHub Data fetched successfully:", githubData);

  const profileStats = document.querySelector('#profile-stats');
})();

