
These are just a few utilities that work with Stripperville.io. It's been written
to be used as a quick primer into programming the Etherium blockchain. There are lots of
comments where they normally wouldn't be etc. 

There are three ways to run this. 

1. The easy way "I just want to send out $STRIP 
   to my holders!" (A.K.A. The users way)

2. The hard way, "I want to see how this works, how to set
   it up and everything." (A.K.A "The developer way").

3. I run it for you. 

   I create a new wallet, you send the strip,
   I run it, we can do a live screen share if you want to watch
   me go through it to learn. I'll be recording it either way.
   After it's done I can send back any $STRIP to you. It's all
   on the blockchain, so there's no funny stuff. And if anything
   goes wrong (network goes out, etc) I can fix it right then.
   I'm happy to offer this to everyone. FERDA! :)


The hard way, "I want to see how this works and hack on it for a bit."
There's full instructions to install everything on a local linux workstation,
and it's easy to translate to another OS if that's what you are running. You'll
need a bash shell, cygwin will probably work. I can't test that, though.


To get a copy of this run the following command:

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!! Developers: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

- Install git 
- get repo:
  - $ git clone https://github.com/fmerenda/StripperVilleUtils
- Follow the README.txt


*************************************************************************
*************************************************************************
** Developer setup installing locally starts here ***********************
*************************************************************************
*************************************************************************

Install some bash shell. cygwin? Is that still a thing?

Install NPM. See NPM docs. :)

  - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Install npm modules:

 npm install web3 --save
 npm install dotenv --save

 Install git
 
 Clone the StripperVilleUtils repository:

   - Open a terminal, and make a directory for the project:

      - mkdir -p $HOME/projects/stripperville
      - $cd !$
      $ git clone https://github.com/fmerenda/StripperVilleUtils
      $ cd StripperVilleUtils


  Copy the DOT.env to .env and put in the private key
  of the account you are transferring FROM. This file 
  will not get checked in.

    $ cp DOT.env .env

  Open .env in gedit by typing the following, because it's a "hidden" file:
  
    $ gedit .env & 
    
  Edit and put your private key in from the SENDER's account.

  # Test your install:

  - Run the quick tests to make sure the basics are working OK
  
    $ gedit src/strippervillemiami/utils/StripperUtilTest.js & 

      - Change/verify that the last active line is:

         runQuickTests();

      NOT beginning with the two slashes like this:

      //runQuickTests();

      (The two forward slashes make a comment, and you want to run the quick tests)

    - Make sure the call to runAllTests() is commented out (looks like this):

          //runAllTests();

        *Not* like this!

        runAllTests();

You shouldn't get any errors. If you get errors you'll know from the 1,000
"!!!!!" that I put in the errors.

You can't run runAllTests() because it will try to send 1 $STRIP from 
Miami to Frank's account, and it will fail because you (hopefully) 
don't have my private keys for the miami club!

If everything looks good so far:

 ******************************************
 **** Prep to run the distributeStrip: ****
 ******************************************

    - put the numbers of your strippers in the file RawStripperNumbers.txt
      in the main directory of this project. 
      - whitespaces are OK, but best to avoid
        anything except one address per line. They should be 1 number 
        to a line, like so:

123
321
etc....

 * Pre-process the numbers of your strippers before you put them in the app:
 
   $ chmod +x ./formatInputListOfNumbers.sh && ./formatInputListOfNumbers.sh

      - The script will remove any whitespace, and empty lines, and leaves a comma off the last number.
 
 * Put your strippers into the source code:

    Open the StripperIds.js file, 

    - gedit src/strippervillemiami/utils/StripperUtil.js, and paste that text at the top, 
      ** on the lines between the '[' and the '];'. ***

  * Now set the amount and the sender's address.

    - Open the StripperUtils.js file:

          - gedit src/strippervillemiami/utils/StripperUtil.js
          - at the top after the intitial comments you'll see two lines:

      const SENDER_WALLET_ADDRESS = ""; 
      const AMOUNT_TO_SEND_TO_EACH_WALLET = 1;

    - Change those to your sender's wallet, and the amount you want
      to send to each person PER STRIPPER. 

    *** NOTE THAT THIS UTILITY DOES NOT SUPPORT DECIMALS! WHOLE
      NUMBERS ONLY! *****

Save it.

Last thing: 

* if you want to see debugging messages as it runs, edit
  the file src/strippervillemiami/utils/LogUtils, and change this line
      var DEBUG = false;
  to this
      var DEBUG = true;

************************************
********* Run the program: *********
************************************

- From the terminal, in the base directory of the project, run the program:

  $ node ./src/strippervillemiami/utils/StripperUtils.js

and let it run! You'll see messages as it runs, and you can 
check it's progress on the blockchain explorer:

  - https://explorer.stripchain.blockwell.ai
    -- choose "transactions" at the top.

After the run, delete your .env file! That's in case for some reason
the VM gets pushed back to github, or someone steals your computer, or 
anything like that! Keep those keys safe!

After it's complete, shut the machine down, and you'll be ready for 
next time, all you'll have to do is repeat the steps from XXXXX to the end. 

