const fileInput = document.getElementById('file-input');
const submitBtn = document.getElementById('submit-btn');
const output = document.getElementById('output');

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const text = reader.result;
    const words = text.split(/\s+/);
    const anagrams = findAnagrams(words);
    const palindromes = findPalindromes(words);
    displayOutput(anagrams, palindromes);
  };
});

function findAnagrams(words) {
  const groups = {};
  words.forEach((word) => {
    const key = word.split('').sort().join('');
    if (groups[key]) {
      groups[key].push(word);
    } else {
      groups[key] = [word];
    }
  });
  const anagrams = [];
  for (const key in groups) {
    if (groups[key].length > 1) {
      anagrams.push(groups[key]);
    }
  }
  return anagrams;
}

function findPalindromes(words) {
  const palindromes = words.filter((word) => {
    return word.split('').reverse().join('') === word;
  });
  return palindromes;
}

function displayOutput(anagrams, palindromes) {
  let outputHtml = '';
  if (anagrams.length > 0) {
    outputHtml += '<h2>Anagramas:</h2>';
    anagrams.forEach((group) => {
      outputHtml += '<p>' + group.join(', ') + '</p>';
    });
  }
  if (palindromes.length > 0) {
    outputHtml += '<h2>Palindromos:</h2>';
    outputHtml += '<p>' + palindromes.join(', ') + '</p>';
  }
  if (outputHtml === '') {
    outputHtml = '<p>No hay anagramas ni palindromos.</p>';
  }
  output.innerHTML = outputHtml;
}
