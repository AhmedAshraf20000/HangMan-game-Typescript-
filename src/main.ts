let topicSpan = <HTMLSpanElement>document.querySelector("#topic span");
let lettersContainer = <HTMLDivElement>document.getElementById("letters-container");
let lettersSpans = <HTMLDivElement>document.getElementById("letters-spans");
let bar = <HTMLDivElement>document.getElementById("bar");
let topase = <HTMLDivElement>document.getElementById("top-base");
let ropeHolder = <HTMLDivElement>document.getElementById("rope-holder");
let rope = <HTMLDivElement>document.getElementById("rope");
let head = <HTMLDivElement>document.getElementById("head");
let body = <HTMLDivElement>document.getElementById("body");
let hands = [<HTMLDivElement>document.getElementById("first-hand"), <HTMLDivElement>document.getElementById("second-hand")];
let legs = [<HTMLDivElement>document.getElementById("first-leg"), <HTMLDivElement>document.getElementById("second-leg")];
let btn1 = <HTMLButtonElement>document.querySelector("#success button");
let btn2 = <HTMLButtonElement>document.querySelector("#fail button");
let success = <HTMLDivElement>document.getElementById("success");
let fail = <HTMLDivElement>document.getElementById("fail");

var lettersContainerSpans: Element[];
var randomWord: string = "";
let randomTopic: any;
let letters: string = "abcdefghijklmnopqrstuvwxyz";
var clickedLetter: string = "";
let found: boolean = false;
let wrong: number = 0;
let right: number = 0;

btn1.onclick = () => location.reload();
btn2.onclick = () => location.reload();

async function drawHangman(): Promise<void> {
    try {
        let resp = await (await fetch("../src/topics.json")).json();
        let topics = await resp.topics;
        randomTopic = topics[Math.floor(Math.random() * topics.length)];
        let name = randomTopic.name;
        let randomWordArr: string[] = randomTopic.words;
        randomWord = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];
        topicSpan.innerHTML = name;
        let lettersArr = letters.split("");
        for (let i = 0; i < randomWord.length; i++) {
            let span = document.createElement("span");
            lettersSpans.appendChild(span);
        }
        lettersContainerSpans = Array.from(document.querySelectorAll("#letters-spans span"));
        for (let i = 0; i < lettersArr.length; i++) {
            let span = document.createElement("span");
            span.innerHTML = lettersArr[i];
            lettersContainer.appendChild(span);
            span.onclick = () => {
                span.classList.add("disabled");
                clickedLetter = span.innerHTML;
                if (!randomWord.includes(clickedLetter)) wrong++;
                else {
                    for (let i = 0; i < randomWord.length; i++) {
                        if (clickedLetter === randomWord[i]) {
                            lettersContainerSpans[i].innerHTML = clickedLetter;
                            right++
                            if (right === randomWord.length) {
                                lettersContainer.classList.add("pointer-events-none");
                                success.classList.remove("hidden");
                            }
                        }
                    }
                }
                switch (wrong) {
                    case 1:
                        {
                            bar.classList.remove("hidden");
                            break;
                        }
                    case 2:
                        {
                            topase.classList.remove("hidden");
                            break;
                        }
                    case 3:
                        {
                            ropeHolder.classList.remove("hidden");
                            break;
                        }
                    case 4:
                        {
                            rope.classList.remove("hidden");
                            break;
                        }
                    case 5:
                        {
                            head.classList.remove("hidden");
                            break;
                        }
                    case 6:
                        {
                            body.classList.remove("hidden");
                            break;
                        }
                    case 7:
                        {
                            hands[0].classList.remove("hidden");
                            hands[1].classList.remove("hidden");

                            break;
                        }
                    case 8:
                        {
                            legs[0].classList.remove("hidden");
                            legs[1].classList.remove("hidden");
                            lettersContainer.classList.add("pointer-events-none");
                            fail.classList.remove("hidden");
                            break;
                        }

                }
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

drawHangman();