window.addEventListener("load", () => {
  //fetch data from api on page load
  fetch("fandom.json")
    .then((response) => response.json())
    .then((data) => {
      //display that data on the webpage
      randomNumber = Math.floor(Math.random() * data.length);
      console.log("fandom 1 rand num: " + randomNumber);
      randomNumberTwo = Math.floor(Math.random() * data.length);
      console.log("fandom 2 random num: " + randomNumberTwo);

      //first fandom data name
      let fandomButtonOne = document.querySelector("#fandom_name");
      let fandomNameOne = data[randomNumber].name;
      fandomButtonOne.innerHTML = fandomNameOne;

      //set variables so fandom name can be split if it contains Real Person Fiction (RPF) so that the query only searches the fandom part of the name
      let substring = "*RPF";
      let fandomNameOneShort;
      let fandomNameOneShortUpdate;
      let fandomNameTwoShort;
      let fandomNameTwoShortUpdate;

      //if fandom name does contain RPF, remove it and just search the general fandom. so, Supernatural *RPF would provide results for just Supernatural (this is not a perfect search query, but it is a much better than whatever the query was turning up when RPF was included in the title). if the fandom name does not contain RPF, continue to the else statement and simply query the wikipedia api for the fandom name.
      if (fandomNameOne.includes(substring)) {
        fandomNameOneShort = fandomNameOne.split("*");
        console.log(fandomNameOneShort); // Output: an array with the fandom name and then *RPF.
        fandomNameOneShortUpdate = fandomNameOneShort[0]; //just access the fandom name
        let fandomURLOneShort =
          "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srlimit=1&srsearch=" +
          fandomNameOneShortUpdate;
        //general wikipedia query
        fetch(fandomURLOneShort)
          .then((response) => response.json())
          .then((data) => {
            //   console.log(data.query.search[0].title);

            let fandomOneWikiTitle = data.query.search[0].title;
            console.log(fandomOneWikiTitle);

            //now query wikipedia api for exact title of the page and provide the first two sentences from there.
            let fandomURLOneShortUpdate =
              "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&origin=*&exintro=true&exsentences=2&format=json&titles=" +
              fandomOneWikiTitle;
            fetch(fandomURLOneShortUpdate)
              .then((response) => response.json())
              .then((data) => {
                console.log(data.query.pages);
                // 1. Get the 'pages' object
                const pages = data.query.pages;
                // 2. Get the *first* (and in this case, only) key from the 'pages' object
                // Since the key ("23616705") is an arbitrary page ID, you can't hardcode it.
                // Object.keys() returns an array of the object's keys. We take the first one [0].
                const pageId = Object.keys(pages)[0];
                // 3. Use the page ID to access the specific page object and then the 'extract'
                const extractValue = pages[pageId].extract;
                console.log(extractValue);
                // Output: "Good Luck Charlie is an American sitcom that aired on Disney Channel from April 4, 2010, to February 16, 2014..."

                //   let extractValue = data.query.search[0].snippet;
                let fandomOneDescription = document.getElementById(
                  "fandom_one_description"
                );
                fandomOneDescription.innerHTML = extractValue;
              });
          });
      } else {
        // console.log("The string does not contain the substring.");
        let fandomURLOne =
          "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srlimit=1&srsearch=" +
          fandomNameOne;
        fetch(fandomURLOne)
          .then((response) => response.json())
          .then((data) => {
            //   console.log(data.query.search[0].title);

            let fandomOneWikiTitle = data.query.search[0].title;
            console.log(fandomOneWikiTitle);

            //now query wikipedia api for exact title of the work
            let fandomURLOneUpdate =
              "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&origin=*&exintro=true&exsentences=2&format=json&titles=" +
              fandomOneWikiTitle;
            fetch(fandomURLOneUpdate)
              .then((response) => response.json())
              .then((data) => {
                console.log(data.query.pages);
                // 1. Get the 'pages' object
                const pages = data.query.pages;
                // 2. Get the *first* (and in this case, only) key from the 'pages' object
                // Since the key ("23616705") is an arbitrary page ID, you can't hardcode it.
                // Object.keys() returns an array of the object's keys. We take the first one [0].
                const pageId = Object.keys(pages)[0];
                // 3. Use the page ID to access the specific page object and then the 'extract'
                const extractValue = pages[pageId].extract;
                console.log(extractValue);
                // Output: "Good Luck Charlie is an American sitcom that aired on Disney Channel from April 4, 2010, to February 16, 2014..."
                //display data on page

                //   let extractValue = data.query.search[0].snippet;
                let fandomOneDescription = document.getElementById(
                  "fandom_one_description"
                );
                fandomOneDescription.innerHTML = extractValue;
              });
          });
      }

      //display how many works fandom one has, mostly use this as a check to make sure the alert is correct

      let numWorksOne = data[randomNumber].cached_count;
      console.log(numWorksOne);

      //second fandom data; repeat everything we did above fot the second fandom
      let fandomButtonTwo = document.querySelector("#fandom_name_two");
      let fandomNameTwo = data[randomNumberTwo].name;
      fandomButtonTwo.innerHTML = fandomNameTwo;

      let numWorksTwo = data[randomNumberTwo].cached_count;
      console.log(numWorksTwo);

      if (fandomNameTwo.includes(substring)) {
        fandomNameTwoShort = fandomNameTwo.split("*");
        console.log(fandomNameTwoShort);
        fandomNameTwoShortUpdate = fandomNameTwoShort[0];
        let fandomURLTwoShort =
          "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srlimit=1&srsearch=" +
          fandomNameTwoShortUpdate;
        fetch(fandomURLTwoShort)
          .then((response) => response.json())
          .then((data) => {
            //   console.log(data.query.search[0].title); //entered here and could not do the .title

            let fandomTwoWikiTitle = data.query.search[0].title;
            console.log(fandomTwoWikiTitle);

            //now query wikipedia api for exact title of the work
            let fandomURLTwoShortUpdate =
              "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&origin=*&exintro=true&exsentences=2&format=json&titles=" +
              fandomTwoWikiTitle;
            fetch(fandomURLTwoShortUpdate)
              .then((response) => response.json())
              .then((data) => {
                console.log(data.query.pages);
                // 1. Get the 'pages' object
                const pages = data.query.pages;
                // 2. Get the *first* (and in this case, only) key from the 'pages' object
                // Since the key ("23616705") is an arbitrary page ID, you can't hardcode it.
                // Object.keys() returns an array of the object's keys. We take the first one [0].
                const pageId = Object.keys(pages)[0];
                // 3. Use the page ID to access the specific page object and then the 'extract'
                const extractValue = pages[pageId].extract;
                console.log(extractValue);
                // Output: "Good Luck Charlie is an American sitcom that aired on Disney Channel from April 4, 2010, to February 16, 2014..."
                //display data on page

                //   let extractValue = data.query.search[0].snippet;
                let fandomTwoDescription = document.getElementById(
                  "fandom_two_description"
                );
                fandomTwoDescription.innerHTML = extractValue;
              });
          });
      } else {
        console.log("The string does not contain the substring.");
        let fandomURLTwo =
          "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srlimit=1&srsearch=" +
          fandomNameTwo;
        fetch(fandomURLTwo)
          .then((response) => response.json())
          .then((data) => {
            //   console.log(data.query.search[0].title);

            let fandomTwoWikiTitle = data.query.search[0].title;
            console.log(fandomTwoWikiTitle);

            //now query wikipedia api for exact title of the work
            let fandomURLTwoUpdate =
              "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&origin=*&exintro=true&exsentences=2&format=json&titles=" +
              fandomTwoWikiTitle;
            fetch(fandomURLTwoUpdate)
              .then((response) => response.json())
              .then((data) => {
                console.log(data.query.pages);
                // 1. Get the 'pages' object
                const pages = data.query.pages;
                // 2. Get the *first* (and in this case, only) key from the 'pages' object
                // Since the key ("23616705") is an arbitrary page ID, you can't hardcode it.
                // Object.keys() returns an array of the object's keys. We take the first one [0].
                const pageId = Object.keys(pages)[0];
                // 3. Use the page ID to access the specific page object and then the 'extract'
                const extractValue = pages[pageId].extract;
                console.log(extractValue);
                // Output: "Good Luck Charlie is an American sitcom that aired on Disney Channel from April 4, 2010, to February 16, 2014..."
                //display data on page

                //   let extractValue = data.query.search[0].snippet;
                let fandomTwoDescription = document.getElementById(
                  "fandom_two_description"
                );
                fandomTwoDescription.innerHTML = extractValue;
              });
          });
      }

      let largerFandom;

      if (numWorksTwo > numWorksOne) {
        largerFandom = fandomNameTwo;
      } else {
        largerFandom = fandomNameOne;
      }

      console.log(largerFandom);

      const showPopup = (isCorrect) => {
        let popup = document.getElementById("center_popup");
        popup.style.visibility = "visible";

        let overlay = document.getElementById("overlay");
        overlay.style.visibility = "visible";

        //display results in popup window

        let resultDisplayOne = document.getElementById("popup_text");

        resultDisplayOne.innerHTML = `${
          isCorrect ? "Correct! " : "Sorry, better luck next time :/ "
        } ${fandomNameOne} has ${numWorksOne} works on the Archive! ${fandomNameTwo} has ${numWorksTwo} works.`;

        let continueButton = document.getElementById("continue_button");
        continueButton.addEventListener("click", function () {
          location.reload();
        });
      };

      //detect click event for each button , in each button, ask if numworks if bigger than the other num works and then perform something based on that

      //in the click event, determine if they clicked the right button

      //when user clicks fandom button one, something happens depending on if that fandom is bigger
      fandomButtonOne.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        if (numWorksOne > numWorksTwo) {
          console.log("number one bigger");

          showPopup(true);
        } else {
          console.log("number two bigger");

          showPopup(false);
        }
      });

      //when user clicks fandom button two, something happens depending on if that fandom is bigger
      fandomButtonTwo.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        if (numWorksTwo > numWorksOne) {
          console.log("number two bigger");

          showPopup(true);
        } else {
          console.log("number one bigger");

          showPopup(false);
        }
      });
    })
    .catch(function (err) {
      console.error(err);
    });
});
