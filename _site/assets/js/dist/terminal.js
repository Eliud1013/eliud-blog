const commandElement = document.getElementById("command");
const decryptionElement = document.getElementById("decryption");
const passwordElement = document.getElementById("password");
const messageElement = document.getElementById("message");
// Ocultar cursor del mensaje
const file_id = (length = 8) =>
  Array.from(crypto.getRandomValues(new Uint8Array(length)), (byte) =>
    byte.toString(16).padStart(2, "0")
  )
    .join("")
    .substr(0, length);

const commandText = [
  { text: "ccat ", class: "" }, // Default yellow text
  { text: "-c", class: "green" }, // Green '-c'
  { text: " ", class: "" }, // Space
  { text: `/tmp/message_${file_id()}.cpt`, class: "red" } // Red './message.txt'
];

const passwordText = "***************"; // Simulate a password with asterisks
const messageText =
  "\nHello from Sonora Mexico!\nMy name is Eliud Gaxiola. I’m in my 7th semester of Software Engineering at ITSON, close to graduating. Right now, I’m focusing on cybersecurity through self-study and participating in Capture The Flag (CTF) challenges on platforms like HackTheBox and TryHackMe.\nI’ve got a good grasp of the software development lifecycle, including programming, database management, and cybersecurity basics. I’m also familiar with networking and operating systems like Linux and Windows, which helps me handle various tech challenges";
let commandIndex = 0;
let charIndex = 0;

function typeCommand() {
  if (commandIndex < commandText.length) {
    const currentPart = commandText[commandIndex];
    const span = document.createElement("span");
    span.className = currentPart.class;
    span.textContent = currentPart.text.charAt(charIndex);
    commandElement.appendChild(span);

    charIndex++;
    if (charIndex >= currentPart.text.length) {
      commandIndex++;
      charIndex = 0;
    }
    const type_delay = Math.floor(Math.random() * (110 - 20 + 1)) + 50;

    setTimeout(typeCommand, type_delay);
  } else {
    setTimeout(typeDecryptionKey, 500); // After command is typed, show decryption key
  }
}
// Ocultar cursor del mensaje

function typeDecryptionKey() {
  const command_cursor = document.getElementById("cursor_command");
  command_cursor.style.display = "none"; // Hide cursor after password is typed

  decryptionElement.style.display = "inline";

  setTimeout(() => {
    typePassword();
  }, 300);
}

function typePassword() {
  let index = 0;
  passwordElement.style.display = "inline";

  function writePassword() {
    if (index < passwordText.length) {
      passwordElement.textContent += passwordText.charAt(index);
      index++;
      const type_delay = Math.floor(Math.random() * (90 - 20 + 1)) + 50;
      setTimeout(writePassword, type_delay); // Simulate slower typing for password
    } else {
      typeMessagev1(); // After password is typed, show the final message
    }
  }

  writePassword();
}

function typeMessagev1() {
  /* Br is not working
  for (let i = 0; i < messageText.length; i++) {
    if (messageText.charAt(i) === "\n") {
      console.log("Line feed");
      messageElement.innerHTML += "<br>";
    } else {
      messageElement.innerHTML += messageText.charAt(i);
    }
  }
    */
  messageElement.textContent += messageText; // Show the full message
  downloadButton.style.display = "inline-block"; // Show the download button
}
// Letra por letra
function typeMessagev2() {
  let index = 0;
  messageElement.textContent = ""; // Clear the message element

  function writeMessage() {
    if (index < messageText.length) {
      if (messageText.charAt(index) === "\n") {
        messageElement.innerHTML += "<br>";
      } else {
        messageElement.innerHTML += messageText.charAt(index);
      }
      index++;
      setTimeout(writeMessage, 10); // Simulate typing the final message with the cursor
    }
  }

  writeMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    typeCommand();
  }, 2000); // Retraso de 2000 ms (2 segundos)
});
