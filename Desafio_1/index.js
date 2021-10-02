class User{
    constructor(name, surname, books, pets){
        this.name = name
        this.surname = surname
        this.books = books
        this.pets = pets
    }

    getFullName = () => `${this.name} ${this.surname}`

    addPets = (pet) => {
        this.pets.push(pet)
        return this.pets
    }

    countPets = () => {
         return this.pets.length
    }

    addBooks = (nameBook, author) => {
        let book = {}

        book.nameBook = nameBook
        book.author = author

        this.books.push(book)

        return book
    }

    getBooksName = () => {
        let array = this.books.map(b => b.nameBook);

        return array;
    }
}

//inicializamos objeto
var user = new User('Nicolas', 'Mendez', [], []);

//vemos nombre completo
console.log(user.getFullName());

//agregamos una mascota y mostramos info
console.log(user.addPets('Perro'));

//vemos la cantidad de mascotas
console.log(user.countPets());

//agregar libro y autor
console.log(user.addBooks('El senor de las mascotas', 'William Golding'))

//vemos la lista de solo libros
console.log(user.getBooksName())