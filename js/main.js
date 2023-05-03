import '../scss/main.scss'
const json = require('./testdata.json');

// HTML 요소와 배열 선언
const myDiv = document.getElementById("myDiv");
let clickTags = document.querySelectorAll('a.click-tag');

//태그 검색 범위 설정
const range = 15;

function setClickTags(nowSentenceIndex){
  clickTags = document.querySelectorAll('a.click-tag');

  clickTags.forEach(clickTag => {
    clickTag.addEventListener('click',
      function(event) {
        event.preventDefault(); // 이벤트의 기본 동작(페이지 이동)을 막음
        const text = this.innerText.trim(); // 클릭된 요소 내부의 텍스트 추출 및 공백 제거
        console.log(findObjectsWithTag(json, text, nowSentenceIndex, range)); // 추출한 텍스트 출력
    });
  });
}

function sliceIndex(nowIndex, indexRange, tagsGroup) {
  const startIndex = nowIndex; // 추출할 객체의 시작 인덱스
  const endIndex = startIndex + indexRange; // 시작 인덱스 + 범위 수
  const objectsInRange = tagsGroup.slice(startIndex, endIndex);
  console.log(objectsInRange);
}

// json 파일에서 tag를 인자로 받아 포함한 객체들을 반환.
function findObjectsWithTag(jsonObject, tagToFind, nowOrder, range) {
  let orderRange = nowOrder + range - 1;
  const objectsWithTag = [];
  for (let i = 0; i < jsonObject.story.length; i++) {
    const story = jsonObject.story[i];
    for (let j = 0; j < story.text.length; j++) {
      if(j > nowOrder && j < orderRange){
        const text = story.text[j];
        if (text.tag.includes(tagToFind)) {
          objectsWithTag.push(text);
        }
      }
    }
  }
  return objectsWithTag;
}

// json 파일에서 클릭한 문장의 같은 이야기의 다음 문장을 불러오는 코드
function findNextStory(nowStoryOrder, nowOrder) {
  const nextOrder = nowOrder + 1;
  const nextStory = json.story[nowStoryOrder].text[nextOrder];

  return nextStory;
}
console.log(findNextStory(0, 1).desc);

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
        const wrappedKeyword = `<a class="click-tag">${keyword}</a>`;
        wrappedText = wrappedText.split(keyword).join(wrappedKeyword);
      }
    });
  
    return wrappedText;
}

// 다음 할 일. 
// 자기 자신의 이야기 번호, 이야기 순서 확실하게, 시드를 따로 빼기.

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
  clickTag(){
    setClickTags(this.textOrderNum + 1, range);
  }
  clickNext(){
    findNextStory(this.textOrderNum, 1).desc;
  }
}

//0번째 이야기, 0번째 문장
let firstStory = new StoryText(0, 0);
firstStory.setSeed(0,50);
// firstStory.logTK();
firstStory.insertHtml();
firstStory.clickTag();

// console.log(findObjectsWithTag(json, "할아버지"));
// console.log(findObjectsWithTag(json, "돈"));
// console.log(findObjectsWithTag(json, "나무꾼"));
// console.log(findObjectsWithTag(json, "호랑이"));
// console.log(findObjectsWithTag(json, "마을"));
// console.log(findObjectsWithTag(json, "농부"));
// console.log(findObjectsWithTag(json, "집"));
// console.log(findObjectsWithTag(json, "도깨비"));
// console.log(findObjectsWithTag(json, "어머니"));
// console.log(findObjectsWithTag(json, "토끼"));

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