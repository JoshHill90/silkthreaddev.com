const bubbleHolder = document.getElementById('circlesForbubbles');
const bubbleCounter = 25;
const bubbles = [];

for (let i = 0; i < bubbleCounter; i++) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  let size = Math.floor(Math.random() * (26 - 10 + 1) + 10);
  circle.style.height = `${size}px`;
  circle.style.width = `${size}px`;
  circle.style.left = `${Math.random() * (65 - 15 + 1) + 15}vw`;
  bubbleHolder.appendChild(circle);

  // Store bubble data
  bubbles.push({
    element: circle,
    position: {
      y: bubbleHolder.clientHeight
    },
    velocity: {
      y: Math.random() * -12 - 2 // Random upward velocity
    },
    size: size
  });
}

function animateBubbles() {
  bubbles.forEach(bubble => {
    // Update position

    bubble.position.y += bubble.velocity.y;

    // Update bubble element position

    bubble.element.style.top = `${bubble.position.y}px`;


    if (bubble.position.y + bubble.size < -500) {
      bubble.position.y = bubbleHolder.clientHeight;
    }

  });
  setTimeout(() => {
    requestAnimationFrame(animateBubbles);
  }, Math.floor(Math.random() * (50 - 20 + 1) + 20))
}

// Start animation
animateBubbles();

