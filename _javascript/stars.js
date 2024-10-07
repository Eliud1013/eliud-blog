const numStars = 100;
const starField = document.createElement("div");
starField.className = "stars";
document.body.appendChild(starField);

for (let i = 0; i < numStars; i++) {
  const star = document.createElement("div");
  star.className = "star";

  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;

  const duration = Math.random() * 5 + 7;
  star.style.animationDuration = `${duration}s`;
  star.style.animationDuration = `0s`;

  const delay = Math.random() * 5;
  star.style.animationDelay = `${delay}s`;

  starField.appendChild(star);
}
