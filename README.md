# v2eksamen

--- Credentials ---

name: TheHoffs

Password: 0000Hoff




<h2>Write message</h2>
<form action="javascript:void(0)" id="chatForm">
  <input type="text" name="message" id="message">
  <input type="submit" value="Submit">
</form>
<h2>Here are the chatters</h2>
<div id="chatters"></div>
<h2>Here are the messages</h2>
<div id="messagesContainer"></div>

<form action="/logout" method="POST" >
  <button>Logout</button>
      </form>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <script src="server.js"></script>
    <script src="script.js"></script>
    <link rel="shortcut icon" href="WINE1.JPEG" type="image/x-icon">
    <title>TheHoffs live auction</title>
    <h1 id="overskrift2">
        Welcome to The Hoffs WineTalk
    </h1>
</head>
<body>

<hr>

<table>
  <tr>
    <th>The Session ends in</th>
    <th id="countDown"></th>
  </tr>
</table>
<hr>


  <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
  <script src="/socket.io/socket.io.js"></script>
</body>

<script>
const countDownDate = new Date("Feb 24, 2023 23:59:59").getTime(); // Set the date we're counting down to
  
const x = setInterval(() => {// Update the count down every 1 second

const now = new Date().getTime(); // Get today's date and time
      
var distanse = countDownDate - now;// Find the distance between now and the count down date
      
// Time calculations for days, hours, minutes and seconds
let days = Math.floor(distanse / (1000 * 60 * 60 * 24));
let hours = Math.floor((distanse % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((distanse % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((distanse % (1000 * 60)) / 1000);
  
// Output the result in an element with id="demo"
document.getElementById("countDown").innerHTML = days + "d " + hours + "h "
+ minutes + "m " + seconds + "s ";
  
// If the count down is over, an alert will show
if (distanse < 0) {
  clearInterval(x);
  document.getElementById("countDown").innerHTML = alert("THE AUCTION IS OVER");
}
  }, 500);
  </script>

<style>

    #overskrift2 {
        text-align: center;
    };

#brukerNavnet {
  text-emphasis: rgb(49, 13, 13);
}

input {
   text-align: center;
    };
    ::-webkit-input-placeholder {
      text-align: center;
    };
    :-moz-placeholder {
      text-align: center;
    };

  #brukerNavnet {
font-size: 20px;
  };



</style>
</html>