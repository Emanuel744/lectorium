# <!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lectorium CRAI - Centro de Recursos para el Aprendizaje y la Investigación</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
    
    :root {
      --primary: #667eea;
      --primary-dark: #5a67d8;
      --secondary: #764ba2;
      --success: #48bb78;
      --warning: #f6ad55;
      --danger: #fc8181;
      --info: #4299e1;
      --dark: #2d3748;
      --light: #f7fafc;
    }
    
    /* Modo Oscuro */
    [data-theme="dark"] {
      --bg-primary: #1a202c;
      --bg-secondary: #2d3748;
      --bg-tertiary: #4a5568;
      --text-primary: #f7fafc;
      --text-secondary: #cbd5e0;
      --border-color: #4a5568;
    }
    
    [data-theme="light"] {
      --bg-primary: #ffffff;
      --bg-secondary: #f7fafc;
      --bg-tertiary: #edf2f7;
      --text-primary: #1a202c;
      --text-secondary: #4a5568;
      --border-color: #e2e8f0;
    }
    
    * {
      scroll-behavior: smooth;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
    }
    
    /* Headings */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      line-height: 1.25;
      color: var(--text-primary);
    }
    
    /* Glassmorphism */
    .glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    
    /* Micro-interactions */
    .micro-interaction {
      transition: all 0.2s ease;
    }
    
    .micro-interaction:hover {
      transform: scale(1.05);
    }
    
    /* Cards */
    .stat-card {
      background: var(--bg-primary);
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    
    /* Tabs */
    .tab-active {
      border-bottom: 3px solid var(--primary);
      color: var(--primary);
    }
    
    /* Loading spinner */
    .spinner {
      border: 3px solid #f3f3f3;
      border-top: 3px solid var(--primary);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Toast notifications */
    .toast {
      position: fixed;
      top: 20px;
      right: -300px;
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      z-index: 1000;
      max-width: 350px;
    }
    
    .toast.show {
      right: 20px;
    }
    
    /* Chat Support */
    .chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
    }
    
    .chat-window {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 350px;
      height: 500px;
      background: var(--bg-primary);
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      display: none;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--primary);
      border-radius: 5px;
    }
    
    /* Resource cards */
    .resource-card {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .resource-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Video player */
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }
    
    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .stat-card {
        padding: 1rem;
      }
      
      .tab-btn {
        font-size: 0.75rem;
        padding: 0.5rem;
      }
      
      .tab-btn i {
        display: none;
      }
    }
  </style>
</head>
<body>
  <!-- Theme Toggle -->
  <button id="themeToggle" class="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg micro-interaction">
    <i id="themeIcon" class="fas fa-moon text-gray-800 dark:text-yellow-300"></i>
  </button>
  
  <!-- Main Header -->
  <header class="glass sticky top-0 z-40 px-6 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <div class="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-xl">
          <i class="fas fa-university text-white text-2xl"></i>
        </div>
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Lectorium CRAI</h1>
          <p class="text-sm opacity-80 font-medium">Centro de Recursos para el Aprendizaje - I.E. Luis Carlos López</p>
        </div>
      </div>
      
      <nav class="flex items-center space-x-6">
        <!-- Quick Search -->
        <button id="quickSearchBtn" class="micro-interaction">
          <i class="fas fa-search text-xl"></i>
        </button>
        
        <!-- Notification Bell -->
        <button id="notificationBtn" class="relative micro-interaction">
          <i class="fas fa-bell text-xl"></i>
          <span id="notificationCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
        </button>
        
        <!-- User Menu -->
        <div class="relative">
          <button id="loginBtn" class="glass px-4 py-2 rounded-lg font-semibold micro-interaction uppercase tracking-wide text-sm">
            <i class="fas fa-sign-in-alt mr-2"></i>
            Iniciar Sesión
          </button>
          
          <div id="userMenu" class="hidden">
            <button id="userMenuBtn" class="flex items-center space-x-2 glass px-4 py-2 rounded-lg">
              <i class="fas fa-user-circle text-2xl text-purple-600"></i>
              <span id="userEmail" class="text-sm font-medium"></span>
              <i class="fas fa-chevron-down text-xs"></i>
            </button>
            
            <div id="userDropdown" class="hidden absolute right-0 mt-2 w-64 glass rounded-xl shadow-xl p-2">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <p class="font-semibold" id="dropdownName">Usuario</p>
                <p class="text-xs opacity-70" id="dropdownEmail">email@ieluiscarloslopez.edu.co</p>
              </div>
              
              <button id="profileBtn" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg micro-interaction font-medium text-sm">
                <i class="fas fa-user-circle mr-2"></i> Mi Perfil
              </button>
              <button id="myResearchBtn" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg micro-interaction font-medium text-sm">
                <i class="fas fa-microscope mr-2"></i> Mis Investigaciones
              </button>
              <button id="historyBtn" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg micro-interaction font-medium text-sm">
                <i class="fas fa-history mr-2"></i> Historial
              </button>
              <hr class="my-2 border-gray-200 dark:border-gray-700">
              <button id="logoutBtn" class="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900 text-red-600 rounded-lg micro-interaction font-medium text-sm">
                <i class="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-6 py-8">
    <!-- Main Navigation Tabs -->
    <div class="glass rounded-xl p-1 mb-8 overflow-x-auto">
      <div class="flex space-x-1 min-w-max">
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction tab-active text-sm uppercase tracking-wider whitespace-nowrap" data-tab="dashboard">
          <i class="fas fa-home mr-2"></i> Inicio
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="catalog">
          <i class="fas fa-books mr-2"></i> Catálogo OPAC
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="repository">
          <i class="fas fa-archive mr-2"></i> Repositorio
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="databases">
          <i class="fas fa-database mr-2"></i> Bases de Datos
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="multimedia">
          <i class="fas fa-photo-video mr-2"></i> Multimedia
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="loans">
          <i class="fas fa-book-reader mr-2"></i> Préstamos
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="training">
          <i class="fas fa-graduation-cap mr-2"></i> Formación
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="services">
          <i class="fas fa-concierge-bell mr-2"></i> Servicios
        </button>
        <button class="tab-btn flex-1 px-4 py-3 rounded-lg font-medium micro-interaction text-sm uppercase tracking-wider whitespace-nowrap" data-tab="transparency">
          <i class="fas fa-chart-bar mr-2"></i> Transparencia
        </button>
      </div>
    </div>
    
    <!-- Dashboard Tab -->
    <div id="dashboard-tab" class="tab-content animate-fade-in">
      <!-- Welcome Section -->
      <div class="glass rounded-xl p-8 mb-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <h2 class="text-3xl font-bold mb-4 tracking-tight">Bienvenido al CRAI Lectorium</h2>
        <p class="text-lg opacity-90 leading-relaxed mb-6">Tu Centro de Recursos para el Aprendizaje y la Investigación</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <p class="text-3xl font-bold">5,000+</p>
            <p class="text-sm opacity-80">Libros</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">500+</p>
            <p class="text-sm opacity-80">Recursos Digitales</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">50+</p>
            <p class="text-sm opacity-80">Bases de Datos</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold">24/7</p>
            <p class="text-sm opacity-80">Acceso Digital</p>
          </div>
        </div>
      </div>
      
      <!-- Quick Access Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div onclick="document.querySelector('[data-tab=\"catalog\"]').click()" class="glass rounded-xl p-6 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <i class="fas fa-search text-blue-600 dark:text-blue-400 text-2xl"></i>
            </div>
            <i class="fas fa-arrow-right text-gray-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Buscar Recursos</h3>
          <p class="text-sm opacity-70">Explora nuestro catálogo completo de libros y recursos digitales</p>
        </div>
        
        <div onclick="document.querySelector('[data-tab=\"repository\"]').click()" class="glass rounded-xl p-6 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <i class="fas fa-upload text-green-600 dark:text-green-400 text-2xl"></i>
            </div>
            <i class="fas fa-arrow-right text-gray-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Repositorio Digital</h3>
          <p class="text-sm opacity-70">Accede a trabajos de investigación y proyectos estudiantiles</p>
        </div>
        
        <div onclick="document.querySelector('[data-tab=\"databases\"]').click()" class="glass rounded-xl p-6 cursor-pointer hover:shadow-xl transition">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
              <i class="fas fa-database text-purple-600 dark:text-purple-400 text-2xl"></i>
            </div>
            <i class="fas fa-arrow-right text-gray-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Bases de Datos</h3>
          <p class="text-sm opacity-70">Recursos académicos y bases de datos especializadas</p>
        </div>
      </div>
      
      <!-- Stats and Activity -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-xl font-bold mb-4 tracking-tight">Actividad Reciente</h3>
          <div id="recentActivity" class="space-y-3">
            <div class="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <i class="fas fa-book text-blue-600"></i>
              <div class="flex-1">
                <p class="font-medium">Nuevo libro agregado</p>
                <p class="text-sm opacity-70">"Inteligencia Artificial en Educación"</p>
              </div>
              <span class="text-xs opacity-50">Hace 2h</span>
            </div>
            <div class="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <i class="fas fa-file-alt text-green-600"></i>
              <div class="flex-1">
                <p class="font-medium">Trabajo de investigación publicado</p>
                <p class="text-sm opacity-70">Por: María García - 10°A</p>
              </div>
              <span class="text-xs opacity-50">Hace 5h</span>
            </div>
            <div class="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <i class="fas fa-video text-purple-600"></i>
              <div class="flex-1">
                <p class="font-medium">Nuevo video tutorial</p>
                <p class="text-sm opacity-70">"Cómo usar las bases de datos"</p>
              </div>
              <span class="text-xs opacity-50">Ayer</span>
            </div>
          </div>
        </div>
        
        <!-- Popular Resources -->
        <div class="glass rounded-xl p-6">
          <h3 class="text-xl font-bold mb-4 tracking-tight">Recursos Populares</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="text-2xl font-bold text-purple-600">#1</span>
                <div>
                  <p class="font-medium">Base de Datos EBSCO</p>
                  <p class="text-sm opacity-70">432 accesos este mes</p>
                </div>
              </div>
              <i class="fas fa-arrow-up text-green-500"></i>
            </div>
            <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="text-2xl font-bold text-purple-600">#2</span>
                <div>
                  <p class="font-medium">Khan Academy</p>
                  <p class="text-sm opacity-70">389 accesos este mes</p>
                </div>
              </div>
              <i class="fas fa-arrow-up text-green-500"></i>
            </div>
            <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="text-2xl font-bold text-purple-600">#3</span>
                <div>
                  <p class="font-medium">Biblioteca Digital Mundial</p>
                  <p class="text-sm opacity-70">256 accesos este mes</p>
                </div>
              </div>
              <i class="fas fa-minus text-yellow-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Catalog OPAC Tab -->
    <div id="catalog-tab" class="tab-content hidden">
      <!-- Advanced Search -->
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-xl font-bold mb-4">Búsqueda Avanzada OPAC</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Título</label>
            <input type="text" id="searchTitle" class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg" placeholder="Título del libro...">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Autor</label>
            <input type="text" id="searchAuthor" class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg" placeholder="Nombre del autor...">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">ISBN</label>
            <input type="text" id="searchISBN" class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg" placeholder="ISBN...">
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Materia</label>
            <select id="searchSubject" class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option value="">Todas las materias</option>
              <option value="matematicas">Matemáticas</option>
              <option value="ciencias">Ciencias</option>
              <option value="literatura">Literatura</option>
              <option value="historia">Historia</option>
              <option value="ingles">Inglés</option>
              <option value="tecnologia">Tecnología</option>
            </select>
          </div>
        </div>
        <div class="flex justify-between items-center mt-6">
          <div class="flex space-x-2">
            <button id="advancedSearchBtn" class="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold micro-interaction">
              <i class="fas fa-search mr-2"></i> Buscar
            </button>
            <button id="clearSearchBtn" class="glass px-6 py-2 rounded-lg font-semibold micro-interaction">
              <i class="fas fa-times mr-2"></i> Limpiar
            </button>
          </div>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input type="checkbox" id="onlyAvailable" class="mr-2">
              <span class="text-sm">Solo disponibles</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" id="includeDigital" class="mr-2">
              <span class="text-sm">Incluir digitales</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Search Results -->
      <div id="catalogResults" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="col-span-full text-center py-12">
          <i class="fas fa-search text-6xl opacity-20 mb-4"></i>
          <p class="text-xl font-semibold opacity-70">Realiza una búsqueda para ver resultados</p>
          <p class="text-sm opacity-50">Puedes buscar por título, autor, ISBN o materia</p>
        </div>
      </div>
    </div>
    
    <!-- Repository Tab -->
    <div id="repository-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">Repositorio Institucional Digital</h3>
          <button id="uploadWorkBtn" class="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold micro-interaction">
            <i class="fas fa-upload mr-2"></i> Subir Trabajo
          </button>
        </div>
        
        <!-- Repository Categories -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="stat-card text-center cursor-pointer" onclick="filterRepository('tesis')">
            <i class="fas fa-graduation-cap text-4xl text-purple-600 mb-2"></i>
            <h4 class="font-bold">Trabajos de Grado</h4>
            <p class="text-2xl font-bold">156</p>
          </div>
          <div class="stat-card text-center cursor-pointer" onclick="filterRepository('proyectos')">
            <i class="fas fa-project-diagram text-4xl text-blue-600 mb-2"></i>
            <h4 class="font-bold">Proyectos</h4>
            <p class="text-2xl font-bold">89</p>
          </div>
          <div class="stat-card text-center cursor-pointer" onclick="filterRepository('articulos')">
            <i class="fas fa-newspaper text-4xl text-green-600 mb-2"></i>
            <h4 class="font-bold">Artículos</h4>
            <p class="text-2xl font-bold">234</p>
          </div>
          <div class="stat-card text-center cursor-pointer" onclick="filterRepository('recursos')">
            <i class="fas fa-file-alt text-4xl text-orange-600 mb-2"></i>
            <h4 class="font-bold">Recursos Educativos</h4>
            <p class="text-2xl font-bold">412</p>
          </div>
        </div>
        
        <!-- Recent Uploads -->
        <h4 class="text-xl font-bold mb-4">Publicaciones Recientes</h4>
        <div id="repositoryItems" class="space-y-4">
          <div class="glass rounded-lg p-4 hover:shadow-lg transition">
            <div class="flex justify-between items-start">
              <div>
                <h5 class="font-semibold text-lg mb-1">Impacto de la IA en la Educación Secundaria</h5>
                <p class="text-sm opacity-70 mb-2">Por: Juan Pérez - 11°B | Tipo: Trabajo de Investigación</p>
                <p class="text-sm mb-3">Este trabajo analiza cómo la inteligencia artificial está transformando los métodos de enseñanza...</p>
                <div class="flex space-x-4 text-sm">
                  <span><i class="fas fa-eye mr-1"></i> 234 vistas</span>
                  <span><i class="fas fa-download mr-1"></i> 45 descargas</span>
                  <span><i class="fas fa-calendar mr-1"></i> Hace 3 días</span>
                </div>
              </div>
              <div class="flex flex-col space-y-2">
                <button class="glass px-4 py-2 rounded text-sm micro-interaction">
                  <i class="fas fa-eye mr-1"></i> Ver
                </button>
                <button class="glass px-4 py-2 rounded text-sm micro-interaction">
                  <i class="fas fa-download mr-1"></i> PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Databases Tab -->
    <div id="databases-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-2xl font-bold mb-6">Bases de Datos y Recursos Electrónicos</h3>
        
        <!-- Database Categories -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">Todas</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Académicas</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Científicas</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Humanidades</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Recursos Abiertos</button>
        </div>
        
        <!-- Database Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- EBSCO -->
          <div class="resource-card glass rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="text-2xl font-bold text-blue-600">EBSCO</div>
              <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Suscrito</span>
            </div>
            <h4 class="font-bold text-lg mb-2">EBSCO Discovery Service</h4>
            <p class="text-sm opacity-70 mb-4">Base de datos multidisciplinaria con acceso a miles de publicaciones académicas.</p>
            <div class="flex justify-between items-center">
              <button class="bg-purple-600 text-white px-4 py-2 rounded text-sm font-semibold micro-interaction">
                Acceder
              </button>
              <button class="glass px-4 py-2 rounded text-sm micro-interaction">
                <i class="fas fa-info-circle"></i> Guía
              </button>
            </div>
          </div>
          
          <!-- Khan Academy -->
          <div class="resource-card glass rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="text-2xl font-bold text-green-600">Khan Academy</div>
              <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Gratuito</span>
            </div>
            <h4 class="font-bold text-lg mb-2">Khan Academy</h4>
            <p class="text-sm opacity-70 mb-4">Plataforma educativa con cursos gratuitos en matemáticas, ciencias y más.</p>
            <div class="flex justify-between items-center">
              <button class="bg-purple-600 text-white px-4 py-2 rounded text-sm font-semibold micro-interaction">
                Acceder
              </button>
              <button class="glass px-4 py-2 rounded text-sm micro-interaction">
                <i class="fas fa-info-circle"></i> Guía
              </button>
            </div>
          </div>
          
          <!-- Google Scholar -->
          <div class="resource-card glass rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="text-2xl font-bold text-blue-600">Google Scholar</div>
              <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Gratuito</span>
            </div>
            <h4 class="font-bold text-lg mb-2">Google Académico</h4>
            <p class="text-sm opacity-70 mb-4">Buscador de literatura académica: artículos, tesis, libros y resúmenes.</p>
            <div class="flex justify-between items-center">
              <button class="bg-purple-600 text-white px-4 py-2 rounded text-sm font-semibold micro-interaction">
                Acceder
              </button>
              <button class="glass px-4 py-2 rounded text-sm micro-interaction">
                <i class="fas fa-info-circle"></i> Guía
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Multimedia Tab -->
    <div id="multimedia-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-2xl font-bold mb-6">Recursos Multimedia Educativos</h3>
        
        <!-- Filter Buttons -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">Todos</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Videos</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Podcasts</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Documentales</button>
          <button class="px-4 py-2 glass rounded-lg text-sm font-medium">Tutoriales</button>
        </div>
        
        <!-- Multimedia Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="glass rounded-xl overflow-hidden">
            <div class="relative">
              <div class="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                <i class="fas fa-play-circle text-white text-6xl opacity-80"></i>
              </div>
              <span class="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">15:32</span>
            </div>
            <div class="p-4">
              <h4 class="font-semibold mb-2">Introducción a la Física Cuántica</h4>
              <p class="text-sm opacity-70 mb-3">Conceptos básicos explicados de forma simple</p>
              <div class="flex justify-between items-center">
                <span class="text-xs"><i class="fas fa-eye mr-1"></i> 1.2k vistas</span>
                <button class="text-purple-600 font-medium text-sm">Ver ahora →</button>
              </div>
            </div>
          </div>
          
          <div class="glass rounded-xl overflow-hidden">
            <div class="relative">
              <div class="bg-gradient-to-br from-green-500 to-teal-600 h-48 flex items-center justify-center">
                <i class="fas fa-microphone text-white text-6xl opacity-80"></i>
              </div>
              <span class="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">Podcast</span>
            </div>
            <div class="p-4">
              <h4 class="font-semibold mb-2">Historia de Colombia - Episodio 5</h4>
              <p class="text-sm opacity-70 mb-3">La época de la independencia</p>
              <div class="flex justify-between items-center">
                <span class="text-xs"><i class="fas fa-headphones mr-1"></i> 856 escuchas</span>
                <button class="text-purple-600 font-medium text-sm">Escuchar →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loans Tab -->
    <div id="loans-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">Sistema de Préstamos y Reservas</h3>
          <button id="newReservationBtn" class="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold micro-interaction">
            <i class="fas fa-calendar-plus mr-2"></i> Nueva Reserva
          </button>
        </div>
        
        <!-- Loan Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="stat-card text-center">
            <i class="fas fa-book-reader text-3xl text-purple-600 mb-2"></i>
            <p class="text-2xl font-bold" id="activeLoansCount">0</p>
            <p class="text-sm opacity-70">Préstamos Activos</p>
          </div>
          <div class="stat-card text-center">
            <i class="fas fa-calendar-check text-3xl text-green-600 mb-2"></i>
            <p class="text-2xl font-bold" id="reservationsCount">0</p>
            <p class="text-sm opacity-70">Reservas</p>
          </div>
          <div class="stat-card text-center">
            <i class="fas fa-clock text-3xl text-orange-600 mb-2"></i>
            <p class="text-2xl font-bold" id="dueSoonLoansCount">0</p>
            <p class="text-sm opacity-70">Por Vencer</p>
          </div>
          <div class="stat-card text-center">
            <i class="fas fa-history text-3xl text-blue-600 mb-2"></i>
            <p class="text-2xl font-bold" id="historyCount">0</p>
            <p class="text-sm opacity-70">Historial</p>
          </div>
        </div>
        
        <!-- Active Loans -->
        <div id="loansContainer" class="space-y-4">
          <div class="text-center py-12">
            <i class="fas fa-lock text-6xl opacity-20 mb-4"></i>
            <p class="text-xl font-semibold opacity-70">Inicia sesión para ver tus préstamos</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Training Tab -->
    <div id="training-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-2xl font-bold mb-6">Formación de Usuarios</h3>
        
        <!-- Training Categories -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="glass rounded-xl p-6 text-center">
            <i class="fas fa-user-graduate text-5xl text-purple-600 mb-4"></i>
            <h4 class="font-bold text-lg mb-2">Inducción Básica</h4>
            <p class="text-sm opacity-70 mb-4">Aprende a usar todos los servicios del CRAI</p>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Comenzar
            </button>
          </div>
          
          <div class="glass rounded-xl p-6 text-center">
            <i class="fas fa-search text-5xl text-blue-600 mb-4"></i>
            <h4 class="font-bold text-lg mb-2">Búsqueda Avanzada</h4>
            <p class="text-sm opacity-70 mb-4">Técnicas de búsqueda en bases de datos</p>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Comenzar
            </button>
          </div>
          
          <div class="glass rounded-xl p-6 text-center">
            <i class="fas fa-quote-right text-5xl text-green-600 mb-4"></i>
            <h4 class="font-bold text-lg mb-2">Citas y Referencias</h4>
            <p class="text-sm opacity-70 mb-4">Aprende a citar correctamente (APA, MLA)</p>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Comenzar
            </button>
          </div>
        </div>
        
        <!-- Video Tutorials -->
        <h4 class="text-xl font-bold mb-4">Tutoriales en Video</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="video-container">
            <div class="bg-gradient-to-br from-purple-500 to-blue-600 h-full flex items-center justify-center rounded-lg">
              <div class="text-center text-white">
                <i class="fas fa-play-circle text-6xl mb-4"></i>
                <p class="font-semibold">Tutorial: Catálogo OPAC</p>
              </div>
            </div>
          </div>
          <div>
            <h5 class="font-semibold mb-2">Cómo usar el catálogo OPAC</h5>
            <p class="text-sm opacity-70 mb-4">Tutorial completo sobre búsqueda y reserva de libros en nuestro sistema.</p>
            <div class="space-y-2">
              <p class="text-sm"><i class="fas fa-clock mr-2"></i>Duración: 8:45</p>
              <p class="text-sm"><i class="fas fa-eye mr-2"></i>2,345 vistas</p>
              <p class="text-sm"><i class="fas fa-calendar mr-2"></i>Actualizado: Hace 1 semana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Services Tab -->
    <div id="services-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-2xl font-bold mb-6">Servicios Especializados</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Reference Service -->
          <div class="glass rounded-xl p-6">
            <div class="flex items-center mb-4">
              <i class="fas fa-info-circle text-3xl text-blue-600 mr-4"></i>
              <h4 class="text-xl font-bold">Servicio de Referencia</h4>
            </div>
            <p class="text-sm opacity-70 mb-4">Orientación personalizada sobre recursos y colecciones disponibles.</p>
            <ul class="space-y-2 text-sm mb-4">
              <li><i class="fas fa-check text-green-500 mr-2"></i>Asesoría en búsquedas</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Orientación bibliográfica</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Apoyo en investigación</li>
            </ul>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Solicitar Asesoría
            </button>
          </div>
          
          <!-- Bibliography Service -->
          <div class="glass rounded-xl p-6">
            <div class="flex items-center mb-4">
              <i class="fas fa-list-alt text-3xl text-green-600 mr-4"></i>
              <h4 class="text-xl font-bold">Elaboración de Bibliografías</h4>
            </div>
            <p class="text-sm opacity-70 mb-4">Creamos bibliografías especializadas según tus necesidades académicas.</p>
            <ul class="space-y-2 text-sm mb-4">
              <li><i class="fas fa-check text-green-500 mr-2"></i>Por materia o tema</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Formato APA, MLA, Chicago</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Recursos actualizados</li>
            </ul>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Solicitar Bibliografía
            </button>
          </div>
          
          <!-- Interlibrary Loan -->
          <div class="glass rounded-xl p-6">
            <div class="flex items-center mb-4">
              <i class="fas fa-exchange-alt text-3xl text-purple-600 mr-4"></i>
              <h4 class="text-xl font-bold">Préstamo Interbibliotecario</h4>
            </div>
            <p class="text-sm opacity-70 mb-4">Accede a recursos de otras bibliotecas mediante nuestros convenios.</p>
            <ul class="space-y-2 text-sm mb-4">
              <li><i class="fas fa-check text-green-500 mr-2"></i>Red de bibliotecas escolares</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Intercambio digital</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Entrega en 48-72 horas</li>
            </ul>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Solicitar Préstamo
            </button>
          </div>
          
          <!-- DSI Service -->
          <div class="glass rounded-xl p-6">
            <div class="flex items-center mb-4">
              <i class="fas fa-bell text-3xl text-orange-600 mr-4"></i>
              <h4 class="text-xl font-bold">Diseminación Selectiva</h4>
            </div>
            <p class="text-sm opacity-70 mb-4">Recibe información actualizada sobre temas de tu interés.</p>
            <ul class="space-y-2 text-sm mb-4">
              <li><i class="fas fa-check text-green-500 mr-2"></i>Alertas personalizadas</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Nuevas adquisiciones</li>
              <li><i class="fas fa-check text-green-500 mr-2"></i>Publicaciones relevantes</li>
            </ul>
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold micro-interaction">
              Configurar Alertas
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Transparency Tab -->
    <div id="transparency-tab" class="tab-content hidden">
      <div class="glass rounded-xl p-6 mb-8">
        <h3 class="text-2xl font-bold mb-6">Portal de Transparencia</h3>
        
        <!-- Statistics Dashboard -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="stat-card">
            <h4 class="font-bold mb-4">Estadísticas de Uso</h4>
            <canvas id="usageChart" width="300" height="200"></canvas>
          </div>
          
          <div class="stat-card">
            <h4 class="font-bold mb-4">Presupuesto 2024</h4>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Libros Físicos</span>
                  <span>35%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 35%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Recursos Digitales</span>
                  <span>40%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 40%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Infraestructura</span>
                  <span>25%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: 25%"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="stat-card">
            <h4 class="font-bold mb-4">Nuevas Adquisiciones</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm">Este mes</span>
                <span class="font-bold">45 libros</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Este trimestre</span>
                <span class="font-bold">156 libros</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm">Este año</span>
                <span class="font-bold">523 libros</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Reports -->
        <h4 class="text-xl font-bold mb-4">Informes y Documentos</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="glass rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <i class="fas fa-file-pdf text-red-600 text-2xl"></i>
              <div>
                <p class="font-medium">Informe de Gestión 2024</p>
                <p class="text-sm opacity-70">Actualizado: Enero 2024</p>
              </div>
            </div>
            <button class="glass px-4 py-2 rounded text-sm micro-interaction">
              <i class="fas fa-download"></i> Descargar
            </button>
          </div>
          
          <div class="glass rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <i class="fas fa-file-excel text-green-600 text-2xl"></i>
              <div>
                <p class="font-medium">Estadísticas de Préstamos</p>
                <p class="text-sm opacity-70">Actualizado: Mensual</p>
              </div>
            </div>
            <button class="glass px-4 py-2 rounded text-sm micro-interaction">
              <i class="fas fa-download"></i> Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Chat Support Widget -->
  <div class="chat-widget">
    <button id="chatToggle" class="bg-purple-600 text-white p-4 rounded-full shadow-lg micro-interaction">
      <i class="fas fa-comments text-2xl"></i>
    </button>
    
    <div id="chatWindow" class="chat-window glass">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-semibold">Asistente Virtual CRAI</h3>
            <p class="text-xs opacity-70">En línea - Respuesta inmediata</p>
          </div>
          <button id="chatClose" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="flex-1 p-4 overflow-y-auto" id="chatMessages">
        <div class="glass rounded-lg p-3 mb-3 max-w-[80%]">
          <p class="text-sm">¡Hola! Soy tu asistente virtual del CRAI. ¿En qué puedo ayudarte hoy?</p>
          <div class="flex flex-wrap gap-2 mt-3">
            <button class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">¿Cómo busco un libro?</button>
            <button class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Necesito ayuda con citas</button>
            <button class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">¿Cómo accedo a las bases de datos?</button>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex space-x-2">
          <input 
            type="text" 
            id="chatInput" 
            class="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
            placeholder="Escribe tu pregunta..."
          >
          <button class="bg-purple-600 text-white px-4 py-2 rounded-lg micro-interaction">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Quick Search Modal -->
  <div id="quickSearchModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
    <div class="glass rounded-2xl p-8 w-full max-w-2xl mx-4 animate-fade-in">
      <h3 class="text-2xl font-bold mb-4">Búsqueda Rápida</h3>
      <div class="relative mb-4">
        <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text" 
          id="quickSearchInput" 
          class="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-lg"
          placeholder="Buscar en todo el CRAI..."
          autofocus
        >
      </div>
      <div id="quickSearchResults" class="max-h-96 overflow-y-auto">
        <!-- Results will appear here -->
      </div>
      <div class="flex justify-end mt-4">
        <button id="closeQuickSearch" class="glass px-6 py-2 rounded-lg font-medium">Cerrar</button>
      </div>
    </div>
  </div>
  
  <!-- Toast Notifications Container -->
  <div id="toastContainer"></div>
  
  <!-- Login Modal -->
  <div id="authModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
    <div class="glass rounded-2xl p-8 w-full max-w-md mx-4 animate-fade-in">
      <div class="text-center mb-6">
        <div class="bg-gradient-to-br from-purple-600 to-purple-700 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <i class="fas fa-university text-white text-3xl"></i>
        </div>
        <h2 id="authTitle" class="text-2xl font-bold tracking-tight">Iniciar Sesión</h2>
        <p id="authSubtitle" class="opacity-80 mt-2 leading-relaxed">Accede al CRAI Lectorium</p>
        <div class="mt-3 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg text-sm font-medium">
          <i class="fas fa-info-circle"></i>
          Exclusivo para estudiantes y docentes de I.E. Luis Carlos López
        </div>
      </div>
      
      <div id="authError" class="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4 hidden"></div>
      
      <form id="authForm">
        <div class="space-y-4">
          <div id="nameField" class="hidden">
            <label class="block text-sm font-medium mb-1 uppercase tracking-wider">Nombre completo</label>
            <div class="relative">
              <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"></i>
              <input 
                id="fullName" 
                type="text" 
                class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 font-medium"
                placeholder="Juan Pérez"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1 uppercase tracking-wider" for="email">Correo electrónico</label>
            <div class="relative">
              <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"></i>
              <input 
                id="email" 
                type="email" 
                class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 font-medium"
                placeholder="tu.nombre@ieluiscarloslopez.edu.co"
                required
              >
            </div>
            <p class="text-xs opacity-70 mt-1 font-medium">Solo correos institucionales @ieluiscarloslopez.edu.co</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1 uppercase tracking-wider">Contraseña</label>
            <div class="relative">
              <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"></i>
              <input 
                id="password" 
                type="password" 
                class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 font-medium"
                placeholder="••••••••"
                required
              >
              <button type="button" id="togglePassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
          
          <div id="confirmPasswordField" class="hidden">
            <label class="block text-sm font-medium mb-1 uppercase tracking-wider">Confirmar contraseña</label>
            <div class="relative">
              <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"></i>
              <input 
                id="confirmPassword" 
                type="password" 
                class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 font-medium"
                placeholder="••••••••"
              >
            </div>
          </div>
        </div>
        
        <div class="mt-6 space-y-3">
          <button type="submit" id="authSubmitBtn" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold micro-interaction uppercase tracking-wide">
            Iniciar Sesión
          </button>
          
          <button type="button" id="authToggleBtn" class="w-full text-purple-600 hover:text-purple-700 font-medium">
            ¿No tienes cuenta? Regístrate
          </button>
          
          <button type="button" id="authCancelBtn" class="w-full text-gray-500 hover:text-gray-700 font-medium">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <script>
    // Configuración Firebase simulada (versión demo sin Firebase real)
    const DEMO_USERS = [
      { email: 'estudiante@ieluiscarloslopez.edu.co', password: 'demo123', name: 'Juan Pérez', role: 'estudiante' },
      { email: 'docente@ieluiscarloslopez.edu.co', password: 'demo123', name: 'María García', role: 'docente' }
    ];

    // Variables globales
    let currentUser = null;
    let books = [];
    let userLoans = [];
    let isLoginMode = true;

    // Elementos del DOM
    const elements = {
      // Theme
      themeToggle: document.getElementById('themeToggle'),
      themeIcon: document.getElementById('themeIcon'),
      
      // Header
      quickSearchBtn: document.getElementById('quickSearchBtn'),
      notificationBtn: document.getElementById('notificationBtn'),
      notificationCount: document.getElementById('notificationCount'),
      loginBtn: document.getElementById('loginBtn'),
      userMenu: document.getElementById('userMenu'),
      userMenuBtn: document.getElementById('userMenuBtn'),
      userDropdown: document.getElementById('userDropdown'),
      userEmail: document.getElementById('userEmail'),
      dropdownName: document.getElementById('dropdownName'),
      dropdownEmail: document.getElementById('dropdownEmail'),
      profileBtn: document.getElementById('profileBtn'),
      myResearchBtn: document.getElementById('myResearchBtn'),
      historyBtn: document.getElementById('historyBtn'),
      logoutBtn: document.getElementById('logoutBtn'),
      
      // Tabs
      tabBtns: document.querySelectorAll('.tab-btn'),
      tabContents: document.querySelectorAll('.tab-content'),
      
      // Catalog
      searchTitle: document.getElementById('searchTitle'),
      searchAuthor: document.getElementById('searchAuthor'),
      searchISBN: document.getElementById('searchISBN'),
      searchSubject: document.getElementById('searchSubject'),
      advancedSearchBtn: document.getElementById('advancedSearchBtn'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      onlyAvailable: document.getElementById('onlyAvailable'),
      includeDigital: document.getElementById('includeDigital'),
      catalogResults: document.getElementById('catalogResults'),
      
      // Loans
      activeLoansCount: document.getElementById('activeLoansCount'),
      reservationsCount: document.getElementById('reservationsCount'),
      dueSoonLoansCount: document.getElementById('dueSoonLoansCount'),
      historyCount: document.getElementById('historyCount'),
      loansContainer: document.getElementById('loansContainer'),
      
      // Chat
      chatToggle: document.getElementById('chatToggle'),
      chatWindow: document.getElementById('chatWindow'),
      chatClose: document.getElementById('chatClose'),
      chatMessages: document.getElementById('chatMessages'),
      chatInput: document.getElementById('chatInput'),
      
      // Quick Search
      quickSearchModal: document.getElementById('quickSearchModal'),
      quickSearchInput: document.getElementById('quickSearchInput'),
      quickSearchResults: document.getElementById('quickSearchResults'),
      closeQuickSearch: document.getElementById('closeQuickSearch'),
      
      // Auth Modal
      authModal: document.getElementById('authModal'),
      authForm: document.getElementById('authForm'),
      authTitle: document.getElementById('authTitle'),
      authSubtitle: document.getElementById('authSubtitle'),
      authError: document.getElementById('authError'),
      authSubmitBtn: document.getElementById('authSubmitBtn'),
      authToggleBtn: document.getElementById('authToggleBtn'),
      authCancelBtn: document.getElementById('authCancelBtn'),
      nameField: document.getElementById('nameField'),
      fullName: document.getElementById('fullName'),
      email: document.getElementById('email'),
      password: document.getElementById('password'),
      togglePassword: document.getElementById('togglePassword'),
      confirmPasswordField: document.getElementById('confirmPasswordField'),
      confirmPassword: document.getElementById('confirmPassword'),
      
      // Toast
      toastContainer: document.getElementById('toastContainer')
    };

    // Libros de ejemplo
    const DEMO_BOOKS = [
      { 
        id: '1',
        titulo: "Cien Años de Soledad", 
        autor: "Gabriel García Márquez", 
        categoria: "Literatura",
        materia: "literatura", 
        disponible: true,
        formato: "fisico",
        isbn: "978-0-06-088328-7",
        año: 1967,
        editorial: "Harper & Row",
        paginas: 417,
        ubicacion: "Estante A-12",
        descripcion: "La historia épica de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
        vecesPrestado: 15
      },
      { 
        id: '2',
        titulo: "Introducción a la Inteligencia Artificial", 
        autor: "Stuart Russell", 
        categoria: "Ciencia",
        materia: "tecnologia", 
        disponible: true,
        formato: "digital",
        isbn: "978-0-13-207148-2",
        año: 2020,
        editorial: "Pearson",
        paginas: 1132,
        ubicacion: "Digital",
        descripcion: "Texto fundamental sobre los conceptos y técnicas de la inteligencia artificial moderna.",
        vecesPrestado: 23
      },
      { 
        id: '3',
        titulo: "Física General", 
        autor: "Douglas Giancoli", 
        categoria: "Ciencia",
        materia: "ciencias", 
        disponible: false,
        formato: "fisico",
        isbn: "978-0-13-149508-1",
        año: 2018,
        editorial: "Pearson",
        paginas: 1024,
        ubicacion: "Estante B-5",
        descripcion: "Manual completo de física para estudiantes de secundaria y preparatoria.",
        vecesPrestado: 31
      },
      { 
        id: '4',
        titulo: "Matemáticas Avanzadas", 
        autor: "James Stewart", 
        categoria: "Matemáticas",
        materia: "matematicas", 
        disponible: true,
        formato: "fisico",
        isbn: "978-1-285-74062-1",
        año: 2019,
        editorial: "Cengage Learning",
        paginas: 896,
        ubicacion: "Estante C-8",
        descripcion: "Cálculo diferencial e integral para estudiantes avanzados.",
        vecesPrestado: 18
      }
    ];

    // Initialize app
    function initApp() {
      books = [...DEMO_BOOKS];
      loadSavedTheme();
      setupEventListeners();
      updateUI();
      showNotification('¡Bienvenido al CRAI Lectorium!', 'success');
    }

    // Load saved theme
    function loadSavedTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      elements.themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun text-yellow-300';
    }

    // Setup event listeners
    function setupEventListeners() {
      // Theme toggle
      elements.themeToggle.addEventListener('click', toggleTheme);
      
      // Tab navigation
      elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tabName = btn.getAttribute('data-tab');
          switchTab(tabName);
        });
      });
      
      // Auth
      elements.loginBtn.addEventListener('click', () => showAuthModal());
      elements.authForm.addEventListener('submit', handleAuth);
      elements.authToggleBtn.addEventListener('click', toggleAuthMode);
      elements.authCancelBtn.addEventListener('click', hideAuthModal);
      elements.togglePassword.addEventListener('click', togglePasswordVisibility);
      elements.logoutBtn.addEventListener('click', logout);
      
      // User menu
      if (elements.userMenuBtn) {
        elements.userMenuBtn.addEventListener('click', toggleUserDropdown);
      }
      
      // Search
      elements.advancedSearchBtn.addEventListener('click', performAdvancedSearch);
      elements.clearSearchBtn.addEventListener('click', clearAdvancedSearch);
      elements.quickSearchBtn.addEventListener('click', showQuickSearch);
      elements.closeQuickSearch.addEventListener('click', hideQuickSearch);
      elements.quickSearchInput.addEventListener('input', handleQuickSearch);
      
      // Chat
      elements.chatToggle.addEventListener('click', toggleChat);
      elements.chatClose.addEventListener('click', () => elements.chatWindow.style.display = 'none');
      elements.chatInput.addEventListener('keypress', handleChatInput);
      
      // Close modals on outside click
      elements.authModal.addEventListener('click', (e) => {
        if (e.target === elements.authModal) hideAuthModal();
      });
      elements.quickSearchModal.addEventListener('click', (e) => {
        if (e.target === elements.quickSearchModal) hideQuickSearch();
      });
    }

    // Theme toggle
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      elements.themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun text-yellow-300';
      
      localStorage.setItem('theme', newTheme);
    }

    // Tab switching
    function switchTab(tabName) {
      elements.tabBtns.forEach(b => b.classList.remove('tab-active'));
      document.querySelector(`[data-tab="${tabName}"]`).classList.add('tab-active');
      
      elements.tabContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === `${tabName}-tab`) {
          content.classList.remove('hidden');
          
          if (tabName === 'transparency') {
            setTimeout(initTransparencyCharts, 100);
          }
        }
      });
    }

    // Auth functions
    function showAuthModal() {
      elements.authModal.classList.remove('hidden');
      elements.email.focus();
    }

    function hideAuthModal() {
      elements.authModal.classList.add('hidden');
      resetAuthForm();
    }

    function toggleAuthMode() {
      isLoginMode = !isLoginMode;
      
      if (isLoginMode) {
        elements.authTitle.textContent = 'Iniciar Sesión';
        elements.authSubtitle.textContent = 'Accede al CRAI Lectorium';
        elements.authSubmitBtn.textContent = 'Iniciar Sesión';
        elements.authToggleBtn.textContent = '¿No tienes cuenta? Regístrate';
        elements.nameField.classList.add('hidden');
        elements.confirmPasswordField.classList.add('hidden');
      } else {
        elements.authTitle.textContent = 'Crear Cuenta';
        elements.authSubtitle.textContent = 'Únete al CRAI Lectorium';
        elements.authSubmitBtn.textContent = 'Crear Cuenta';
        elements.authToggleBtn.textContent = '¿Ya tienes cuenta? Inicia sesión';
        elements.nameField.classList.remove('hidden');
        elements.confirmPasswordField.classList.remove('hidden');
      }
    }

    function togglePasswordVisibility() {
      const type = elements.password.type === 'password' ? 'text' : 'password';
      elements.password.type = type;
      elements.togglePassword.innerHTML = `<i class="fas fa-${type === 'password' ? 'eye' : 'eye-slash'}"></i>`;
    }

    function resetAuthForm() {
      elements.authForm.reset();
      elements.authError.classList.add('hidden');
      isLoginMode = true;
      toggleAuthMode();
    }

    async function handleAuth(e) {
      e.preventDefault();
      
      const email = elements.email.value;
      const password = elements.password.value;
      const name = elements.fullName.value;
      
      // Validación de correo institucional
      if (!email.endsWith('@ieluiscarloslopez.edu.co')) {
        showAuthError('Solo se permiten correos institucionales (@ieluiscarloslopez.edu.co)');
        return;
      }

      if (isLoginMode) {
        // Login
        const user = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (user) {
          currentUser = { uid: user.email, email: user.email, displayName: user.name };
          hideAuthModal();
          showNotification(`¡Bienvenido, ${user.name}!`, 'success');
          updateUI();
          loadUserLoans();
        } else {
          showAuthError('Credenciales incorrectas. Intenta con: estudiante@ieluiscarloslopez.edu.co / demo123');
        }
      } else {
        // Register
        if (password !== elements.confirmPassword.value) {
          showAuthError('Las contraseñas no coinciden');
          return;
        }
        
        if (password.length < 6) {
          showAuthError('La contraseña debe tener al menos 6 caracteres');
          return;
        }
        
        // Simular registro exitoso
        currentUser = { uid: email, email: email, displayName: name };
        hideAuthModal();
        showNotification(`¡Cuenta creada exitosamente! Bienvenido, ${name}`, 'success');
        updateUI();
      }
    }

    function showAuthError(message) {
      elements.authError.textContent = message;
      elements.authError.classList.remove('hidden');
    }

    function logout() {
      currentUser = null;
      userLoans = [];
      updateUI();
      showNotification('Sesión cerrada exitosamente', 'info');
    }

    function toggleUserDropdown() {
      if (elements.userDropdown) {
        elements.userDropdown.classList.toggle('hidden');
      }
    }

    // Update UI based on auth state
    function updateUI() {
      if (currentUser) {
        elements.loginBtn.classList.add('hidden');
        elements.userMenu.classList.remove('hidden');
        elements.userEmail.textContent = currentUser.email;
        elements.dropdownName.textContent = currentUser.displayName || 'Usuario';
        elements.dropdownEmail.textContent = currentUser.email;
      } else {
        elements.loginBtn.classList.remove('hidden');
        elements.userMenu.classList.add('hidden');
        if (elements.userDropdown) {
          elements.userDropdown.classList.add('hidden');
        }
      }
    }

    // Search functions
    function performAdvancedSearch() {
      const filters = {
        titulo: elements.searchTitle.value.toLowerCase(),
        autor: elements.searchAuthor.value.toLowerCase(),
        isbn: elements.searchISBN.value.toLowerCase(),
        materia: elements.searchSubject.value,
        onlyAvailable: elements.onlyAvailable.checked,
        includeDigital: elements.includeDigital.checked
      };
      
      let filtered = books;
      
      if (filters.titulo) {
        filtered = filtered.filter(book => book.titulo.toLowerCase().includes(filters.titulo));
      }
      if (filters.autor) {
        filtered = filtered.filter(book => book.autor.toLowerCase().includes(filters.autor));
      }
      if (filters.isbn) {
        filtered = filtered.filter(book => book.isbn && book.isbn.includes(filters.isbn));
      }
      if (filters.materia) {
        filtered = filtered.filter(book => book.materia === filters.materia);
      }
      if (filters.onlyAvailable) {
        filtered = filtered.filter(book => book.disponible);
      }
      if (!filters.includeDigital) {
        filtered = filtered.filter(book => book.formato !== 'digital');
      }
      
      displayCatalogResults(filtered);
    }

    function clearAdvancedSearch() {
      elements.searchTitle.value = '';
      elements.searchAuthor.value = '';
      elements.searchISBN.value = '';
      elements.searchSubject.value = '';
      elements.onlyAvailable.checked = false;
      elements.includeDigital.checked = false;
      elements.catalogResults.innerHTML = `
        <div class="col-span-full text-center py-12">
          <i class="fas fa-search text-6xl opacity-20 mb-4"></i>
          <p class="text-xl font-semibold opacity-70">Realiza una búsqueda para ver resultados</p>
          <p class="text-sm opacity-50">Puedes buscar por título, autor, ISBN o materia</p>
        </div>
      `;
    }

    function displayCatalogResults(results) {
      if (results.length === 0) {
        elements.catalogResults.innerHTML = `
          <div class="col-span-full text-center py-12">
            <i class="fas fa-search text-6xl opacity-20 mb-4"></i>
            <p class="text-xl font-semibold opacity-70">No se encontraron resultados</p>
            <p class="text-sm opacity-50">Intenta con otros criterios de búsqueda</p>
          </div>
        `;
        return;
      }
      
      elements.catalogResults.innerHTML = results.map(book => 
        '<div class="glass rounded-xl p-6 hover:shadow-xl transition">' +
          '<div class="flex justify-between items-start mb-3">' +
            '<h4 class="font-semibold text-lg">' + book.titulo + '</h4>' +
            '<span class="text-xs px-2 py-1 rounded-full ' + (book.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') + '">' +
              (book.disponible ? 'Disponible' : 'Prestado') +
            '</span>' +
          '</div>' +
          '<p class="text-sm opacity-70 mb-2">' + book.autor + '</p>' +
          '<div class="space-y-1 text-sm mb-4">' +
            '<p><i class="fas fa-barcode mr-2"></i>ISBN: ' + (book.isbn || 'No disponible') + '</p>' +
            '<p><i class="fas fa-bookmark mr-2"></i>Categoría: ' + book.categoria + '</p>' +
            '<p><i class="fas fa-map-marker-alt mr-2"></i>Ubicación: ' + (book.ubicacion || 'No especificada') + '</p>' +
          '</div>' +
          '<div class="flex space-x-2">' +
            '<button onclick="requestBook(\'' + book.id + '\')" class="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold micro-interaction ' + (!book.disponible ? 'opacity-50 cursor-not-allowed' : '') + '">' +
              (book.disponible ? 'Solicitar' : 'No disponible') +
            '</button>' +
            '<button onclick="showBookDetails(\'' + book.id + '\')" class="glass px-4 py-2 rounded-lg text-sm micro-interaction">' +
              '<i class="fas fa-info-circle"></i> Detalles' +
            '</button>' +
            (book.formato === 'digital' ? 
              '<button class="glass px-4 py-2 rounded-lg text-sm micro-interaction"><i class="fas fa-download"></i> Digital</button>' : 
              '') +
          '</div>' +
        '</div>'
      ).join('');
    }

    // Quick search
    function showQuickSearch() {
      elements.quickSearchModal.classList.remove('hidden');
      elements.quickSearchInput.focus();
    }

    function hideQuickSearch() {
      elements.quickSearchModal.classList.add('hidden');
      elements.quickSearchInput.value = '';
      elements.quickSearchResults.innerHTML = '';
    }

    function handleQuickSearch(e) {
      const term = e.target.value.toLowerCase();
      if (term.length < 2) {
        elements.quickSearchResults.innerHTML = '';
        return;
      }
      
      const results = books.filter(book => 
        book.titulo.toLowerCase().includes(term) ||
        book.autor.toLowerCase().includes(term)
      ).slice(0, 5);
      
      elements.quickSearchResults.innerHTML = results.map(book => 
        '<div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer" onclick="showBookDetails(\'' + book.id + '\')">' +
          '<p class="font-medium">' + book.titulo + '</p>' +
          '<p class="text-sm opacity-70">' + book.autor + ' • ' + book.categoria + '</p>' +
        '</div>'
      ).join('') || '<p class="text-center py-4 opacity-70">No se encontraron resultados</p>';
    }

    // Book functions
    window.requestBook = function(bookId) {
      if (!currentUser) {
        showNotification('Debes iniciar sesión para solicitar libros', 'warning');
        showAuthModal();
        return;
      }
      
      const book = books.find(b => b.id === bookId);
      if (!book || !book.disponible) {
        showNotification('Este libro no está disponible', 'error');
        return;
      }
      
      // Simular préstamo
      book.disponible = false;
      
      const loan = {
        id: Date.now().toString(),
        bookId: bookId,
        titulo: book.titulo,
        autor: book.autor,
        fechaPrestamo: new Date(),
        fechaVencimiento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        estado: 'activo'
      };
      
      userLoans.push(loan);
      
      showNotification(`¡Préstamo exitoso! Tienes 14 días para devolver "${book.titulo}"`, 'success');
      performAdvancedSearch(); // Refresh results
      loadUserLoans();
    };

    window.showBookDetails = function(bookId) {
      const book = books.find(b => b.id === bookId);
      if (!book) return;
      
      showNotification(`Detalles: "${book.titulo}" por ${book.autor}. ${book.descripcion.substring(0, 100)}...`, 'info');
    };

    // Loans functions
    function loadUserLoans() {
      if (!currentUser) {
        elements.loansContainer.innerHTML = `
          <div class="text-center py-12">
            <i class="fas fa-lock text-6xl opacity-20 mb-4"></i>
            <p class="text-xl font-semibold opacity-70">Inicia sesión para ver tus préstamos</p>
          </div>
        `;
        return;
      }
      
      displayLoans();
      updateLoanStats();
    }

    function displayLoans() {
      if (userLoans.length === 0) {
        elements.loansContainer.innerHTML = `
          <div class="text-center py-12">
            <i class="fas fa-book-open text-6xl opacity-20 mb-4"></i>
            <p class="text-xl font-semibold opacity-70">No tienes préstamos activos</p>
            <p class="text-sm opacity-50">Explora el catálogo para solicitar libros</p>
          </div>
        `;
        return;
      }
      
      elements.loansContainer.innerHTML = userLoans.map(loan => {
        const daysLeft = Math.ceil((loan.fechaVencimiento - new Date()) / (1000 * 60 * 60 * 24));
        const isOverdue = daysLeft < 0;
        const isDueSoon = daysLeft <= 3 && daysLeft > 0;
        
        return '<div class="glass rounded-lg p-4 hover:shadow-lg transition">' +
          '<div class="flex justify-between items-start">' +
            '<div class="flex-1">' +
              '<h5 class="font-semibold text-lg mb-1">' + loan.titulo + '</h5>' +
              '<p class="text-sm opacity-70 mb-2">Por: ' + loan.autor + '</p>' +
              '<div class="flex space-x-4 text-sm">' +
                '<span><i class="fas fa-calendar mr-1"></i>Prestado: ' + loan.fechaPrestamo.toLocaleDateString() + '</span>' +
                '<span class="' + (isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-green-600') + '">' +
                  '<i class="fas fa-clock mr-1"></i>' +
                  (isOverdue ? 'Vencido hace ' + Math.abs(daysLeft) + ' días' : 
                   isDueSoon ? 'Vence en ' + daysLeft + ' días' : 
                   daysLeft + ' días restantes') +
                '</span>' +
              '</div>' +
            '</div>' +
            '<div class="flex flex-col space-y-2">' +
              '<button onclick="renewLoan(\'' + loan.id + '\')" class="glass px-4 py-2 rounded text-sm micro-interaction">' +
                '<i class="fas fa-redo mr-1"></i> Renovar' +
              '</button>' +
              '<button onclick="returnBook(\'' + loan.id + '\')" class="bg-green-600 text-white px-4 py-2 rounded text-sm micro-interaction">' +
                '<i class="fas fa-check mr-1"></i> Devolver' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function updateLoanStats() {
      const activeLoans = userLoans.filter(loan => loan.estado === 'activo').length;
      const dueSoon = userLoans.filter(loan => {
        if (loan.estado !== 'activo') return false;
        const daysLeft = Math.ceil((loan.fechaVencimiento - new Date()) / (1000 * 60 * 60 * 24));
        return daysLeft >= 0 && daysLeft <= 7;
      }).length;
      
      elements.activeLoansCount.textContent = activeLoans;
      elements.dueSoonLoansCount.textContent = dueSoon;
      
      // Update notification badge
      if (dueSoon > 0) {
        elements.notificationCount.textContent = dueSoon;
        elements.notificationCount.classList.remove('hidden');
      } else {
        elements.notificationCount.classList.add('hidden');
      }
    }

    window.renewLoan = function(loanId) {
      const loan = userLoans.find(l => l.id === loanId);
      if (loan) {
        loan.fechaVencimiento = new Date(loan.fechaVencimiento.getTime() + 14 * 24 * 60 * 60 * 1000);
        showNotification(`Préstamo renovado exitosamente. Nueva fecha de vencimiento: ${loan.fechaVencimiento.toLocaleDateString()}`, 'success');
        displayLoans();
        updateLoanStats();
      }
    };

    window.returnBook = function(loanId) {
      const loanIndex = userLoans.findIndex(l => l.id === loanId);
      if (loanIndex !== -1) {
        const loan = userLoans[loanIndex];
        const book = books.find(b => b.id === loan.bookId);
        if (book) {
          book.disponible = true;
        }
        
        userLoans.splice(loanIndex, 1);
        showNotification(`Libro "${loan.titulo}" devuelto exitosamente`, 'success');
        displayLoans();
        updateLoanStats();
      }
    };

    // Chat functions
    function toggleChat() {
      const isVisible = elements.chatWindow.style.display === 'block';
      elements.chatWindow.style.display = isVisible ? 'none' : 'block';
    }

    function handleChatInput(e) {
      if (e.key === 'Enter' && e.target.value.trim()) {
        const message = e.target.value;
        addChatMessage(message, 'user');
        
        // Simulate response
        setTimeout(() => {
          const responses = {
            'busco': 'Para buscar un libro, usa la pestaña "Catálogo OPAC" y puedes buscar por título, autor o ISBN.',
            'citas': 'Para aprender sobre citas, visita la pestaña "Formación" donde encontrarás tutoriales sobre APA y MLA.',
            'bases': 'Las bases de datos están en la pestaña "Bases de Datos". Tenemos acceso a EBSCO, Google Scholar y más.',
            'préstamo': 'Para solicitar un préstamo, busca el libro en el catálogo y haz clic en "Solicitar". Puedes tener hasta 3 libros.',
            'renovar': 'Puedes renovar tus préstamos desde la pestaña "Préstamos" haciendo clic en el botón "Renovar".',
            'default': 'Entiendo tu consulta. ¿Podrías ser más específico? Puedo ayudarte con búsquedas, préstamos, bases de datos, citas y más.'
          };
          
          let response = responses.default;
          for (const key in responses) {
            if (message.toLowerCase().includes(key)) {
              response = responses[key];
              break;
            }
          }
          
          addChatMessage(response, 'bot');
        }, 1000);
        
        e.target.value = '';
      }
    }

    function addChatMessage(message, sender) {
      const messageEl = document.createElement('div');
      messageEl.className = 'glass rounded-lg p-3 mb-3 max-w-[80%]' + (sender === 'user' ? ' ml-auto bg-purple-600 text-white' : '');
      messageEl.innerHTML = '<p class="text-sm">' + message + '</p>';
      elements.chatMessages.appendChild(messageEl);
      elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    // Toast notifications
    function showNotification(message, type = 'info') {
      const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
      };
      
      const colors = {
        success: 'text-green-600',
        error: 'text-red-600',
        info: 'text-blue-600',
        warning: 'text-yellow-600'
      };
      
      const toast = document.createElement('div');
      toast.className = 'toast bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      toast.innerHTML = 
        '<div class="flex items-center space-x-3">' +
          '<i class="fas ' + icons[type] + ' ' + colors[type] + ' text-xl"></i>' +
          '<span class="font-medium">' + message + '</span>' +
        '</div>';
      
      elements.toastContainer.appendChild(toast);
      
      setTimeout(() => toast.classList.add('show'), 100);
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    // Transparency charts
    function initTransparencyCharts() {
      const ctx = document.getElementById('usageChart');
      if (!ctx || window.usageChart) return;
      
      window.usageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Libros Físicos', 'Recursos Digitales', 'Bases de Datos', 'Multimedia'],
          datasets: [{
            data: [45, 30, 15, 10],
            backgroundColor: [
              '#667eea',
              '#48bb78',
              '#ed8936',
              '#9f7aea'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    }

    // Repository functions
    window.filterRepository = function(type) {
      showNotification(`Filtrando por: ${type}`, 'info');
    };

    // Global functions for buttons
    window.uploadWork = function() {
      if (!currentUser) {
        showNotification('Debes iniciar sesión para subir trabajos', 'warning');
        showAuthModal();
        return;
      }
      showNotification('Función de subida de trabajos en desarrollo', 'info');
    };

    window.newReservation = function() {
      if (!currentUser) {
        showNotification('Debes iniciar sesión para hacer reservas', 'warning');
        showAuthModal();
        return;
      }
      showNotification('Función de reservas en desarrollo', 'info');
    };

    // Event listeners for buttons with null checks
    document.addEventListener('DOMContentLoaded', () => {
      const uploadBtn = document.getElementById('uploadWorkBtn');
      const reservationBtn = document.getElementById('newReservationBtn');
      
      if (uploadBtn) {
        uploadBtn.addEventListener('click', uploadWork);
      }
      if (reservationBtn) {
        reservationBtn.addEventListener('click', newReservation);
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#userMenu') && elements.userDropdown) {
        elements.userDropdown.classList.add('hidden');
      }
    });

    // Handle escape key - removed duplicate function

    // Add click listeners to chat suggestion buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.chat-suggestion')) {
        elements.chatInput.value = e.target.textContent;
        handleChatInput({ key: 'Enter', target: elements.chatInput });
      }
    });

    // Initialize app when DOM is loaded
    document.addEventListener('DOMContentLoaded', initApp);

    // Add some demo data when user logs in
    function addDemoLoans() {
      if (currentUser && userLoans.length === 0) {
        // Add a demo loan for demonstration
        const demoLoan = {
          id: 'demo1',
          bookId: '3',
          titulo: 'Física General',
          autor: 'Douglas Giancoli',
          fechaPrestamo: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          fechaVencimiento: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          estado: 'activo'
        };
        userLoans.push(demoLoan);
      }
    }

    // Enhanced search with keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K for quick search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showQuickSearch();
      }
      
      // Ctrl/Cmd + L for login
      if ((e.ctrlKey || e.metaKey) && e.key === 'l' && !currentUser) {
        e.preventDefault();
        showAuthModal();
      }
      
      // Handle escape key
      if (e.key === 'Escape') {
        hideAuthModal();
        hideQuickSearch();
        elements.chatWindow.style.display = 'none';
        if (elements.userDropdown) {
          elements.userDropdown.classList.add('hidden');
        }
      }
    });

    // Add accessibility improvements
    function enhanceAccessibility() {
      // Add ARIA labels
      elements.themeToggle.setAttribute('aria-label', 'Cambiar tema');
      elements.quickSearchBtn.setAttribute('aria-label', 'Búsqueda rápida');
      elements.notificationBtn.setAttribute('aria-label', 'Notificaciones');
      elements.chatToggle.setAttribute('aria-label', 'Abrir chat de ayuda');
      
      // Add focus styles
      const style = document.createElement('style');
      style.textContent = `
        button:focus, input:focus, select:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
        
        .glass:focus {
          box-shadow: 0 0 0 2px var(--primary);
        }
      `;
      document.head.appendChild(style);
    }

    // Initialize accessibility when DOM loads
    document.addEventListener('DOMContentLoaded', enhanceAccessibility);

    // Add smooth transitions for better UX
    function addSmoothTransitions() {
      const style = document.createElement('style');
      style.textContent = `
        .tab-content {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }
        
        .tab-content:not(.hidden) {
          opacity: 1;
          transform: translateY(0);
        }
        
        .micro-interaction {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .micro-interaction:hover {
          transform: translateY(-2px);
        }
        
        .micro-interaction:active {
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }

    document.addEventListener('DOMContentLoaded', addSmoothTransitions);

  </script>
</body>
</html>
