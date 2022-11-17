const canvas = document.getElementById('game');
/* поместил объект с id='game' в константу canvas */
const ctx = canvas.getContext('2d');
/* поместил в константу ctx контекст о том, что игра будет в 2d */

const bg = new Image();
/* поместил в константу bg экземпляр класса Image */
bg.src = 'img/bg.png';
/* для объекта bg указал свойство src с расположением файла фона */

const foodImg = new Image();
/* поместил в константу food экземпляр класса Image */
foodImg.src = 'img/food.png';
/* для объекта foodImg указал свойство src с расположением файла */

let box = 32;
/* в константу поместил число равное размеру квадрата на игровом поле */

let score = 0;
/* переменная для ведения счёта */

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box ,
    y: Math.floor(Math.random() * 15 + 3) * box
    /* создал объект со свойствами x u y в которые поместил рандомные числа. 17 и 15 это 
    количество квадратов на игровом поле по горизонтали и вертикали, box это размер одного 
    квадрата */
}

let snake = [];
snake[0]={
    x: 9 * box,
    y: 10 * box
    /* создал переменную snake и поместил в неё массив, затем в первый элемент массива поместил 
    объект в котором в свойствах указаны начальные точки отображения по х и у */
}

let dir;
/* переменная для хранения значений нажатия клавиш */

document.addEventListener('keydown', direction);
/* слушатель, который при нажатии клавиши на клавиатуре вызывает функцию direction */

function direction(event) {
    if(event.keyCode == 37 && dir != 'right'){
        dir = 'left'
    } else if(event.keyCode == 38 && dir != 'down'){
        dir = 'up'
    } else if(event.keyCode == 39 && dir != 'left'){
        dir = 'right'
    } else if(event.keyCode == 40 && dir != 'up'){
        dir = 'down'
    } else if(event.keyCode == 27){
        location.reload();
        /* если нажата клавиша esc то страница перезагружается */
    }
    /* функция получает от слушателя код клавиши и записывает в переменную dir значение 
    направления движения змейки */
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(game);
        }
    }
}
/* функция принимает координаты головы и тела змейки и если они совпадают, 
то отрисовка игры прекращается */

function drawGame(){
/* функция для отрисовки */
    ctx.drawImage(bg, 0 ,0);
    
    ctx.drawImage(foodImg, food.x, food.y);
    /* метод canvas в котором первый аргумент это рисуемый объект, а два других это начало 
    отрисовки по осям x y */

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.fillText(score, box*2.5, box*1.6);
    /* отрисовал текст включающий в себя переменную score */

    if(score >= 5 && score < 10){
        clearInterval(game);
        game = setInterval(drawGame, speed-50);
    } else if(score >= 10){
        clearInterval(game);
        game = setInterval(drawGame, speed-100);
    } 
    /* Усложнение игры - если счёт меньше 5, со скорость отрисовки 150мс, 
    если счёт 5-10, то 100мс, если счёт более 10, то 150мс */

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'red': 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        /* цикл перебирающий значения массива snake. fillStyle - заливка цветом. 
        fillRect(1,2,3,4) - создание квадрата, где 1,2 координаты, а 3,4 размер*/
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    /* создал переменные и записал туда первоначальные координаты змейки */

    if(snakeX == food.x && snakeY == food.y){
        score ++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box ,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        /* условный оператор if проверяет не совпадают ли координаты головы и еды, если да, 
        то добавляет очко в score и еду ставит в другое место, а если нет, то удаляет последний элемент массива snake*/
    } else {
        snake.pop();
        /* удаление последнего элемента массива snake */
    }

    if(snakeX < box || snakeX > box * 17 
        || snakeY < box*3 || snakeY > box * 17){
            clearInterval(game);
        }
    /* если координаты змейки выходят за границы поля, то отрисовка игры прекращается */    

    if(dir == 'left') snakeX -= 1 * box;
    if(dir == 'right') snakeX += 1 * box;
    if(dir == 'up') snakeY -= 1 * box;
    if(dir == 'down') snakeY += 1 * box;
    /* изменение переменных snakeX u snakeY в зависимости от значения переменной dir */

    let newHead = {
        x: snakeX,
        y: snakeY
        /* создал переменную, в которой находится объект с новыми координатами */
    }

    eatTail(newHead, snake);
    /* вызов функции, которая следит за тем, чтобы змейка не съела свой хвост */

    snake.unshift(newHead);
    /* добавил новые координаты в начало массива snake */
}

let speed = 150;
/* переменная в которой хранится скорость отрисовки в мс */

let game = setInterval(drawGame, speed);
/* в переменную game поместил функцию setInterval для отрисовки через каждые 100мс */