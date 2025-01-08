// Navbar Button
const profileButton = document.querySelector("#profile-button");
const sideNav = document.querySelector("#side-nav");
const navCloseButton = document.querySelector("#nav-close-button");

profileButton.addEventListener("click", () => {
  sideNav.style.display = "block";
});

navCloseButton.addEventListener("click", () => {
  sideNav.style.display = "none";
});

  // Fungsi untuk mengambil data notes dari Local Storage
  function getNotes() {
    const notesStorage = localStorage.getItem('notes');
    if (notesStorage !== null) {
      return JSON.parse(notesStorage);
    } else {
      return [];
    }
  }

// Add Notes -------------------------------------------------------------------------------------------
const addNotesButton = document.querySelector('#addButton');
if(addNotesButton) {

  // Fungsi untuk menambahkan notes
  function addNotes() {
    const tittle = document.querySelector('input[name="tittle"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
    const pinned = false; // Defaultnya false
  
    // Buat objek notes
    const notes = {
      id: Date.now(),
      tittle: tittle,
      content: content,
      pinned: pinned
    };
  
    // Simpan notes ke Local Storage
    const notesStorage = localStorage.getItem('notes');
    if (notesStorage === null) {
      localStorage.setItem('notes', JSON.stringify([notes]));
    } else {
      const notesArray = JSON.parse(notesStorage);
      notesArray.push(notes);
      localStorage.setItem('notes', JSON.stringify(notesArray));
    }
  
    // Reset form
    document.querySelector('input[name="tittle"]').value = '';
    document.querySelector('textarea[name="content"]').value = '';
  }
  
  
  // Tambahkan event listener untuk tombol add notes
  addNotesButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNotes();
    window.location.href = 'main.html';
  });
}

// All Notes -------------------------------------------------------------------------------------------
const notesContainer = document.querySelector('#notes-container');
if(notesContainer) {

  function displayNotes() {
    const notes = getNotes();
  
    // Hapus isi notesContainer
    notesContainer.innerHTML = '';
  
    // Jika belum ada notes
    if (notes.length === 0) {
      const emptyNotesHTML = `
        <div class="w-full flex justify-center items-center">
          <div class="lg:w-3/4 flex flex-wrap">
            <div class="lg:w-1/2">
              <figure class="w-3/4 sm:w-4/5 mx-auto">
                <img src="/asset/note.png" class="w-full">
              </figure>
            </div>
            <div class="lg:w-1/2 flex justify-center items-center mx-auto">
              <h3 class="text-xl md:text-3xl text-center font-bold mt-4 lg:-mt-4 xl:-ml-24">You Don't Have Any <span class="text-main">Notes</span></h3>
            </div>
          </div>
        </div>
      `;
      notesContainer.innerHTML = emptyNotesHTML;
    } else {
      // Jika sudah ada notes
      notes.forEach((note) => {
        const noteHTML = `
          <div id="notes" data-noteId="${note.id}" class="bg-secondary w-72 sm:w-56 lg:w-72 max-h-52 min-h-56 rounded-2xl shadow hover:ring-1 ring-main transition duration-300">
            <div class="px-6">
              <div class="flex justify-between pt-4">
                <a href="viewNotes.html?id=${note.id}" class=" font-semibold bg-main px-4 py-1 rounded-full hover:bg-amber-500 transition duration-300">${note.tittle}</a>
                <div class="flex items-center gap-2 text-main text-xl">
                  <a href="" class="pinnedNotesButton bx bx-pin hover:text-amber-500 transition duration-300"></a>
                  <a href="updateNotes.html?id=${note.id}" class="bx bx-edit hover:text-amber-500 transition duration-300"></a>
                  <a href="" class="deleteNotesButton bx bx-trash hover:text-amber-500 transition duration-300"></a>
                </div>
              </div>
              <a href="viewNotes.html?id=${note.id}" class="block text-xl font-bold mt-4 truncate">${note.tittle}</a>
              <p class="mt-2 line-clamp-4">${note.content}</p>
            </div>
          </div>
        `;
        notesContainer.innerHTML += noteHTML;
      });
    }
  }
  
  // Tampilkan notes saat pertama kali load
  displayNotes();

  // Delete notes
  document.addEventListener("click", function(e) {
    if(e.target.classList.contains("deleteNotesButton")) {
      const noteId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-noteId');
      console.log(noteId)
      const notes = getNotes();
      const noteIndex = notes.findIndex((note) => note.id === parseInt(noteId));
      notes.splice(noteIndex, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    }
  });

  // Pinned notes
  document.addEventListener("click", function(e) {
    if(e.target.classList.contains("pinnedNotesButton")) {
      const noteId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-noteId');
      const notes = getNotes();
      const note = notes.find(n => n.id === parseInt(noteId));
      note.pinned = true;
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  });
}

// Pinned Notes -------------------------------------------------------------------------------------------
const pinnedNotesContainer = document.querySelector('#pinnedNotes-container');
if(pinnedNotesContainer) {
  function displayNotes() {
    const notes = getNotes();
    let isPinned = notes.some(note => note.pinned === true);
  
    // Hapus isi notesContainer
    pinnedNotesContainer.innerHTML = '';
  
    // Jika belum ada notes
    if (!isPinned) {
      const emptyNotesHTML = `
        <div class="w-full flex justify-center items-center">
          <div class="lg:w-3/4 flex flex-wrap">
            <div class="lg:w-1/2">
              <figure class="w-3/4 sm:w-4/5 mx-auto">
                <img src="/asset/note.png" class="w-full">
              </figure>
            </div>
            <div class="lg:w-1/2 flex justify-center items-center mx-auto">
              <h3 class="text-xl md:text-3xl text-center font-bold mt-4 lg:-mt-4 xl:-ml-24">You Don't Have Any <span class="text-main">Notes</span></h3>
            </div>
          </div>
        </div>
      `;
      pinnedNotesContainer.innerHTML = emptyNotesHTML;
    } else {
      notes.forEach((note) => {
        if(note.pinned==true) {
          const noteHTML = `
            <div id="notes" data-noteId="${note.id}" class="bg-secondary w-72 sm:w-56 lg:w-72 max-h-52 min-h-56 rounded-2xl shadow hover:ring-1 ring-main transition duration-300">
              <div class="px-6">
                <div class="flex justify-between pt-4">
                  <a href="viewNotes.html?id=${note.id}" class=" font-semibold bg-main px-4 py-1 rounded-full hover:bg-amber-500 transition duration-300">${note.tittle}</a>
                  <div class="flex items-center gap-2 text-main text-xl">
                    <a href="" class="unpinnedNotesButton bx bxs-pin hover:text-amber-500 transition duration-300"></a>
                    <a href="updateNotes.html?id=${note.id}" class="bx bx-edit hover:text-amber-500 transition duration-300"></a>
                    <a href="" class="deleteNotesButton bx bx-trash hover:text-amber-500 transition duration-300"></a>
                  </div>
                </div>
                <a href="viewNotes.html?id=${note.id}" class="block text-xl font-bold mt-4 truncate">${note.tittle}</a>
                <p class="mt-2 line-clamp-4">${note.content}</p>
              </div>
            </div>
          `;
          pinnedNotesContainer.innerHTML += noteHTML;
        }
      });
    }
  }

    // Delete notes
    document.addEventListener("click", function(e) {
      if(e.target.classList.contains("deleteNotesButton")) {
        const noteId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-noteId');
        console.log(noteId)
        const notes = getNotes();
        const noteIndex = notes.findIndex((note) => note.id === parseInt(noteId));
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
      }
    });
  
    // unpinned notes
    document.addEventListener("click", function(e) {
      if(e.target.classList.contains("unpinnedNotesButton")) {
        const noteId = e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-noteId');
        const notes = getNotes();
        const note = notes.find(n => n.id === parseInt(noteId));
        note.pinned = false;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
      }
    });
  
  // Tampilkan pinned notes saat pertama kali load
  displayNotes();
}

// View Notes -------------------------------------------------------------------------------------------
const ViewNotesContainer = document.querySelector('#viewNotes-container');
if(ViewNotesContainer) {
  function viewNote() {
    const noteId = new URLSearchParams(window.location.search).get('id');
    const notes = getNotes();
    const note = notes.find((note) => note.id === parseInt(noteId));

    if(note) {
      const noteHTML = `
      <div class="bg-secondary w-full lg:w-[800px] min-h-full rounded-2xl shadow hover:ring-1 ring-main transition duration-300">
        <div class="px-6">
          <div class="py-6">
            <a href="main.html" class="text-2xl font-semibold bg-main px-6 py-1 rounded-full hover:bg-amber-500 transition duration-300"><i class="bx bx-arrow-back"></i></a>
            <h2 class="mt-7 w-full bg-transparent text-2xl font-bold">${note.tittle}</h2>
            <p class="w-full min-h-80 bg-transparent text-xl font-semibold mt-4 pb-8">${note.content}</p>
          </div>
        </div>
      </div>
    `;
    ViewNotesContainer.innerHTML = noteHTML;
    }
  }

  if (window.location.pathname.endsWith('viewNotes.html')) {
    viewNote();
  }
}

// Edit Notes -------------------------------------------------------------------------------------------
const updateNotesContainer = document.querySelector('#updateNotes-container');
if(updateNotesContainer) {
  function updateNotesPage() {
    const noteId = new URLSearchParams(window.location.search).get('id');
    const notes = getNotes();
    const note = notes.find((note) => note.id === parseInt(noteId));

    if(note) {
      const noteHTML = 
      `
      <form action="main.html">
        <div class="bg-secondary w-full lg:w-[800px] min-h-full rounded-2xl shadow has-[:focus]:ring-1 ring-main transition duration-300">
          <div class="px-6">
            <div class="py-6">
              <a href="main.html" class="text-2xl font-semibold bg-main px-6 py-1 rounded-full hover:bg-amber-500 transition duration-300"><i class="bx bx-arrow-back"></i></a>
              <input autocomplete="off" type="text" name="tittle" placeholder="Tittle" class="block w-4/5 mt-7 bg-transparent text-2xl font-bold outline-none" value="${note.tittle}" required>

              <textarea name="content" class="block w-full h-80 bg-transparent outline-none text-xl font-semibold mt-4 pb-8 resize-none" placeholder="Content...">${note.content}</textarea>
              <button id="submitNotesButton" type="submit" class="mt-4 text-2xl font-semibold bg-main px-6 py-1 rounded-full active:bg-amber-500 transition duration-300">Update Notes</button>
            </div>
          </div>
        </div>
      </form>
      `
      updateNotesContainer.innerHTML = noteHTML;
    }
  }

  if (window.location.pathname.endsWith('updateNotes.html')) {
    updateNotesPage();
  }

  function updateNotes() {
    const newTittle = document.querySelector('input[name="tittle"]').value;
    const newContent = document.querySelector('textarea[name="content"]').value;
    const noteId = new URLSearchParams(window.location.search).get('id');
    const notes = getNotes();
    const note = notes.find((note) => note.id === parseInt(noteId));
    note.tittle = newTittle;
    note.content = newContent;
    localStorage.setItem('notes', JSON.stringify(notes));
  }

    // tombol update notes
    document.querySelector("#submitNotesButton").addEventListener("click", (e) => {
      e.preventDefault();
      updateNotes();
      window.location.href = 'main.html';
    });
}






