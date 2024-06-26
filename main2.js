let AllInputs = document.querySelectorAll("input");
// console.log(AllInputs);

let DeletePostStatus = document.getElementById("ifissueDeleting");
let EditPostStatus = document.getElementById("ifissueEditing");
let PostAddComm = document.getElementById("PostCommentButton");
let commentAdding = document.getElementById("CommentAdding");
let CommentingStatus = document.getElementById("ifissue4comment");
let AddCommentModalClose = document.getElementById("AddCommentModalClose");

let CPTitle = document.getElementById("PostTitleInp");
let CPBody = document.getElementById("PostBodyInp");
let CPImage = document.getElementById("PostImageInp");
let PostingStatus = document.getElementById("ifissue2");




let isLoading = false;

// Infinite Scroll //
let LimitPPage = 50;
function InfiniteScrolling() {
   window.onscroll = function () {
      const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (endOfPage && !isLoading) {
         isLoading = true;
         // console.log("Reached the bottom of the page!");
         // console.log(LimitPPage);
         LimitPPage = LimitPPage + 50;
         ShowPosts2();
         return LimitPPage;
      }
   };
}
InfiniteScrolling();
let timerInS = localStorage.getItem("timerS");
let timerInM = localStorage.getItem("timerM");
localStorage.setItem("timerM", timerInM);
setInterval(() => {
   timerInS++;

   localStorage.setItem("timerS", timerInS);
   if (timerInS % 60 === 0) {
      timerInM++;
      localStorage.setItem("timerM", timerInM);
   }
}, 1000);

let PostsDiv = document.getElementById("PostsDiv");
let ProfileInfosCont = document.getElementById("ProfileInfosCont");
let LRL2 = document.getElementById("LRL2");






function emptyingInp() {
   AllInputs.forEach((input) => {
      input.value = "";
   });
}
emptyingInp();
function takeUserData() {
   axios
      .get(`https://tarmeezacademy.com/api/v1/users/${localStorage.getItem("UserId")}`)
      .then((UserRes) => {
         // console.log(UserRes);
         let data = UserRes.data.data;
         // console.log(data);
         let comments = data.comments_count;
         let posts = data.posts_count;
         // console.log(comments, posts);
         localStorage.setItem("CommentCount", comments);
         localStorage.setItem("PostCount", posts);
      })
      .catch((error) => {
         // console.log(error);
      });
}
function UserLogout2() {
   let tokenf = localStorage.getItem("token");
   // console.log(tokenf);
   axios
      .post(
         "https://tarmeezacademy.com/api/v1/logout",
         {}, // No data to send in the body
         {
            headers: {
               // The headers object should be used here
               Authorization: `Bearer ${tokenf}`,
            },
         }
      )
      .then((LogoutRes) => {
         localStorage.clear();
         // console.log(LogoutRes);
         LRL2.innerHTML = `
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#LoginF">Login</button>
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#RegisterF">Register</button>
          `;
         location.href = "index.html";
         addpostdiv.innerHTML = "";
      })
      .catch((error) => {
         // console.log("You're Not logged In");
      });
}

function ShowPosts2() {
   // InfiniteScrolliong();
   // console.log(LimitPPage);

   // console.log(LimitPPage);
   if (PostsDiv.innerHTML !== "") {
      PostsDiv.innerHTML += `
   <div style="margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   } else if (PostsDiv.innerHTML === "") {
      PostsDiv.innerHTML = `
   <div style="margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   }
   
   axios
      .get(`https://tarmeezacademy.com/api/v1/posts?limit=${LimitPPage}`)
      .then(function (res) {

         setTimeout(() => {
            PostsDiv.innerHTML = "";
            // console.log(res);
         let data = res.data.data;
         PostsDiv.innerHTML = "";
         let postsDisplayed = false;
         for (let i = 0; i < data.length; i++) {
            let usernames = data[i].author.username;

            let profile_image = data[i].author.profile_image;
            let PostTitle = data[i].title;
            let PostImage = data[i].image;
            let PostText = data[i].body;
            let CreationTime = data[i].created_at;
            let comments = data[i].comments_count;
            let id = data[i].id;

            let PostAuthorId = data[i].author.id;
            let PostAuthorusername = localStorage.getItem("username");
            // console.log(` this from lstorage : ${PostAuthorusername}`);
            let userId = parseInt(localStorage.getItem("UserId"));

            let DeleteEditBtns = `<div style="margin-left: auto; display : flex; gap: 5px;">
                            <button id="DeleteBtn" class="btn btn-danger"  onclick="DeletePostBtnClicked(${id})" data-bs-toggle="modal" data-bs-target="#DeletePostModal" data-bs-whatever="@fat">Delete</button>
                            <button id="EditBtn" class="btn btn-secondary"  onclick="EditPostBtnClicked(${id},'${PostText}','${PostTitle}')" data-bs-toggle="modal" data-bs-target="#EditPostModal" data-bs-whatever="@fat">Edit</button>
                            </div>`;
            if (userId === PostAuthorId) {
               PostsDiv.innerHTML += `
                    <div id="ShowEditDeleteBtns" class="card mb-3 col-9 shadow rounded-lg">
                        <div id="cardhead" class="d-flex align-items-end gap-1" style="padding: 5px 5px">
                            <img src="${profile_image}" style="width: 30px; height: 30px; border-radius: 15px; margin: 5px;" class="card-img-top" alt="...">
                            <h4 style="font-size: 20px;">@${usernames}</h4>
                            ${DeleteEditBtns}
                        </div>
                        <div class="card-body border border-1">
                            <h5 class="card-title">${PostTitle}</h5>
                            <img src="${PostImage}" style="width: 100%; margin: 8px auto;" alt="PostImage">
                            <p class="card-text">${PostText}</p>
                            <p class="card-text"><small class="text-muted">${CreationTime}</small></p>
                        </div>
                        <div style="margin: 3px; padding: 10px 0 0 10px;">
                            <h3 style="font-size: 15px;">Add a comment
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#AddComment" class="fa-solid fa-pen-to-square" style="margin: 0 5px; cursor: pointer;" onclick="AddComment(${id});commentFocus()"></i>
                                </span>
                            </h3>
                            <h3 style="font-size: 15px;">Show all comments ${comments}
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#ShowComment"  class="fa-solid fa-comment" style="margin: 0 5px; cursor: pointer;" onclick="ShowComments(${id})"></i>
                                </span>
                            </h3>
                        </div>
                    </div>`;
               postsDisplayed = true;
            }

            isLoading = false;
         }

         if (!postsDisplayed) {
            PostsDiv.innerHTML = `
                 
               <h1 class="crimson-text-semibold-italic" style="font-size: 23px; text-transform: Capitalize;">There is no posts to show! try making one <span id="NowWord" onclick="postFocus();" data-bs-toggle="modal" data-bs-target="#CreatePostModal" data-bs-whatever="@fat" style="text-decoration: none; cursor: pointer;">now</span></h1>
                   
               `;
         }
         }, 2500);
         
      })
      .catch((error) => {
         // console.log(error.response.data.message);
         document.body.innerHTML = `Please try again shortly.`;
         NavBar.style.display = "none";
         showdiv.innerHTML = "";
         document.body.style.display = "flex";
         document.body.style.justifyItems = "center";
         document.body.style.alignItems = "center";
         document.body.style.height = "100vh";
         document.body.style.width = "100vh";
      });
}
ShowPosts2();
function ShowPosts3() {
   // InfiniteScrolliong();
   // console.log(LimitPPage);

   // console.log(LimitPPage);
   
      PostsDiv.innerHTML = `
   <div style="margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   

   axios
      .get(`https://tarmeezacademy.com/api/v1/posts?limit=${LimitPPage}`)
      .then(function (res) {
         setTimeout(() => {
            PostsDiv.innerHTML = "";
            // console.log(res);
            let data = res.data.data;
            PostsDiv.innerHTML = "";
            let postsDisplayed = false;
            for (let i = 0; i < data.length; i++) {
               let usernames = data[i].author.username;

               let profile_image = data[i].author.profile_image;
               let PostTitle = data[i].title;
               let PostImage = data[i].image;
               let PostText = data[i].body;
               let CreationTime = data[i].created_at;
               let comments = data[i].comments_count;
               let id = data[i].id;

               let PostAuthorId = data[i].author.id;
               let PostAuthorusername = localStorage.getItem("username");
               // console.log(` this from lstorage : ${PostAuthorusername}`);
               let userId = parseInt(localStorage.getItem("UserId"));

               let DeleteEditBtns = `<div style="margin-left: auto; display : flex; gap: 5px;">
                            <button id="DeleteBtn" class="btn btn-danger"  onclick="DeletePostBtnClicked(${id})" data-bs-toggle="modal" data-bs-target="#DeletePostModal" data-bs-whatever="@fat">Delete</button>
                            <button id="EditBtn" class="btn btn-secondary"  onclick="EditPostBtnClicked(${id},'${PostText}','${PostTitle}')" data-bs-toggle="modal" data-bs-target="#EditPostModal" data-bs-whatever="@fat">Edit</button>
                            </div>`;
               if (userId === PostAuthorId) {
                  PostsDiv.innerHTML += `
                    <div id="ShowEditDeleteBtns" class="card mb-3 col-9 shadow rounded-lg">
                        <div id="cardhead" class="d-flex align-items-end gap-1" style="padding: 5px 5px">
                            <img src="${profile_image}" style="width: 30px; height: 30px; border-radius: 15px; margin: 5px;" class="card-img-top" alt="...">
                            <h4 style="font-size: 20px;">@${usernames}</h4>
                            ${DeleteEditBtns}
                        </div>
                        <div class="card-body border border-1">
                            <h5 class="card-title">${PostTitle}</h5>
                            <img src="${PostImage}" style="width: 100%; margin: 8px auto;" alt="PostImage">
                            <p class="card-text">${PostText}</p>
                            <p class="card-text"><small class="text-muted">${CreationTime}</small></p>
                        </div>
                        <div style="margin: 3px; padding: 10px 0 0 10px;">
                            <h3 style="font-size: 15px;">Add a comment
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#AddComment" class="fa-solid fa-pen-to-square" style="margin: 0 5px; cursor: pointer;" onclick="AddComment(${id});commentFocus()"></i>
                                </span>
                            </h3>
                            <h3 style="font-size: 15px;">Show all comments ${comments}
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#ShowComment"  class="fa-solid fa-comment" style="margin: 0 5px; cursor: pointer;" onclick="ShowComments(${id})"></i>
                                </span>
                            </h3>
                        </div>
                    </div>`;
                  postsDisplayed = true;
               }

               isLoading = false;
            }

            if (!postsDisplayed) {
               PostsDiv.innerHTML = `
                 
               <h1 class="crimson-text-semibold-italic" style="font-size: 23px; text-transform: Capitalize;">There is no posts to show! try making one <span id="NowWord" onclick="postFocus();" data-bs-toggle="modal" data-bs-target="#CreatePostModal" data-bs-whatever="@fat" style="text-decoration: none; cursor: pointer;">now</span></h1>
                   
               `;
            }
         }, 2500);
      })
      .catch((error) => {
         // console.log(error.response.data.message);
         document.body.innerHTML = `Please try again shortly.`;
         NavBar.style.display = "none";
         showdiv.innerHTML = "";
         document.body.style.display = "flex";
         document.body.style.justifyItems = "center";
         document.body.style.alignItems = "center";
         document.body.style.height = "100vh";
         document.body.style.width = "100vh";
      });
}


function EditPostBtnClicked(PostId, PostBody, PostTitle) {
   let id = PostId;
   let body = PostBody;
   let title = PostTitle;
   // console.log(id, body, title);
   document.getElementById("EditPostTitleInp").value = title;
   document.getElementById("EditPostBodyInp").value = body;

   SubmitchangesBtn.onclick = function () {
      let EditInpTitle = document.getElementById("EditPostTitleInp");
      let EditInpBody = document.getElementById("EditPostBodyInp");
      let tokenToEdit = localStorage.getItem("token");
      EditPostStatus.innerHTML = `
   <div style="position: absolute; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
      axios
         .put(
            `https://tarmeezacademy.com/api/v1/posts/${id}`,
            {
               title: EditInpTitle.value,
               body: EditInpBody.value,
            },
            {
               headers: {
                  Authorization: `Bearer ${tokenToEdit}`,
               },
            }
         )
         .then((EditRes) => {
            setTimeout(() => {
               EditPostStatus.innerHTML = "";
               // console.log(EditRes);
            EditPostStatus.innerHTML = "Post Has been Edited Successfully";
            ShowPosts3();
            setTimeout(() => {
               EditPostStatus.innerHTML = "";
               document.getElementById("EditPostModalClose").click();
            }, 2500);
            emptyingInp();
            }, 1500);
            
         })
         .catch((error) => {
            // console.log("error.response.data.error_message");
            if (error.response.data.error_message === "The current user doesn't own the post") {
               EditPostStatus.innerHTML = "You do not have access to modify/delete this post.";
            }
            setTimeout(() => {
               EditPostStatus.innerHTML = "";
            }, 2500);
         });
   };
}

function DeletePostBtnClicked(PostId) {
   let id = PostId;
   // console.log(id);

   ConfirmDeletePost.onclick = function () {
      // console.log("hihihi");
      let tokenToDelete = localStorage.getItem("token");

      DeletePostStatus.innerHTML = `
   <div style="position: absolute; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
      axios
         .delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
            headers: {
               Authorization: `Bearer ${tokenToDelete}`,
            },
         })
         .then((DeleteRes) => {
            setTimeout(() => {
               DeletePostStatus.innerHTML = "";
               // console.log(DeleteRes);
            DeletePostStatus.innerHTML = "Post Has been deleted Successfully";
            ShowPosts3();
            setTimeout(() => {
               DeletePostStatus.innerHTML = "";
               document.getElementById("DeletePostModalClose").click();
            }, 500);
            }, 1500);
            
         })
         .catch((error) => {
            // console.log(error);
            if (error.response.data.error_message === "The current user doesn't own the post") {
               DeletePostStatus.innerHTML = "You do not have access to modify/delete this post.";
            }
            setTimeout(() => {
               DeletPostStatus.innerHTML = "";
               document.getElementById("DeletePostModalClose").click();
            }, 2500);
         });
   };
   CancelDeletePost.onclick = function () {
      DeletePostModalClose.click();
   };
}

function ShowComments(PostId) {
   commentShowField.innerHTML = "";
   ShowPosts2();
   let id = PostId;
   commentShowField.innerHTML = `
   <div style="position: absolute; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   axios
      .get(
         `https://tarmeezacademy.com/api/v1
/posts/${PostId}`
      )
      .then((ShowCommRes) => {
         setTimeout(() => {
            commentShowField.innerHTML = "";
            // console.log(ShowCommRes);
         let comments = ShowCommRes.data.data.comments;
         // console.log(comments);
         if (comments.length === 0) {
            commentShowField.innerHTML = `
            <h1>No comments Found &#128546</h1>
            `;
         }
         for (let i = 0; i < comments.length; i++) {
            commentShowField.innerHTML += `
            <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Comment's author : <span>${comments[i].author.username}</span> </label>
            <div>
              <h3>${comments[i].body}</h3>
            </div>
          </div>`;
         }
         }, 1500);
         
      })
      .catch((error) => {
         // console.log(error);
      });
}

function AddComment(PostId) {
   let id = PostId;
   let tokenf = localStorage.getItem("token");
   // console.log(`this is the id : ${id}`);

   PostAddComm.onclick = function () {
      PostAddComm.setAttribute("disabled", "disabled");
      CommentingStatus.innerHTML = `
   <div style="position: absolute; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
      axios
         .post(
            `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
            {
               body: commentAdding.value,
            },
            {
               headers: {
                  // The headers object should be used here
                  Authorization: `Bearer ${tokenf}`,
               },
            }
         )
         .then((commentAddRes) => {
            setTimeout(() => {
               CommentingStatus.innerHTML = "";
               setTimeout(() => {
               PostAddComm.removeAttribute("disabled");
            }, 5000);
            // console.log(commentAddRes);
            ShowPosts3();
            emptyingInp();
            takeUserData();
            CommentingStatus.innerHTML = "Your Comment has been added successfully!";
            setTimeout(() => {
               CommentingStatus.innerHTML = "";
               AddCommentModalClose.click();
            }, 2500);
            }, 1500);
            
         })
         .catch((error) => {
            setTimeout(() => {
               PostAddComm.removeAttribute("disabled");
            }, 500);
            // console.log(error);
            if (error.response.data.message === "Unauthenticated.") {
               CommentingStatus.innerHTML = `You must login to comment on the post! <span type="button" data-bs-toggle="modal" data-bs-target="#LoginF">Login</span> <br>
               Don't have an account ? <span type="button" data-bs-toggle="modal" data-bs-target="#RegisterF">Register</span>`;
               setTimeout(() => {
                  CommentingStatus.innerHTML = "";
               }, 10000);
            } else {
               CommentingStatus.innerHTML = `${error.response.data.message} Try Again Please`;
               setTimeout(() => {
                  CommentingStatus.innerHTML = "";
               }, 3000);
               PostAddComm.removeEventListener("click");
            }
         });
   };
}



function LoginStatus2() {
   let timerInS = localStorage.getItem("timerS");
   let timerInM = localStorage.getItem("timerM");
   localStorage.setItem("timerM", timerInM);
   setInterval(() => {
      timerInS++;

      localStorage.setItem("timerS", timerInS);
      if (timerInS % 60 === 0) {
         timerInM++;
         localStorage.setItem("timerM", timerInM);
      }
   }, 1000);

   let username = localStorage.getItem("username");
   let id = localStorage.getItem("UserId");
   let profileImage = localStorage.getItem("ProfileImg");
   let commentsCount = localStorage.getItem("CommentCount");
   let postsCount = localStorage.getItem("PostCount");
   if (localStorage.getItem("token") !== null) {
      LRL2.innerHTML = `
         <button type="button" class="btn btn-outline-danger" onclick="UserLogout2()">Logout</button>
         `;

      ProfileInfosCont.innerHTML = `
      
      <div class="card mb-3 container" style="max-width: 100%; padding: 30px;" >
             <div class="row g-0">
                <div class="col-md-4" style="border-radius: 11111111px">
                   <img src="${profileImage}" class="img-fluid rounded-circle" alt="..." style="border-radius: 111111111111px;">
                  </div>
                  <div class="col-md-8">
                     <div class="card-body">
                        <h5 class="card-title text-center">@${username} | #${id} </h5>
                        <h1 style="text-align: center;"><span style="display: inline-block; text-decoration: underline; letter-spacing: 1.5px;">@${username}</span> Has made :</h1>
                        <h6 class="card-text" style="font-weight: 600;">Posts : <span>${postsCount}</span></h6>
                        <h6 class="card-text"  style="font-weight: 600;">Conmments : <span>${commentsCount}</span></h6>
                        <p class="card-text"><small class="text-body-secondary">Last Login ${localStorage.getItem(
                           "timerM"
                        )} mins ago</small></p>
                     </div>
                  </div>
               </div>
            </div>
      
      `;
   }
}
LoginStatus2();

let token = localStorage.getItem("token");
// console.log("This is the token in the second page " + token);

function CreatePost2() {
   let imgtst = CPImage.files[0];
   // console.log(`this is the image : ${imgtst}`);
   // console.log(CPBody.value);
   //
   let tokenf = localStorage.getItem("token");
   // console.log(tokenf);

   let formDatas = new FormData();
   formDatas.append("title", CPTitle.value);
   formDatas.append("body", CPBody.value);
   formDatas.append("image", CPImage.files[0]);
   
   PostingStatus.innerHTML = `
   <div style="position: absolute; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;

   axios
      .post("https://tarmeezacademy.com/api/v1/posts", formDatas, {
         headers: {
            // The headers object should be used here
            Authorization: `Bearer ${tokenf}`,
         },
      })
      .then((CPRes) => {
         setTimeout(() => {
            PostingStatus.innerHTML = "";
            //  console.log(CPRes);
         ShowPosts3();
         PostingStatus.innerHTML = `Post has been created successfully!`;
         setTimeout(() => {
            PostingStatus.innerHTML = "";
            PostModalClose.click();
         }, 2000);
         takeUserData();
         emptyingInp();
         }, 1500);
        
      })
      .catch((error) => {
         // console.log(error);
         PostingStatus.innerHTML = `${error.response.data.message} Please try another one`;
         setTimeout(() => {
            PostingStatus.innerHTML = "";
         }, 3500);
      });
}
