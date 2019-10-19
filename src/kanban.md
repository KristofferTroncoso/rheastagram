# To do
* add loading icons or display nothing while loading for foodcards. Suspense?
* fix NewPic modal
* do a new-account test. see how it is with no pics or anything.
* add likes feature
* add comment feature
* explore/try out fetch api or some apollo or urql stuff instead of amazon's API and graphqlOperation
* make a react native version
* pull out graphql queries and mutations into own file. right now theyre in the components
* Make one custom S3Image component and replace all the other ones i have.
* add search feature or remove searchbar
* when deleting a post, should it delete all comments and likes associated with it?
* try having one dynamodb table instead of 4 separate ones? see if that's possible?
* add an admin account. a way to have power to delete any post or user.
* userpage should have chrono order
* take off 'Log Out' link on mobile
* make gear icon/button on profile page for options like log out
* try streaming or graphql subscriptions. so if something gets posted to db, it should
  just show up on your home page.
* fix pic orientation issue when uploading mobile sometimes
* turn off autocapitalization on login form. attribute is "autocapitalization"


# In Progress


# Completed
* add delete feature to food card. 
    * The main thing with this one is that it is deleting the dynamodb record but
        not the actual picture on s3. and if i delete the picture in s3 then i can
        affect other posts since not every upload is unique. If it's the same file-name,
        it actually just overwrites the existing file on s3. So there can be
        multiple dynamodb records/posts that use the same s3 file.
* fix NewPic hearts and comments on-hover
  * so the number of comments and likes is there. but the actual comment and likes 
    dont get passed yet. I'll put a new task on the To Do list about adding likes
    and comment feature
* fix edit page
    * basically had it fetch the userdata again when you submit the form
* add a 'refresh' feature to fetch data brand new. you can click a button on a toolbar
  for example. also we can just call this function when we wanna refresh after making
  a mutation to the server data.
    * successfully able to make a function that does it calleld getAuthenticatedUserAndData.
* add change picture to edit page and userpage;
    * k so i got the query working. and the s3 upload working.
    * now i have to fix all the components that depends on just a regular src key
        * instead of that i have to do the whole Storage.get thing
        * so now i have to modify Avatar and the userpage and editprofilepage
    *Completed: Alright the only problem really is that I had to do the Storage.get thing
      on like 3 different components. My custom S3Image component should just be one
      component. The reason i dont use Amplify's S3Image component is that it doesnt
      really pass in props. It's hard to style. I'll just have to add this to my todolist.
* when deleting a post in your userpage, it doesnt refresh (try the getAuthenticatedUserAndData func)
  * might be temporary but i just had it push to home. the problem was the double modal thing
    going on when deleting from userpage and it just pushes to same place so its like
    nothing happens.
* try deploying to either amplify console or to s3 and cloudfront
  * ok that was easier than i thought. i basically just pushed it to a new private
    repo on my GitHub. Then i went to amplify console and connected the repo. Everything
    just happened automatically. Now my app is hosted here https://master.d3bmzm8bmp8ok9.amplifyapp.com/
* check out amplify console
  * check above
* add mobile footer. 
    * If mobile device (google 'how to check if mobile device'), show MobileNavBar
        which should have a post photo button, a profile button, and a home button
    * need to add upload feature for MobileNavbar. 
        * so i ended up just redirecting to /post like my normal way to upload.
* for top navbar, if window width is small/mobile, take out search bar.
    * i could make this better.
* make layout responsive
* manifest.json make it app-like
* grid on profilepage
  * this is so hard. apparently the thing that helps a lot is if your photos are already square
  * mine arent square so i have to do some fancy shz. i thought it'd be easy with grid but it's not
  * omg i think i actually did it. i played around on codepen for so long but i think i got it.
  * weeehooo. it works perfectly. i love it.
* keep instagram name in mobile



# Postpone
* add short-video upload feature
    * i was able to find a small npm package to do it but i would also need to 
      store the file type in dynamodb so i can conditionally render the video player.
    * on top of that i would also have to modify and maybe rebuild the file upload
        component to allow video files. Since im using the PhotoPicker from aws-amplify,
        it may be a bigger component rebuild than i thought.
