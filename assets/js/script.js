// animation for home page
const canvas = document.getElementById('homeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const triangles = [];

function getRandomPosition(maxX, maxY) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    return { x, y };
}

function createTriangle(size) {
    const position = getRandomPosition(canvas.width, canvas.height);
    const speed = { x: (Math.random() * 2 - 1) * 1.5, y: (Math.random() * 2 - 1) * 1.5 }; 
    const rotationSpeed = Math.random() * 0.02 - 0.01; 
    const rotationAngle = Math.random() * Math.PI * 2; 
    return {
        position,
        size,
        speed,
        rotationSpeed,
        rotationAngle
    };
}

for (let i = 0; i < 6; i++) {
    let size;
    if (i % 3 === 0) {
        size = 50;
    } else if (i % 3 === 1) {
        size = 75; 
    } else {
        size = 100; 
    }

    if (i < 3) {
        size *= 2;
    }

    triangles.push(createTriangle(size));
}

function drawTriangle(triangle) {
    const { position, size, rotationAngle } = triangle;
    const { x, y } = position;

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(rotationAngle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size / 2, -size);
    ctx.lineTo(size / 2, -size);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.restore();
}

function updateTrianglePosition(triangle) {
    const { position, speed, rotationSpeed } = triangle;
    position.x += speed.x;
    position.y += speed.y;

    triangle.rotationAngle += rotationSpeed;

    if (position.x > canvas.width) {
        position.x = 0;
    } else if (position.x < 0) {
        position.x = canvas.width;
    }
    if (position.y > canvas.height) {
        position.y = 0;
    } else if (position.y < 0) {
        position.y = canvas.height;
    }
}

function drawCircle(circle) {
    const { position, radius } = circle;
    const { x, y } = position;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function updateCirclePosition(circle) {
    const { position, speed } = circle;
    position.x += speed.x;
    position.y += speed.y;

    if (position.x > canvas.width + circle.radius) {
        position.x = -circle.radius;
    } else if (position.x < -circle.radius) {
        position.x = canvas.width + circle.radius;
    }
    if (position.y > canvas.height + circle.radius) {
        position.y = -circle.radius;
    } else if (position.y < -circle.radius) {
        position.y = canvas.height + circle.radius;
    }
}

const circle1 = {
    position: getRandomPosition(canvas.width, canvas.height),
    radius: 30,
    speed: { x: (Math.random() * 2 - 1) * 1.5, y: (Math.random() * 2 - 1) * 1.5 } 
};

const circle2 = {
    position: getRandomPosition(canvas.width, canvas.height),
    radius: circle1.radius * 1.75,
    speed: { x: (Math.random() * 2 - 1) * 1.5, y: (Math.random() * 2 - 1) * 1.5 } 
};

const circle3 = {
    position: getRandomPosition(canvas.width, canvas.height),
    radius: circle2.radius * 1.5,
    speed: { x: (Math.random() * 2 - 1) * 1.5, y: (Math.random() * 2 - 1) * 1.5 } 
};

const circle4 = {
    position: getRandomPosition(canvas.width, canvas.height),
    radius: circle2.radius * 1.5,
    speed: { x: (Math.random() * 2 - 1) * 1.5, y: (Math.random() * 2 - 1) * 1.5 }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    triangles.forEach(triangle => {
        updateTrianglePosition(triangle);
        drawTriangle(triangle);
    });

    updateCirclePosition(circle1);
    drawCircle(circle1);

    updateCirclePosition(circle2);
    drawCircle(circle2);

    updateCirclePosition(circle3);
    drawCircle(circle3);

    updateCirclePosition(circle4);
    drawCircle(circle4);

    requestAnimationFrame(draw);
}

draw();

// downloading resume pdf
function downloadPDF() {
    var pdfUrl = '../TaylorMartin-Resume-2024.pdf';
    var link = document.createElement('a');

    link.href = pdfUrl;
    link.download = 'TaylorMartin-Resume-2024.pdf';
    
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

