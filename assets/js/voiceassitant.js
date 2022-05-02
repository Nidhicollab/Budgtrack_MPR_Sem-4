const startBtn = document.createElement("button");
startBtn.innerHTML = "Start Listening";
const result = document.createElement("div");
const processing = document.createElement("p");
document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);
// speech to text
window.SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
let toggleBtn = null;
if (typeof window.SpeechRecog === "undefined") {
    startBtn.remove();
    result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
    const recognition = new window.SpeechRecog();
    recognition.continuous = true;

    recognition.onresult = event => {
        const last = event.results.length - 1;
        const res = event.results[last];
        const text = res[0].transcript.trim();
        if (res.isFinal) {
            processing.innerHTML = "processing ....";

            const response = process(text);
            const p = document.createElement("p");
            p.innerHTML = `You said: ${text} </br>Siri said: ${response}`;
            processing.innerHTML = "";
            result.appendChild(p);

            // read it out
            speechSynthesis.speak(new SpeechSynthesisUtterance(response));
        } else {
            processing.innerHTML = `listening: ${text}`;
        }
    }
    let listening = false;
    toggleBtn = () => {
        if (listening) {
            recognition.stop();
            startBtn.textContent = "Start Listening";
        } else {
            recognition.start();
            startBtn.textContent = "Stop Listening";
        }
        listening = !listening;
    };
    startBtn.addEventListener("click", toggleBtn);

}

function process(rawText) {
    const q = document.createElement("p");
    let text = rawText.replace(/\s/g, "");
    text = text.toLowerCase();
    let response = null;
    if (!text || text.length === 0) {
        response = "No voice commmand detected";
    }

    if (text.includes("username")) {
        response = `${rawText}`.split("is").pop();
    }

    if (text.includes("name")) {
        response = `${rawText}`.split("is").pop();
    }

    else if (text.includes("password")) {
        response = `${rawText}`.split("is").pop();
    }

    else if (text.includes("email")) {
        response = `${rawText}`.split("is").pop();
    }

    if (!response) {
        return `I don't understand. Please try again.`;
    }

    if (!text || text.length === 0) {
        response = "No voice commmand detected";
    }
    if (text.includes("login in") || text.includes("sign up")) {
        window.open('http://127.0.0.1:5500/signin.html')

    }

    return response;
}
