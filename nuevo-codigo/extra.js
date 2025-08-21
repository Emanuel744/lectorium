    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { 
      getAuth, 
      signInWithEmailAndPassword, 
      createUserWithEmailAndPassword, 
      signOut, 
      onAuthStateChanged,
      updateProfile
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
    import { 
      getFirestore, 
      collection, 
      getDocs, 
      addDoc, 
      query, 
      where, 
      orderBy, 
      serverTimestamp,
      doc,
      updateDoc,
      getDoc,
      limit,
      onSnapshot
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyAQZwAqOUHYoz1zICz7PXJt01q0FEJa15o",
      authDomain: "lectorium-a312d.firebaseapp.com",
      projectId: "lectorium-a312d",
      storageBucket: "lectorium-a312d.firebasestorage.app",
      messagingSenderId: "177236654132",
      appId: "1:177236654132:web:e00ecfcced130e89f0b261"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Global variables
    let currentUser = null;
    let books = [];
    let userLoans = [];
    let isLoginMode = true;

    // DOM Elements
    const elements = {
      // Theme
      themeToggle: document.getElementById('themeToggle'),
      themeIcon: document.getElementById('themeIcon'),
      
      // Header
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
      historyBtn: document.getElementById('historyBtn'),
      logoutBtn: document.getElementById('logoutBtn'),
      
      // Tabs
      tabBtns: document.querySelectorAll('.tab-btn'),
      tabContents: document.querySelectorAll('.tab-content'),
      
      // Dashboard
      totalBooksCount: document.getElementById('totalBooksCount'),
      availableBooksCount: document.getElementById('availableBooksCount'),
      myLoansCount: document.getElementById('myLoansCount'),
      dueSoonCount: document.getElementById('dueSoonCount'),
      recentBooks: document.getElementById('recentBooks'),
      
      // Catalog
      searchInput: document.getElementById('searchInput'),
      categoryFilter: document.getElementById('categoryFilter'),
      searchBtn: document.getElementById('searchBtn'),
      activeFilters: document.getElementById('activeFilters'),
      loadingBooks: document.getElementById('loadingBooks'),
      booksGrid: document.getElementById('booksGrid'),
      noResults: document.getElementById('noResults'),
      
      // Loans
      loansContainer: document.getElementById('loansContainer'),
      
      // Analytics
      topBooks: document.getElementById('topBooks'),
      
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
      
      // Book Modal
      bookModal: document.getElementById('bookModal'),
      bookModalContent: document.getElementById('bookModalContent'),
      
      // Toast
      toastContainer: document.getElementById('toastContainer')
    };

    // Theme Toggle
    elements.themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      elements.themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun text-yellow-300';
      
      localStorage.setItem('theme', newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    elements.themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun text-yellow-300';

    // Tab Navigation
    elements.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        elements.tabBtns.forEach(b => b.classList.remove('tab-active'));
        btn.classList.add('tab-active');
        
        elements.tabContents.forEach(content => {
          content.classList.add('hidden');
          if (content.id === `${tabName}-tab`) {
            content.classList.remove('hidden');
            
            if (tabName === 'analytics' && currentUser) {
              setTimeout(initCharts, 100);
            }
          }
        });
      });
    });

    // Toast Notifications
    window.showNotification = function(message, type = 'info') {
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
      toast.innerHTML = `
        <div class="flex items-center space-x-3">
          <i class="fas ${icons[type]} ${colors[type]} text-xl"></i>
          <span class="font-medium">${message}</span>
        </div>
      `;
      
      elements.toastContainer.appendChild(toast);
      
      setTimeout(() => toast.classList.add('show'), 100);
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    };

    // Initial books data
    const initialBooks = [
      { 
        titulo: "Cien Años de Soledad", 
        autor: "Gabriel García Márquez", 
        categoria: "moderno", 
        disponible: true,
        isbn: "978-0-06-088328-7",
        año: 1967,
        editorial: "Harper & Row",
        paginas: 417,
        descripcion: "La historia épica de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
        vecesPrestado: 0
      },
      { 
        titulo: "Don Quijote de la Mancha", 
        autor: "Miguel de Cervantes", 
        categoria: "clasico", 
        disponible: true,
        isbn: "978-84-376-0494-7",
        año: 1605,
        editorial: "Francisco de Robles",
        paginas: 1023,
        descripcion: "Las aventuras del hidalgo Don Quijote y su fiel escudero Sancho Panza.",
        vecesPrestado: 0
      },
      { 
        titulo: "1984", 
        autor: "George Orwell", 
        categoria: "ficcion", 
        disponible: true,
        isbn: "978-0-452-28423-4",
        año: 1949,
        editorial: "Secker & Warburg",
        paginas: 328,
        descripcion: "Una distopía en la que un superestado totalitario controla cada aspecto de la vida.",
        vecesPrestado: 0
      },
      { 
        titulo: "El Principito", 
        autor: "Antoine de Saint-Exupéry", 
        categoria: "infantil", 
        disponible: true,
        isbn: "978-0-15-601219-5",
        año: 1943,
        editorial: "Reynal & Hitchcock",
        paginas: 96,
        descripcion: "Un piloto se encuentra en el desierto del Sahara con un pequeño príncipe de otro planeta.",
        vecesPrestado: 0
      },
      { 
        titulo: "Harry Potter y la Piedra Filosofal", 
        autor: "J.K. Rowling", 
        categoria: "juvenil", 
        disponible: true,
        isbn: "978-0-439-70818-8",
        año: 1997,
        editorial: "Bloomsbury",
        paginas: 223,
        descripcion: "Las aventuras de un joven mago en su primer año en Hogwarts.",
        vecesPrestado: 0
      },
      { 
        titulo: "Sapiens", 
        autor: "Yuval Noah Harari", 
        categoria: "ciencia", 
        disponible: true,
        isbn: "978-0-06-231609-7",
        año: 2011,
        editorial: "Harper",
        paginas: 443,
        descripcion: "Una breve historia de la humanidad desde la Edad de Piedra hasta el siglo XXI.",
        vecesPrestado: 0
      },
      { 
        titulo: "El Diario de Ana Frank", 
        autor: "Ana Frank", 
        categoria: "historia", 
        disponible: true,
        isbn: "978-0-553-29698-3",
        año: 1947,
        editorial: "Contact Publishing",
        paginas: 283,
        descripcion: "El diario íntimo de una niña judía durante la Segunda Guerra Mundial.",
        vecesPrestado: 0
      }
    ];

    // Initialize books collection
    async function initializeBooks() {
      try {
        const booksRef = collection(db, "libros");
        const snapshot = await getDocs(booksRef);
        
        if (snapshot.empty) {
          console.log('Initializing books collection...');
          for (const book of initialBooks) {
            await addDoc(booksRef, {
              ...book,
              fechaAgregado: serverTimestamp()
            });
          }
          showNotification('Biblioteca inicializada con éxito', 'success');
        }
      } catch (error) {
        console.error('Error initializing books:', error);
        showNotification('Error al inicializar la biblioteca', 'error');
      }
    }

    // Load books
    async function loadBooks() {
      try {
        elements.loadingBooks.classList.remove('hidden');
        elements.booksGrid.classList.add('hidden');
        
        await initializeBooks();
        
        const snapshot = await getDocs(collection(db, "libros"));
        books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        updateDashboardStats();
        displayBooks(books);
        displayRecentBooks();
        
        elements.loadingBooks.classList.add('hidden');
        elements.booksGrid.classList.remove('hidden');
      } catch (error) {
        console.error('Error loading books:', error);
        showNotification('Error al cargar los libros', 'error');
        elements.loadingBooks.classList.add('hidden');
      }
    }

    // Update dashboard statistics
    function updateDashboardStats() {
      const totalBooks = books.length;
      const availableBooks = books.filter(book => book.disponible).length;
      const myLoans = userLoans.filter(loan => loan.estado === 'activo').length;
      const dueSoon = userLoans.filter(loan => {
        if (loan.estado !== 'activo') return false;
        const daysLeft = calculateDaysLeft(loan.fechaVencimiento);
        return daysLeft >= 0 && daysLeft <= 7;
      }).length;
      
      elements.totalBooksCount.textContent = totalBooks;
      elements.availableBooksCount.textContent = availableBooks;
      elements.myLoansCount.textContent = myLoans;
      elements.dueSoonCount.textContent = dueSoon;
      
      // Update notification count
      if (dueSoon > 0) {
        elements.notificationCount.textContent = dueSoon;
        elements.notificationCount.classList.remove('hidden');
      } else {
        elements.notificationCount.classList.add('hidden');
      }
    }

    // Display recent books
    function displayRecentBooks() {
      const recentBooks = books
        .sort((a, b) => (b.fechaAgregado?.seconds || 0) - (a.fechaAgregado?.seconds || 0))
        .slice(0, 5);
      
      elements.recentBooks.innerHTML = recentBooks.map(book => `
        <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer" onclick="showBookDetails('${book.id}')">
          <div>
            <p class="font-semibold">${book.titulo}</p>
            <p class="text-sm opacity-70">${book.autor}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded-full ${book.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
            ${book.disponible ? 'Disponible' : 'Prestado'}
          </span>
        </div>
      `).join('');
    }

    // Display books
    function displayBooks(booksToShow) {
      elements.booksGrid.innerHTML = '';
      
      if (booksToShow.length === 0) {
        elements.noResults.classList.remove('hidden');
        return;
      }
      
      elements.noResults.classList.add('hidden');
      
      booksToShow.forEach(book => {
        const card = document.createElement('div');
        card.className = 'glass rounded-xl overflow-hidden book-card cursor-pointer';
        
        const categoryColors = {
          clasico: 'from-amber-500 to-orange-600',
          moderno: 'from-purple-500 to-pink-600',
          ficcion: 'from-blue-500 to-indigo-600',
          ciencia: 'from-green-500 to-teal-600',
          historia: 'from-red-500 to-pink-600',
          infantil: 'from-yellow-400 to-orange-500',
          juvenil: 'from-pink-500 to-purple-600'
        };
        
        const gradient = categoryColors[book.categoria] || 'from-gray-500 to-gray-600';
        
        card.innerHTML = `
          <div class="relative">
            <div class="bg-gradient-to-br ${gradient} h-48 flex items-center justify-center">
              <i class="fas fa-book text-white text-5xl opacity-80"></i>
            </div>
            <div class="absolute top-2 right-2 bg-${book.disponible ? 'green' : 'red'}-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ${book.disponible ? 'Disponible' : 'Prestado'}
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-1 line-clamp-1">${book.titulo}</h3>
            <p class="text-sm opacity-70 mb-2">${book.autor}</p>
            <p class="text-xs opacity-60 mb-3">ISBN: ${book.isbn || 'No disponible'}</p>
            <div class="flex space-x-2">
              <button onclick="event.stopPropagation(); ${book.disponible ? `requestBook('${book.id}')` : 'showNotification(\'Este libro no está disponible\', \'warning\')'}" 
                class="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold micro-interaction ${!book.disponible ? 'opacity-50 cursor-not-allowed' : ''}">
                ${book.disponible ? 'Solicitar' : 'No disponible'}
              </button>
              <button onclick="event.stopPropagation(); showBookDetails('${book.id}')" class="p-2 glass rounded-lg micro-interaction">
                <i class="fas fa-info-circle"></i>
              </button>
            </div>
          </div>
        `;
        
        card.addEventListener('click', () => showBookDetails(book.id));
        elements.booksGrid.appendChild(card);
      });
    }

    // Show book details
    window.showBookDetails = function(bookId) {
      const book = books.find(b => b.id === bookId);
      if (!book) return;
      
      const categoryColors = {
        clasico: 'from-amber-500 to-orange-600',
        moderno: 'from-purple-500 to-pink-600',
        ficcion: 'from-blue-500 to-indigo-600',
        ciencia: 'from-green-500 to-teal-600',
        historia: 'from-red-500 to-pink-600',
        infantil: 'from-yellow-400 to-orange-500',
        juvenil: 'from-pink-500 to-purple-600'
      };
      
      const gradient = categoryColors[book.categoria] || 'from-gray-500 to-gray-600';
      
      elements.bookModalContent.innerHTML = `
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-bold tracking-tight">${book.titulo}</h2>
          <button onclick="closeBookModal()" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <div class="bg-gradient-to-br ${gradient} h-64 rounded-lg mb-4 flex items-center justify-center">
              <i class="fas fa-book text-white text-6xl opacity-80"></i>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="font-medium">Autor:</span> ${book.autor}</p>
              <p><span class="font-medium">ISBN:</span> ${book.isbn || 'No disponible'}</p>
              <p><span class="font-medium">Año:</span> ${book.año || 'No disponible'}</p>
              <p><span class="font-medium">Editorial:</span> ${book.editorial || 'No disponible'}</p>
              <p><span class="font-medium">Páginas:</span> ${book.paginas || 'No disponible'}</p>
              <p><span class="font-medium">Categoría:</span> ${book.categoria}</p>
              <p><span class="font-medium">Veces prestado:</span> ${book.vecesPrestado || 0}</p>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold text-lg mb-3">Descripción</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              ${book.descripcion || 'No hay descripción disponible para este libro.'}
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Estado del libro:</p>
              <p class="text-lg font-semibold ${book.disponible ? 'text-green-600' : 'text-red-600'}">
                ${book.disponible ? '✓ Disponible para préstamo' : '✗ Actualmente prestado'}
              </p>
            </div>
            
            ${currentUser ? `
              <button 
                onclick="${book.disponible ? `requestBook('${book.id}'); closeBookModal();` : 'showNotification(\'Este libro no está disponible\', \'warning\')'}" 
                class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold micro-interaction ${!book.disponible ? 'opacity-50 cursor-not-allowed' : ''}"
              >
                ${book.disponible ? 'Solicitar Préstamo' : 'No Disponible'}
              </button>
            ` : `
              <button 
                onclick="closeBookModal(); elements.authModal.classList.remove('hidden');" 
                class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold micro-interaction"
              >
                Iniciar sesión para solicitar préstamo
              </button>
            `}
          </div>
        </div>
      `;
      
      elements.bookModal.classList.remove('hidden');
    };

    window.closeBookModal = function() {
      elements.bookModal.classList.add('hidden');
    };

    // Request book
    window.requestBook = async function(bookId) {
      if (!currentUser) {
        showNotification('Debes iniciar sesión para solicitar libros', 'warning');
        elements.authModal.classList.remove('hidden');
        return;
      }
      
      try {
        const book = books.find(b => b.id === bookId);
        if (!book || !book.disponible) {
          showNotification('Este libro no está disponible', 'error');
          return;
        }
        
        // Check if user already has this book
        const loansRef = collection(db, "prestamos");
        const q = query(loansRef, 
          where("userId", "==", currentUser.uid),
          where("libroId", "==", bookId),
          where("estado", "==", "activo")
        );
        const existingLoans = await getDocs(q);
        
        if (!existingLoans.empty) {
          showNotification('Ya tienes este libro en préstamo', 'warning');
          return;
        }
        
        // Check loan limit (max 3 books)
        const activeLoansQuery = query(loansRef,
          where("userId", "==", currentUser.uid),
          where("estado", "==", "activo")
        );
        const activeLoans = await getDocs(activeLoansQuery);
        
        if (activeLoans.size >= 3) {
          showNotification('Has alcanzado el límite de 3 préstamos activos', 'warning');
          return;
        }
        
        // Create loan
        const loanData = {
          userId: currentUser.uid,
          userEmail: currentUser.email,
          userName: currentUser.displayName || 'Usuario',
          libroId: bookId,
          titulo: book.titulo,
          autor: book.autor,
          isbn: book.isbn || 'No disponible',
          fechaPrestamo: serverTimestamp(),
          fechaVencimiento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
          estado: "activo",
          renovaciones: 0
        };
        
        await addDoc(collection(db, "prestamos"), loanData);
        
        // Update book availability
        await updateDoc(doc(db, "libros", bookId), { 
          disponible: false,
          vecesPrestado: (book.vecesPrestado || 0) + 1
        });
        
        showNotification(`¡Préstamo exitoso! Tienes 14 días para devolver "${book.titulo}"`, 'success');
        
        await loadBooks();
        await loadLoans();
      } catch (error) {
        console.error('Error requesting book:', error);
        showNotification('Error al procesar el préstamo', 'error');
      }
    };

    // Load user loans
    async function loadLoans() {
      if (!currentUser) {
        elements.loansContainer.innerHTML = `
          <div class="text-center py-12">
            <i class="fas fa-lock text-6xl opacity-20 mb-4"></i>
            <p class="text-xl font-semibold opacity-70">Inicia sesión para ver tus préstamos</p>
          </div>
        `;
        return;
      }
      
      try {
        const q = query(
          collection(db, "prestamos"),
          where("userId", "==", currentUser.uid),
          where("estado", "==", "activo"),
          orderBy("fechaPrestamo", "desc")
        );
        
        const snapshot = await getDocs(q);
        userLoans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        displayLoans();
        updateDashboardStats();
      } catch (error) {
        console.error('Error loading loans:', error);
        showNotification('Error al cargar los préstamos', 'error');
      }
    }

    // Display loans
    function displayLoans() {
      if (userLoans.length === 0) {
        elements.loansContainer.innerHTML = `
          <div class="text-center py-12">
            <i class="fas fa-book-open text-6xl opacity-20 mb-4"></i>
            <p class="text-xl font-semibold opacity-70">No tienes préstamos activos</p>
            <p class="text-sm opacity-50 mt-2">¡Explora nuestro catálogo y encuentra tu próxima lectura!</p>
          </div>
        `;
        return;
      }
      
      elements.loansContainer.innerHTML = userLoans.map(loan => {
        const daysLeft = calculateDaysLeft(loan.fechaVencimiento);
        const isOverdue = daysLeft < 0;
        const isNearDue = daysLeft >= 0 && daysLeft <= 3;
        
        return `
          <div class="glass rounded-lg p-4 ${isOverdue ? 'border-2 border-red-500' : isNearDue ? 'border-2 border-yellow-500' : ''}">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-lg">${loan.titulo}</h4>
                <p class="text-sm opacity-70">${loan.autor}</p>
                <div class="mt-2 space-y-1 text-sm">
                  <p><i class="fas fa-calendar-check mr-2"></i>Prestado: ${formatDate(loan.fechaPrestamo)}</p>
                  <p><i class="fas fa-calendar-times mr-2"></i>Vence: ${formatDate(loan.fechaVencimiento)}</p>
                  ${loan.renovaciones > 0 ? `<p><i class="fas fa-sync mr-2"></i>Renovaciones: ${loan.renovaciones}/2</p>` : ''}
                </div>
                <div class="mt-3">
                  ${isOverdue ? 
                    `<span class="text-red-600 font-semibold"><i class="fas fa-exclamation-triangle mr-1"></i>Vencido hace ${Math.abs(daysLeft)} días</span>` : 
                    isNearDue ?
                    `<span class="text-yellow-600 font-semibold"><i class="fas fa-clock mr-1"></i>Vence en ${daysLeft} días</span>` :
                    `<span class="text-green-600 font-semibold"><i class="fas fa-check-circle mr-1"></i>${daysLeft} días restantes</span>`
                  }
                </div>
              </div>
              
              <div class="flex flex-col space-y-2">
                <button onclick="returnBook('${loan.id}', '${loan.libroId}')" 
                  class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold micro-interaction">
                  <i class="fas fa-undo mr-2"></i>Devolver
                </button>
                ${!isOverdue && loan.renovaciones < 2 ? `
                  <button onclick="renewLoan('${loan.id}')" 
                    class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold micro-interaction">
                    <i class="fas fa-sync mr-2"></i>Renovar
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Calculate days left
    function calculateDaysLeft(vencimiento) {
      if (!vencimiento) return 0;
      
      let due;
      if (vencimiento.toDate) {
        due = vencimiento.toDate();
      } else if (vencimiento.seconds) {
        due = new Date(vencimiento.seconds * 1000);
      } else if (vencimiento instanceof Date) {
        due = vencimiento;
      } else {
        due = new Date(vencimiento);
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      due.setHours(0, 0, 0, 0);
      
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    // Format date
    function formatDate(timestamp) {
      if (!timestamp) return 'Fecha no disponible';
      
      let date;
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        date = new Date(timestamp);
      }
      
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    // Return book
    window.returnBook = async function(loanId, bookId) {
      if (confirm('¿Estás seguro de que deseas devolver este libro?')) {
        try {
          await updateDoc(doc(db, "prestamos", loanId), {
            estado: "devuelto",
            fechaDevolucion: serverTimestamp()
          });
          
          await updateDoc(doc(db, "libros", bookId), { disponible: true });
          
          showNotification('Libro devuelto exitosamente', 'success');
          
          await loadBooks();
          await loadLoans();
        } catch (error) {
          console.error('Error returning book:', error);
          showNotification('Error al devolver el libro', 'error');
        }
      }
    };

    // Renew loan
    window.renewLoan = async function(loanId) {
      try {
        const loan = userLoans.find(l => l.id === loanId);
        if (!loan) return;
        
        if (loan.renovaciones >= 2) {
          showNotification('Has alcanzado el límite de renovaciones', 'warning');
          return;
        }
        
        const newDueDate = new Date();
        if (loan.fechaVencimiento.toDate) {
          newDueDate.setTime(loan.fechaVencimiento.toDate().getTime());
        } else if (loan.fechaVencimiento.seconds) {
          newDueDate.setTime(loan.fechaVencimiento.seconds * 1000);
        } else {
          newDueDate.setTime(new Date(loan.fechaVencimiento).getTime());
        }
        newDueDate.setDate(newDueDate.getDate() + 7); // Add 7 days
        
        await updateDoc(doc(db, "prestamos", loanId), {
          fechaVencimiento: newDueDate,
          renovaciones: loan.renovaciones + 1
        });
        
        showNotification('Préstamo renovado por 7 días adicionales', 'success');
        await loadLoans();
      } catch (error) {
        console.error('Error renewing loan:', error);
        showNotification('Error al renovar el préstamo', 'error');
      }
    };

    // Search and filter
    elements.searchBtn.addEventListener('click', filterBooks);
    elements.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') filterBooks();
    });
    elements.categoryFilter.addEventListener('change', filterBooks);

    function filterBooks() {
      const searchTerm = elements.searchInput.value.toLowerCase().trim();
      const category = elements.categoryFilter.value;
      
      let filtered = books;
      
      if (searchTerm) {
        filtered = filtered.filter(book => 
          book.titulo.toLowerCase().includes(searchTerm) ||
          book.autor.toLowerCase().includes(searchTerm) ||
          (book.isbn && book.isbn.toLowerCase().includes(searchTerm))
        );
      }
      
      if (category) {
        filtered = filtered.filter(book => book.categoria === category);
      }
      
      displayBooks(filtered);
      updateActiveFilters(searchTerm, category);
    }

    function updateActiveFilters(search, category) {
      elements.activeFilters.innerHTML = '';
      const filters = [];
      
      if (search) {
        filters.push(`Búsqueda: "${search}"`);
      }
      
      if (category) {
        const categoryText = elements.categoryFilter.options[elements.categoryFilter.selectedIndex].text;
        filters.push(`Categoría: ${categoryText}`);
      }
      
      if (filters.length > 0) {
        elements.activeFilters.classList.remove('hidden');
        filters.forEach(filter => {
          const chip = document.createElement('span');
          chip.className = 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium';
          chip.innerHTML = `
            ${filter}
            <button onclick="clearFilters()" class="ml-2 hover:text-purple-900">
              <i class="fas fa-times"></i>
            </button>
          `;
          elements.activeFilters.appendChild(chip);
        });
      } else {
        elements.activeFilters.classList.add('hidden');
      }
    }

    window.clearFilters = function() {
      elements.searchInput.value = '';
      elements.categoryFilter.value = '';
      filterBooks();
    };

    // Initialize charts
    async function initCharts() {
      // Monthly chart
      const monthlyCtx = document.getElementById('monthlyChart');
      if (monthlyCtx && Chart.getChart(monthlyCtx)) {
        Chart.getChart(monthlyCtx).destroy();
      }
      
      if (monthlyCtx) {
        new Chart(monthlyCtx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Préstamos',
              data: [12, 19, 15, 25, 22, 30],
              borderColor: 'rgb(102, 126, 234)',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false }
            }
          }
        });
      }
      
      // Category chart
      const categoryCtx = document.getElementById('categoryChart');
      if (categoryCtx && Chart.getChart(categoryCtx)) {
        Chart.getChart(categoryCtx).destroy();
      }
      
      if (categoryCtx) {
        const categoryCount = {};
        books.forEach(book => {
          categoryCount[book.categoria] = (categoryCount[book.categoria] || 0) + 1;
        });
        
        new Chart(categoryCtx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(categoryCount),
            datasets: [{
              data: Object.values(categoryCount),
              backgroundColor: [
                'rgba(102, 126, 234, 0.8)',
                'rgba(72, 187, 120, 0.8)',
                'rgba(246, 173, 85, 0.8)',
                'rgba(237, 100, 166, 0.8)',
                'rgba(160, 174, 192, 0.8)',
                'rgba(252, 129, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
      }
      
      // Top books
      const topBooks = books
        .sort((a, b) => (b.vecesPrestado || 0) - (a.vecesPrestado || 0))
        .slice(0, 5);
      
      elements.topBooks.innerHTML = topBooks.map((book, index) => `
        <div class="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <div class="flex items-center space-x-3">
            <span class="text-2xl font-bold text-purple-600">#${index + 1}</span>
            <div>
              <p class="font-semibold">${book.titulo}</p>
              <p class="text-sm opacity-70">${book.autor}</p>
            </div>
          </div>
          <span class="text-sm font-medium">${book.vecesPrestado || 0} préstamos</span>
        </div>
      `).join('');
    }

    // Auth functions
    const ALLOWED_DOMAIN = '@ieluiscarloslopez.edu.co';
    
    function isValidInstitutionalEmail(email) {
      return email.toLowerCase().endsWith(ALLOWED_DOMAIN.toLowerCase());
    }

    // Auth form submission
    elements.authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = elements.email.value.trim();
      const password = elements.password.value;
      
      if (!email || !password) {
        showAuthError('Por favor completa todos los campos');
        return;
      }
      
      if (!isValidInstitutionalEmail(email)) {
        showAuthError(`Solo se permiten correos institucionales ${ALLOWED_DOMAIN}`);
        return;
      }
      
      try {
        if (isLoginMode) {
          await signInWithEmailAndPassword(auth, email, password);
          showNotification('¡Bienvenido de nuevo!', 'success');
        } else {
          const fullName = elements.fullName.value.trim();
          const confirmPassword = elements.confirmPassword.value;
          
          if (!fullName) {
            showAuthError('Por favor ingresa tu nombre completo');
            return;
          }
          
          if (password !== confirmPassword) {
            showAuthError('Las contraseñas no coinciden');
            return;
          }
          
          if (password.length < 6) {
            showAuthError('La contraseña debe tener al menos 6 caracteres');
            return;
          }
          
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(userCredential.user, { displayName: fullName });
          
          showNotification('¡Cuenta creada exitosamente!', 'success');
        }
        
        elements.authModal.classList.add('hidden');
        clearAuthForm();
      } catch (error) {
        showAuthError(getAuthErrorMessage(error));
      }
    });

    function showAuthError(message) {
      elements.authError.textContent = message;
      elements.authError.classList.remove('hidden');
      setTimeout(() => elements.authError.classList.add('hidden'), 5000);
    }

    function clearAuthForm() {
      elements.authForm.reset();
      elements.authError.classList.add('hidden');
    }

    function getAuthErrorMessage(error) {
      const errorMessages = {
        'auth/user-not-found': `No existe una cuenta con este correo. Verifica que sea un correo ${ALLOWED_DOMAIN}`,
        'auth/wrong-password': 'Contraseña incorrecta',
        'auth/email-already-in-use': 'Este correo ya está registrado',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
        'auth/invalid-email': 'El correo electrónico no es válido',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde'
      };
      
      return errorMessages[error.code] || 'Error desconocido. Intenta nuevamente.';
    }

    // Toggle login/register
    elements.authToggleBtn.addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      
      if (isLoginMode) {
        elements.authTitle.textContent = 'Iniciar Sesión';
        elements.authSubtitle.textContent = 'Accede a la biblioteca digital';
        elements.authSubmitBtn.textContent = 'Iniciar Sesión';
        elements.authToggleBtn.textContent = '¿No tienes cuenta? Regístrate';
        elements.nameField.classList.add('hidden');
        elements.confirmPasswordField.classList.add('hidden');
      } else {
        elements.authTitle.textContent = 'Crear Cuenta';
        elements.authSubtitle.textContent = 'Únete a la biblioteca digital';
        elements.authSubmitBtn.textContent = 'Registrarse';
        elements.authToggleBtn.textContent = '¿Ya tienes cuenta? Inicia sesión';
        elements.nameField.classList.remove('hidden');
        elements.confirmPasswordField.classList.remove('hidden');
      }
      
      clearAuthForm();
    });

    // Password visibility toggle
    elements.togglePassword.addEventListener('click', () => {
      const type = elements.password.type === 'password' ? 'text' : 'password';
      elements.password.type = type;
      elements.confirmPassword.type = type;
      elements.togglePassword.innerHTML = `<i class="fas fa-eye${type === 'password' ? '' : '-slash'}"></i>`;
    });

    // Auth state observer
    onAuthStateChanged(auth, async (user) => {
      currentUser = user;
      
      if (user) {
        elements.loginBtn.classList.add('hidden');
        elements.userMenu.classList.remove('hidden');
        
        const displayName = user.displayName || user.email.split('@')[0];
        elements.userEmail.textContent = displayName;
        elements.dropdownName.textContent = displayName;
        elements.dropdownEmail.textContent = user.email;
        
        await loadLoans();
      } else {
        elements.loginBtn.classList.remove('hidden');
        elements.userMenu.classList.add('hidden');
        userLoans = [];
      }
      
      updateDashboardStats();
    });

    // Event listeners
    elements.loginBtn.addEventListener('click', () => {
      elements.authModal.classList.remove('hidden');
    });

    elements.authCancelBtn.addEventListener('click', () => {
      elements.authModal.classList.add('hidden');
      clearAuthForm();
    });

    elements.logoutBtn.addEventListener('click', async () => {
      await signOut(auth);
      showNotification('Sesión cerrada exitosamente', 'info');
      window.location.reload();
    });

    elements.userMenuBtn.addEventListener('click', () => {
      elements.userDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!elements.userMenu.contains(e.target)) {
        elements.userDropdown.classList.add('hidden');
      }
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
      if (e.target === elements.authModal) {
        elements.authModal.classList.add('hidden');
        clearAuthForm();
      }
      if (e.target === elements.bookModal) {
        elements.bookModal.classList.add('hidden');
      }
    });

    // Profile and history buttons
    elements.profileBtn.addEventListener('click', () => {
      showNotification('Perfil en construcción', 'info');
      elements.userDropdown.classList.add('hidden');
    });

    elements.historyBtn.addEventListener('click', () => {
      showNotification('Historial en construcción', 'info');
      elements.userDropdown.classList.add('hidden');
    });

    // Notification button
    elements.notificationBtn.addEventListener('click', () => {
      if (userLoans.length > 0) {
        document.querySelector('[data-tab="loans"]').click();
      } else {
        showNotification('No tienes notificaciones pendientes', 'info');
      }
    });

    // Initialize app
    async function init() {
      console.log('Inicializando Lectorium...');
      await loadBooks();
      
      if (currentUser) {
        await loadLoans();
      }
      
      console.log('Lectorium iniciado correctamente');
    }

    init();
