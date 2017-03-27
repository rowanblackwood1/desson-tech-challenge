$(function() {
    var hours = minutes = seconds = milliseconds = 0;

    // Set the variables for when the stopwatch is paused
    var savedHours = savedMinutes = savedSeconds = savedMilliseconds = undefined;

    var timeUpdate;

    // Start the timer
    $(".start-stop-resume").click(function() {
        if ($(this).text() == "Start") {
            $(this).text("Stop").addClass("stop"); // When start button is clicked, change button text to stop
            updateTime(0, 0, 0, 0);
        }

        // Stop the timer
        else if ($(this).text() == "Stop") {
            clearInterval(timeUpdate); // Stop the stopwatch
            $(this).text("Resume").removeClass("stop"); // When stop button is clicked change the button text to resume
        }

        //Resume the timer
        else if ($(this).text() == "Resume") {
            updateTime(savedHours, savedMinutes, savedSeconds, savedMilliseconds);
            $(this).text("Stop").addClass("stop");
        }
    });

    // Reset the timer
    $(".reset").click(function() {
        if (timeUpdate) clearInterval(timeUpdate);
        setStopwatch(0, 0, 0, 0);
        if ($(".start-stop-resume").text() == "Resume" || "Stop") {
            $(".start-stop-resume").text("Start").removeClass("stop"); // When the reset button is clicked change the stop / resume text to start
        }
    });

    // Set the time
    function updateTime(savedHours, savedMinutes, savedSeconds, savedMilliseconds) {
        var startTime = new Date();

        // Set the interval
        timeUpdate = setInterval(function() {
            var timeElapsed = new Date().getTime() - startTime.getTime();

            // Calculate hours, mins, secs, millisecs
            hours = parseInt(timeElapsed / 1000 / 60 / 60) + savedHours;
            if (hours > 60) hours %= 60;
            minutes = parseInt(timeElapsed / 1000 / 60) + savedMinutes;
            if (minutes > 60) minutes %= 60;
            seconds = parseInt(timeElapsed / 1000) + savedSeconds;
            if (seconds > 60) seconds %= 60;
            milliseconds = timeElapsed + savedMilliseconds;
            if (milliseconds > 1000) milliseconds %= 1000;
            setStopwatch(hours, minutes, seconds, milliseconds);
        }, 1);
    }

    // Display the timer on the screen
    function setStopwatch(h, m, s, ms) {

        // Preserve true millisecond number for accuracy prior to slicing the digits to display on the dom
        savedHours = h;
        savedMinutes = m;
        savedSeconds = s;
        savedMilliseconds = ms;

        // Slice milliseconds to two digits so it displays as two digits in the dom
        ms = ms.toString();
        ms = ms.slice(0, 2);
        ms = parseInt(ms);

        // Print sliced version of time to the screen
        $(".hours").text(prependZero(h, 2));
        $(".minutes").text(prependZero(m, 2));
        $(".seconds").text(prependZero(s, 2));
        $(".milliseconds").text(prependZero(ms, 2));
    }

    // If less than two digits add zero to the number
    function prependZero(time, length) {
        time = String(time);
        return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
    }
});