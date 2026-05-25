class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(fixState) {
    if (fixState < 0) {
        this._state = 0;
    } else if (fixState > 100) {
      this._state = 100;
    } else {
      this._state = fixState;
    }
  }

  get state() {
    return this._state;
  }
}

const sherlock = new PrintEditionItem(
  "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе", 2019, 1008
);

console.log(sherlock.releaseDate); //2019
console.log(sherlock.state); //100
sherlock.fix();
console.log(sherlock.state); //100

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

const picknick = new FantasticBook(
  "Аркадий и Борис Стругацкие",
  "Пикник на обочине",
  1972,
  168
);

console.log(picknick.author); //"Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); //10
picknick.fix();

class Library {
  constructor(name, books) {
    this.name = name;
    this.books = [];
  }
  
  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const searchBook = this.books.find(book => book[type] === value);
    return searchBook || null;
  }

  giveBookByName(bookName) {
    const searchBookByName = this.books.findIndex(book => book.name === bookName);
    if (searchBookByName !== -1) {
      const foundBook = this.books[searchBookByName];
      this.books.splice(searchBookByName, 1);
      return foundBook;
    }

    return null;
  }
}

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));
library.addBook(new Magazine("Юность", 1955, 100)); // Добавил журнал "Юность"
library.addBook(new Book ("Скотак А.", "Гимнастические игры", 1919, 180)); // Добавил книгу 1919 года

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"
console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4

library.giveBookByName("Машина времени");
library.giveBookByName("Мурзилка"); // Забрал еще одну книгу
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 2

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark >= 2 && mark <= 5) {
      if (!this.marks[subject]) {
        this.marks[subject] = [];
      }
      this.marks[subject].push(mark);
    }
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject] || this.marks[subject].length === 0) return 0;
    
    const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    if (subjects.length === 0) return 0;

    const sumOfAverage = subjects.reduce((sum, subject) => {
      return sum + this.getAverageBySubject(subject);
    }, 0);

    return (sumOfAverage / subjects.length).toFixed(2);
  }
}

const student = new Student("Олег Никифоров");
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(3, "биология");
student.addMark(1, "география"); // Оценка не добавится, так как меньше 2
student.addMark(6, "физика"); // Оценка не добавится, так как больше 5

console.log(student);
console.log("Средний балл по предмету химия: ", student.getAverageBySubject("химия")); // 5
console.log("Средний балл по предмету физика: ", student.getAverageBySubject("физика")); // 4.5
console.log("Средний балл по предмету биология: ", student.getAverageBySubject("биология")); // 3
console.log("Средний балл по предметам: ", student.getAverage()); // 4.75