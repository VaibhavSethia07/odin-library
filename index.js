const table = document.querySelector('.books-table');
const tableBody = document.querySelector('tbody');
const addBtn = document.querySelector('.add-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const numberOfPagesInput = document.querySelector('#no-of-pages');
const readStatusInput = document.querySelectorAll('.read-status');
const submitBtn = document.querySelector('.submit-btn');
const localStorage = window.localStorage;
let odinLibrary = JSON.parse(localStorage.getItem("odinLibrary"));

renderTable();

function renderTable() {
    setOdinLibrary();
    showLibrary();
}

function setOdinLibrary() {
    if (odinLibrary === null) {
        odinLibrary = [];
    }
    localStorage.setItem("odinLibrary", JSON.stringify(odinLibrary));
}

function Book(title, author, noOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
}

function showLibrary() {
    tableBody.innerHTML = "";

    odinLibrary.forEach(book => {
        const htmlBook = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.noOfPages}</td>
                <td><button class='status-btn'>${book.readStatus}</button></td>
                <td><button class='remove-btn'>Delete</button></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('afterbegin', htmlBook);
    });
}
const addBookToLibrary = (book) => {
    odinLibrary.push(book);
    renderTable();
}

const findBookFromLibrary = (title) => {
    for (let book of odinLibrary) {
        if (book.title === title) {
            return odinLibrary.indexOf(book);
        }
    }

    return -1;
}

const deleteBookFromLibrary = (index) => {
    odinLibrary.splice(index, index + 1);
}

const changeReadStatus = (index) => {
    if (odinLibrary[index].readStatus === 'Read') {
        odinLibrary[index].readStatus = 'Unread';
    } else {
        odinLibrary[index].readStatus = 'Read';
    }
}

const toggleModal = () => {
    modal.classList.toggle('show-modal');
}

const windowOnClick = (event) => {
    if (event.target === modal) {
        toggleModal();
    }
}

const clearForm = () => {
    titleInput.value = "";
    authorInput.value = "";
    numberOfPagesInput.value = "";
    readStatusInput[0].checked = false;
    readStatusInput[1].checked = false;
}

const handleSubmit = (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const numberOfPages = numberOfPagesInput.value;
    let readStatus = "";

    if (readStatusInput[0].checked) {
        readStatus = 'Read';
    } else {
        readStatus = 'Unread';
    }


    if (title === "" || author === "" || numberOfPages === 0) {
        alert('Please fill all the fields');
        return;
    }

    const book = new Book(title, author, numberOfPages, readStatus);
    addBookToLibrary(book);

    clearForm();
}

table.addEventListener('click', (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];

    if (e.target.innerHTML === 'Delete') {
        deleteBookFromLibrary(findBookFromLibrary(currentTarget.innerHTML));
    }

    if (e.target.classList.contains('status-btn')) {
        changeReadStatus(findBookFromLibrary(currentTarget.innerHTML))
    }
    renderTable();
})

addBtn.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
closeBtn.addEventListener('click', toggleModal);
submitBtn.addEventListener('click', handleSubmit);

