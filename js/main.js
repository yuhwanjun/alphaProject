import '../scss/main.scss'
const json = require('./testdata.json');

// HTML 요소와 배열 선언
const myDiv = document.getElementById("myDiv");

//랜덤한 숫자를 반환하는 함수
let previousNumber = null;
function generateRandomNumber(minn, maxn) {
  const min = minn;
  const max = maxn;
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === previousNumber);
  previousNumber = randomNumber;
  return randomNumber;
}

//매개변수에 텍스트를 넣으면 p태그를 끼워 반환하는 코드
function renderParagraphs(text){
  return "<p>" + text + "</p>";
}

//문장에 지정한 키워드가 있으면 a태그로 감싸 문장으로 반환하는 코드
function wrapKeywordsWithATagAndStore(text, keywords) {
    let wrappedText = text;
  
    keywords.forEach((keyword) => {
      if (text.includes(keyword)) {
        const wrappedKeyword = `<a>${keyword}</a>`;
        wrappedText = wrappedText.split(keyword).join(wrappedKeyword);
      }
    });
  
    return wrappedText;
}

class StoryText {
  constructor(htmlOrderNum, textOrderNum) {
    this.htmlOrderNum = htmlOrderNum;
    this.textOrderNum = textOrderNum;
    this.seed = null;
    this.keywords = json.story[0].text[this.textOrderNum].tag;
    this.text = json.story[0].text[this.textOrderNum].desc;
    this.highlightedText = wrapKeywordsWithATagAndStore(this.text, this.keywords);
    this.showText = this.highlightedText;
  }
  logTK(){
    console.log(this.seed);
    console.log(this.text);
    console.log(this.keywords);
    console.log(this.highlightedText);
  }
  setSeed(min, max){
    this.seed = generateRandomNumber(min, max);
    this.keywords = json.story[this.seed].text[this.textOrderNum].tag;
    this.text = json.story[this.seed].text[this.textOrderNum].desc;
    this.highlightedText = wrapKeywordsWithATagAndStore(this.text, this.keywords);
    this.showText = this.highlightedText;
  }
  setShowText(){
    this.text = json.story[0].text[this.textOrderNum].desc;
    this.keywords = json.story[0].text[this.textOrderNum].tag;
  }
  disableHighlight(){
    this.showText = this.text;
  }
  insertHtml(){
    myDiv.innerHTML = renderParagraphs(this.showText)
  }
}

//0번째 이야기, 0번째 문장
let firstStory = new StoryText(0, 0);
firstStory.setSeed(0,2);
firstStory.logTK();
firstStory.insertHtml();

// firstStory.disableHighlight();
// firstStory.insertHtml();


// let testText = wrapKeywordsWithATagAndStore("옛날에 호랑이와 고양이가 살았어요.", ["호랑이","고양이"])
// console.log(testText)

//랜덤한 첫번째 문장 불러오기
// function start(){
//     const randomNum = generateRandomNumber(0, 2);
//     keywords = json.story[randomNum].text[0].tag;
//     defaultTextArr.push(json.story[randomNum].text[0].desc);
// }
// start();

// wrapKeywordsWithATagAndStore(defaultTextArr[0], keywords);
// mixedTextArr = defaultTextArr;
// mixedTextArr[0] = highlightedTextArr[0];
// renderParagraphs(mixedTextArr);
// show();

//새로운 문장 추가 후 보여주기
// function addParagraphs() {  
//     defaultTextArr.push(json.story[1].text[0].desc);
//     keywords = json.story[1].text[0].tag;

//     wrapKeywordsWithATagAndStore(defaultTextArr[1], keywords);
//     mixedTextArr[0] = defaultTextArr[0];
//     mixedTextArr[1] = highlightedTextArr[1];
//     renderParagraphs(mixedTextArr);
//     show();
// }
// addParagraphs();