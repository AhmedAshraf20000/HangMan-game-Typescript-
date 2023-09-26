"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let topicSpan = document.querySelector("#topic span");
let lettersContainer = document.getElementById("letters-container");
let lettersSpans = document.getElementById("letters-spans");
let bar = document.getElementById("bar");
let topase = document.getElementById("top-base");
let ropeHolder = document.getElementById("rope-holder");
let rope = document.getElementById("rope");
let head = document.getElementById("head");
let body = document.getElementById("body");
let hands = [document.getElementById("first-hand"), document.getElementById("second-hand")];
let legs = [document.getElementById("first-leg"), document.getElementById("second-leg")];
let btn1 = document.querySelector("#success button");
let btn2 = document.querySelector("#fail button");
let success = document.getElementById("success");
let fail = document.getElementById("fail");
var lettersContainerSpans;
var randomWord = "";
let randomTopic;
let letters = "abcdefghijklmnopqrstuvwxyz";
var clickedLetter = "";
let found = false;
let wrong = 0;
let right = 0;
btn1.onclick = () => location.reload();
btn2.onclick = () => location.reload();
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resp = yield (yield fetch("../topics.json")).json();
            let topics = yield resp.topics;
            randomTopic = topics[Math.floor(Math.random() * topics.length)];
            let name = randomTopic.name;
            let randomWordArr = randomTopic.words;
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
                    if (!randomWord.includes(clickedLetter))
                        wrong++;
                    else {
                        for (let i = 0; i < randomWord.length; i++) {
                            if (clickedLetter === randomWord[i]) {
                                lettersContainerSpans[i].innerHTML = clickedLetter;
                                right++;
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
                };
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
getData();
