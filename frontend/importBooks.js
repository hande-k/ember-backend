import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const imagesPath = '/home/seymen/repos/github.com/sisiliu10/m-8006/public/lovable-uploads';
const chaptersPath = '/home/seymen/repos/github.com/sisiliu10/ember-hackathon/src/content/arcane-bonds/chapters';

const apiUrl = 'http://localhost:8080/api/book';

// ⚠ WICHTIG: Deinen JWT Token hier einsetzen:
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZXd1c2VyIiwiaWF0IjoxNzQ5OTMzMTYzLCJleHAiOjE3NTAwMTk1NjN9.8HrCQ-_grsSC3LF20gemTZulUIxQV5b-gTsjek3lul8';

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function deleteAllBooks() {
  const booksRes = await fetch(`${apiUrl}/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const books = await booksRes.json();

  for (let book of books) {
    await fetch(`${apiUrl}/delete/${book.bookId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`Deleted book ${book.bookId}`);
  }
}

async function createBooks() {
  const imageFiles = fs.readdirSync(imagesPath).filter(f => f.endsWith('.png'));
  const chapterFiles = fs.readdirSync(chaptersPath).filter(f => f.endsWith('.tsx') && !f.includes('DE'));

  for (let i = 0; i < chapterFiles.length; i++) {
    const chapterFile = chapterFiles[i];
    const rawContent = fs.readFileSync(path.join(chaptersPath, chapterFile), 'utf-8');

    // Entferne JSX/HTML Tags, Imports, geschweifte Klammern
    const chapterContent = rawContent
    const imageFile = getRandomElement(imageFiles);

    const newBook = {
      title: `Test Book ${i + 1}`,
      author: 'MVP Bot',
      content: chapterContent.substring(0, 1000), // wir nehmen nur die ersten 500 Zeichen
      coverUrl: `/lovable-uploads/${imageFile}`
    };

    const res = await fetch(`${apiUrl}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newBook)
    });

    if (res.ok) {
      console.log(`Created book ${newBook.title}`);
    } else {
      console.error('Error creating book:', await res.text());
    }
  }
}

async function run() {
  await deleteAllBooks();
  await createBooks();
}

run();
