$(document).ready(function () {
    $('.primary').click(function (event) {
        //event.preventDefault()
        console.log("clicked")

        var email = $('.email').val()
        var name = $('.name').val()
        var message = $('.message').val()

        if (email.length > 5 && email.includes('@') && email.includes('.')) {
            console.log("valid")
        }
        else {
            event.preventDefault()
            console.log("invalid email")
        }

        if (name.length > 2) {
            console.log("valid")
        }
        else {
            event.preventDefault()
        }

        if (message.length > 10) {
            console.log(valid)
        }
        else {
            event.preventDefault()
        }
    })
})