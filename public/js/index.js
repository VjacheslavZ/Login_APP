// $("form").submit(function(e) {
//     e.preventDefault();
//
//     var registerForm = document.forms["registerForm"],
//         userName = registerForm.elements["userName"].value,
//         userPassword = registerForm.elements["userPassword"].value,
//         confirmPassword = registerForm.elements["confirmPassword"].value,
//         userEmail = registerForm.elements["userEmail"].value;
//
//     $.ajax({
//         type: "POST",
//         url: "/register",
//         data: JSON.stringify({
//             userName: userName,
//             userPassword: userPassword,
//             confirmPassword: confirmPassword,
//             userEmail: userEmail
//         }),
//         dataType: "json",
//         contentType: "application/json",
//         success: function(data){
//             console.log(data);
//         },
//     });
// });