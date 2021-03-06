![Vombatus ursinus](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Vombatus_ursinus_-Maria_Island_National_Park.jpg/320px-Vombatus_ursinus_-Maria_Island_National_Park.jpg)

# Field Work

Tag and release wombats using JavaScript. (Yes, it really is the language that can do everything...)


## Setup

* During the workshop we'll be using the [Cloud 9](https://c9.io) development environment.
  * It's well worth investing the time in setting up your own local testing environment, but this is a quick start that gets everyone on the same page easily.

1. To begin with, you'll need a [GitHub](https://github.com) account.
2. Once you've got one, go to [Cloud 9](https://c9.io) and login using GitHub.
3. On your account page (`https://c9.io/username`), click _Create a new workspace_.
4. Give the workspace a name (and description if you like).
5. In the *Clone from Git or Mercurial URL* box, type or copy/paste the following:

   ```
   https://github.com/nature-of-js/field-work
   ```

   (Despite the placeholder text, it's best to use the full URL, otherwise you may get errors about your SSH key.)
6. You can leave the template set to _Custom_. Go ahead and click _Create workspace_.
7. When your workspace window opens, you'll see a blue terminal window at the bottom. It's asking for your GitHub username and password, type those in.
8. You should now have the workshop source code cloned to your workspace. You'll see the files and folders on the left side of the window.
9. So you're not prompted each time you use git, complete its configuration with the following command (you will get prompted one more time, but then it will save your credentials):

    ```
    ./config-git "Your name" "your@email"
    ```

10. To complete the install, run the following in the terminal window at the bottom of the screen, type (feel free to have a look at this file to see what it's doing):

   ```
   source complete-setup
   ```

This will take quite some time and you'll see output. A *lot* of output. You can probably ignore it (if there's lots of red flashing by, maybe read those bits!) It should be noted that normally you can rely on `npm install` in place of some of what this script is doing, but it was necessary to work around memory restrictions in our Cloud 9 workspaces.

11. We recommend opening a separate terminal window for the Mongo daemon. There's a `+` button at the top of the terminal that'll do that for you. In the new window, start the MongoDB daemon:

    ```
    ./start-mongodb
    ```

    (That `./` prefix is important.)

12. Go back to your initial terminal window and run the tests:

    ```
    npm test
    ```

13. If all went well, you should see a progress bar and some tests passing! Now you can run the server:

    ```
    npm start
    ```

14. The API endpoints will be available at _workspacename-username.c9.io/api/v1/endpoint-name_.

