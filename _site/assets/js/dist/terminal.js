const command = "ccat -c ";
const file = "./message.cpt";
const message = `\nHi, I’m Eliud Gaxiola from Mexico.
I’m in my 7th semester of Software Engineering at ITSON, close to graduating.
Right now, I’m focusing on cybersecurity through self-study and participating in Capture The Flag (CTF) challenges on platforms like HackTheBox and TryHackMe.
I’ve got a good grasp of the software development lifecycle, including programming, database management, and cybersecurity basics.
I’m also familiar with networking and operating systems like Linux and Windows, which helps me handle various tech challenges.`;

const passwordPrompt = "Enter decryption key: ";
const simulatedPasswordLength = 12; // Number of asterisks to simulate

function typeText(element, text, speed, callback) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      if (text.charAt(i) === "\n") {
        element.innerHTML += "<br>"; // Insert a line break
      } else {
        element.innerHTML += text.charAt(i);
      }
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

function startTyping() {
  const commandContainer = document.getElementById("command");
  const fileContainer = document.getElementById("file");
  const textContainer = document.getElementById("text");
  const passwordPromptContainer = document.getElementById("passwordPrompt");
  const passwordContainer = document.getElementById("password");
  const downloadButton = document.getElementById("downloadButton");

  setTimeout(() => {
    // Type 'ccat -c'
    typeText(commandContainer, command, 50, () => {
      // Pause before typing './message.cpt'
      setTimeout(() => {
        typeText(fileContainer, file, 50, () => {
          // Pause before asking for password
          setTimeout(() => {
            typeText(passwordPromptContainer, passwordPrompt, 40, () => {
              // Simulate password entry
              setTimeout(() => {
                typeText(
                  passwordContainer,
                  "*".repeat(simulatedPasswordLength),
                  30,
                  () => {
                    // Show the text after password simulation
                    setTimeout(() => {
                      textContainer.style.display = "block"; // Show text
                      typeText(textContainer, message, 10, () => {
                        // Show download button after message
                        downloadButton.style.display = "inline-block";
                      }); // Type the message
                    }, 500); // Delay before showing the text
                  }
                );
              }, 500); // Delay before password simulation
            });
          }, 500); // Delay after './message.cpt' and before password prompt
        });
      }, 500); // Delay after 'ccat -c' and before './message.cpt'
    });
  }, 1000); // Initial delay before typing starts
}

window.onload = startTyping;
