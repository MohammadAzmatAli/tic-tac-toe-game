let start_btn = document.getElementById('')
        let reset_btn = document.getElementById('new-game');
        let boxes = document.querySelectorAll(".box");
        let turnO = true; // Default turn is for 'O'.
        let count = 0;  // Checking how many boxes are input for checking if the match is draw.
        let winner;  // No one is winner at start.
        let winner_msg = document.getElementById('winner-msg');

        let mode_btn = document.getElementById('mode-change');
        
        let player1 = document.getElementById('P1');
        let player2 = document.getElementById('P2');
        
        // Function which adds the player names and starts the game.
        const start_game = () => {
            let p1 = document.getElementById("playerO").value;
            let p2 = document.getElementById("playerX").value;
            if(p1 === "" || p2 === ""){
                alert("Please enter player names...")
            }
            else{
                document.querySelector("#player1").innerText = p1.toUpperCase();
                document.querySelector("#player2").innerText = p2.toUpperCase();
                player2.style.opacity = 0.2;

                document.getElementById("player-form").style.display = 'none';
            }
        }

        // Winning patterns for all possible winning cases.
        let winning_pattern = [
            [0, 1, 2],
            [0, 3, 6], 
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ]
        
        // For input in the boxes.
        boxes.forEach((box) => {
            box.addEventListener('click', () => {
                if(turnO){
                    player1.style.opacity = 0.2;
                    player2.style.opacity = 1;
                    box.innerText = "O";
                    click_audio.play();
                    turnO = false;
                }
                else{
                    player2.style.opacity = 0.2;
                    player1.style.opacity = 1;
                    click_audio.play();
                    box.innerText = "X";
                    turnO = true;
                }
                box.disabled = true;
                check_winner();
                count++;
                if(count == 9){
                    winner_msg.innerHTML = "<h1>Match draw!!</h1>";
                    match_win_audio.play();
                    replay();
                }
            })
        })

        // Arrow function for creating a button to give replay option.
        const replay = () => {            
            winner_msg.style.display = 'flex';
            let replay_btn = document.createElement("button");
            replay_btn.innerText = "Replay";
            winner_msg.append(replay_btn);
            replay_btn.addEventListener('click', reset);
            replay_btn.addEventListener('click', () => {
                winner_msg.style.display = 'none'
            });
        }


        // Checking for for winner for each winning pattern.
        const check_winner = () => {
            for(let pattern of winning_pattern){
                let pos1 = boxes[pattern[0]].innerText;
                let pos2 = boxes[pattern[1]].innerText;
                let pos3 = boxes[pattern[2]].innerText;

                if(pos1 != "" && pos2 != "" && pos3 != ""){
                    if(pos1 === pos2 && pos2 === pos3){
                        console.log('Winner', pos1);
                        stop_after_win();
                        if(pos1 === "O"){
                            winner = 'player1';
                        }
                        else{
                            winner = 'player2';
                        }
                        console.log(winner);
                        winner_msg.innerHTML = "<h1>WINNER!!</h1><h1>"+document.getElementById(winner).innerText+"</h1>";
                        match_win_audio.play();
                        replay();
                    }
                }
            }
        };

        // For stopping the game after someone won the game.
        const stop_after_win = () => {
            boxes.forEach((box) => {
                box.disabled = true;
            })
        };

        
        // For resetting the game.
        const reset = () => {
            boxes.forEach((box) => {
                box.innerText = "";
                box.disabled = false;
            })
            turnO = true;
            count = 0;
            player2.style.opacity = 0.2;
            player1.style.opacity = 1;
        };

        // checking if new game button is clicked and resetting the game.
        reset_btn.addEventListener('click', reset);

        // Audio for click sound and match winning sound.
        const click_audio = new Audio();
        click_audio.src = "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav";
        const match_win_audio = new Audio();
        match_win_audio.src = "https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg";


        // Changing theme of the page.
        let current_mode = 'dark';
        document.getElementById('mode-change').innerHTML = "<i class='bx bx-sun'></i>";
        mode_btn.addEventListener('click', () => {
            if(current_mode === 'dark'){                
                document.body.classList.add('light-theme');
                document.getElementById('mode-change').innerHTML = "<i class='bx bx-moon'></i>";
                current_mode = 'light';
            }
            else{
                document.body.classList.remove('light-theme');
                document.getElementById('mode-change').innerHTML = "<i class='bx bx-sun'></i>";
                current_mode = 'dark';
            }
        })