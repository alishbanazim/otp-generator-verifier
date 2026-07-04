let start = document.querySelector('.generator');
let otpScreen = document.querySelector('.verification');
let getOtp = document.querySelector('.getOtp');
let otpCode = document.querySelector('.otp');
let reSend = document.querySelector('.reSend');
let verify = document.querySelector('.verify');
let input = document.querySelector('.EnterOtp');
let timing = document.querySelector('.time');
let wrongAttempts = 0;

getOtp.addEventListener("click", () => {
    start.classList.add('hide');
    otpScreen.classList.remove('hide');
    otpCode.classList.remove('hide');
    generateOtp();
});
// OTP generation 
function generateOtp() {
     wrongAttempts = 0;
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * (10));
    }
    otpCode.innerHTML = `<h1>${otp}</h1>`;

    reSend.disabled = true;
    input.focus();
    timer();
}
// Tiemr
let time = 60;
let interval;
function timer() {
    clearInterval(interval);
    time = 60;
    timing.innerHTML = `Time remaining: 00:${String(time).padStart(2,'0')}`;
    interval = setInterval(() => {
        time--;
        timing.innerHTML = `Time remaining: 00:${String(time).padStart(2,'0')}s`;
        if (time === 0) {
            reSend.disabled = false;
            otpCode.innerHTML = `<h1>OTP Expired</h1>`;
            verify.disabled = true;
            clearInterval(interval);
            time = 60;
        }
    }, 1000);
}

// verify code 
verify.addEventListener('click', () => {
    let value = input.value;
  
    if (input.value.trim() === '') {
        input.focus();
        alert('Enter OTP');
        verify.disabled = false;
         reSend.disabled = true;
    }
   else if (value === otpCode.innerText) {
    verify.disabled = false;
     otpCode.innerHTML = `<h1>✔ OTP Verified</h1>`;
        clearInterval(interval);
        input.value = '';
        time = 60;
        timing.innerHTML = ` Time Remaining: 00:${String(time).padStart(2,'0')}s`;
        verify.disabled = true;
        reSend.disabled = false;

    }
    else {
         verify.disabled = false;
          input.focus();
           wrongAttempts++;
           attempts();
    }
      
})

// Limiting attempts
function attempts() {

    if (wrongAttempts < 3) {

        alert(`wrong otp \n\n${3 - wrongAttempts} attempts left`);

        return;
    }

   else{
     clearInterval(interval);
    verify.disabled = true;
    reSend.disabled = false;
    otpCode.innerHTML = "<h1>OTP Blocked</h1>";
    input.value = "";
    timing.innerHTML = "Time remaining: 00:00";
   }

}

// Resend otp 
reSend.addEventListener('click', () => {
    generateOtp();
     input.focus();
    verify.disabled = false;

});
// keyboard support
input.addEventListener('keydown',(e)=>{
if(e.key==='Enter'){
   verify.click();
}
})
