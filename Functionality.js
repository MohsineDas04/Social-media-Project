// const { default: axios } = require("axios");

let isLoading = false;

// Infinite Scroll //
let LimitPPage = 10;
function InfiniteScrolliong() {
   window.onscroll = function () {
      const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (endOfPage && !isLoading) {
         isLoading = true;
         // console.log("Reached the bottom of the page!");
         // console.log(LimitPPage);
         LimitPPage = LimitPPage + 10;
         ShowPosts();
         return LimitPPage;
      }
   };
}
InfiniteScrolliong();
//// Infinite Scroll ////

// drawer = 10;


function emptyingInp() {
   AllInputs.forEach((input) => {
      input.value = "";
   });
}
emptyingInp();
function ShowPosts() {
   // InfiniteScrolliong();
   // console.log(LimitPPage);
   // console.log(LimitPPage);
   if (showdiv.innerHTML !== "") {
       showdiv.innerHTML += `
   <div style="position: relative; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   } else if (showdiv.innerHTML === "") {
      showdiv.innerHTML += `
   <div style="position: relative; margin: auto;">

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
            showdiv.innerHTML = "";
            // console.log(res);
            let data = res.data.data;

            showdiv.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
               let usernames = data[i].author.username;
               // console.log(usernames);

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

               let DeleteEditBtns = "";
               if (userId === PostAuthorId) {
                  DeleteEditBtns = `<div style="margin-left: auto; display : flex; gap: 5px;">
                            <button id="DeleteBtn" class="btn btn-danger"  onclick="DeletePostBtnClicked(${id})" data-bs-toggle="modal" data-bs-target="#DeletePostModal" data-bs-whatever="@fat">Delete</button>
                            <button id="EditBtn" class="btn btn-secondary"  onclick="EditPostBtnClicked(${id},'${PostText}','${PostTitle}')" data-bs-toggle="modal" data-bs-target="#EditPostModal" data-bs-whatever="@fat">Edit</button>
                            </div>`;
               }

               if (PostTitle) {
                  showdiv.innerHTML += `
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
               } else if (!PostTitle) {
                  showdiv.innerHTML += `
                    <div class="card mb-3 col-9 shadow rounded-lg">
                        <div id="cardhead" class="d-flex align-items-end gap-1" style="padding: 5px 5px">
                            <img src="${profile_image}" style="width: 30px; height: 30px; border-radius: 15px; margin: 5px;" class="card-img-top" alt="...">
                            <h4 style="font-size: 20px;">@${usernames}</h4>
                            ${DeleteEditBtns}
                            </div>
                        <div class="card-body border border-1">
                            <h5 class="card-title"></h5>
                            <img src="${PostImage}" style="width: 100%; margin: 8px auto;" alt="PostImage">
                            <p class="card-text">${PostText}</p>
                            <p class="card-text"><small class="text-muted">${CreationTime}</small></p>
                        </div>
                        <div style="margin: 3px; padding: 10px 0 0 10px;">
                            <h3 style="font-size: 15px;">Add a comment
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#AddComment" class="fa-solid fa-pen-to-square" style="margin: 0 5px; cursor: pointer;" onclick="AddComment(${id})"></i>
                                </span>
                            </h3>
                            <h3 style="font-size: 15px;">Show all comments ${comments}
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#ShowComment"  class="fa-solid fa-comment" style="margin: 0 5px; cursor: pointer;" onclick="ShowComments(${id})"></i>
                                </span>
                            </h3>
                        </div>
                    </div>`;
               }

               isLoading = false;
            }
         }, 2500);
      })
      .catch((error) => {
         document.body.innerHTML = `${error.response.data.message} Please try again shortly.`;
         NavBar.style.display = "none";
         showdiv.innerHTML = "";
         document.body.style.display = "flex";
         document.body.style.justifyItems = "center";
         document.body.style.alignItems = "center";
         document.body.style.height = "100vh";
         document.body.style.width = "100vh";
      });
}
function ShowPosts1() {
   // InfiniteScrolliong();
   // console.log(LimitPPage);
   // console.log(LimitPPage);
   
      showdiv.innerHTML = `
   <div style="position: relative; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   

   axios
      .get(`https://tarmeezacademy.com/api/v1/posts?limit=${LimitPPage}`)
      .then(function (res) {
         setTimeout(() => {
            showdiv.innerHTML = "";
            // console.log(res);
            let data = res.data.data;

            showdiv.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
               let usernames = data[i].author.username;
               // console.log(usernames);

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

               let DeleteEditBtns = "";
               if (userId === PostAuthorId) {
                  DeleteEditBtns = `<div style="margin-left: auto; display : flex; gap: 5px;">
                            <button id="DeleteBtn" class="btn btn-danger"  onclick="DeletePostBtnClicked(${id})" data-bs-toggle="modal" data-bs-target="#DeletePostModal" data-bs-whatever="@fat">Delete</button>
                            <button id="EditBtn" class="btn btn-secondary"  onclick="EditPostBtnClicked(${id},'${PostText}','${PostTitle}')" data-bs-toggle="modal" data-bs-target="#EditPostModal" data-bs-whatever="@fat">Edit</button>
                            </div>`;
               }

               if (PostTitle) {
                  showdiv.innerHTML += `
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
               } else if (!PostTitle) {
                  showdiv.innerHTML += `
                    <div class="card mb-3 col-9 shadow rounded-lg">
                        <div id="cardhead" class="d-flex align-items-end gap-1" style="padding: 5px 5px">
                            <img src="${profile_image}" style="width: 30px; height: 30px; border-radius: 15px; margin: 5px;" class="card-img-top" alt="...">
                            <h4 style="font-size: 20px;">@${usernames}</h4>
                            ${DeleteEditBtns}
                            </div>
                        <div class="card-body border border-1">
                            <h5 class="card-title"></h5>
                            <img src="${PostImage}" style="width: 100%; margin: 8px auto;" alt="PostImage">
                            <p class="card-text">${PostText}</p>
                            <p class="card-text"><small class="text-muted">${CreationTime}</small></p>
                        </div>
                        <div style="margin: 3px; padding: 10px 0 0 10px;">
                            <h3 style="font-size: 15px;">Add a comment
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#AddComment" class="fa-solid fa-pen-to-square" style="margin: 0 5px; cursor: pointer;" onclick="AddComment(${id})"></i>
                                </span>
                            </h3>
                            <h3 style="font-size: 15px;">Show all comments ${comments}
                                <span>
                                    <i data-bs-toggle="modal" data-bs-target="#ShowComment"  class="fa-solid fa-comment" style="margin: 0 5px; cursor: pointer;" onclick="ShowComments(${id})"></i>
                                </span>
                            </h3>
                        </div>
                    </div>`;
               }

               isLoading = false;
            }
         }, 2500);
      })
      .catch((error) => {
         document.body.innerHTML = `${error.response.data.message} Please try again shortly.`;
         NavBar.style.display = "none";
         showdiv.innerHTML = "";
         document.body.style.display = "flex";
         document.body.style.justifyItems = "center";
         document.body.style.alignItems = "center";
         document.body.style.height = "100vh";
         document.body.style.width = "100vh";
      });
}
ShowPosts();
function ShowTags() {
   axios.get("https://tarmeezacademy.com/api/v1/tags").then((restags) => {
      // console.log(restags);
      tag1 = restags.data.data[0].name;
      tag2 = restags.data.data[1].name;
      tag3 = restags.data.data[2].name;
      tag4 = restags.data.data[3].name;
   });
}

// ShowPosts();

// localStorage.clear();

function UserLogin() {
   const formData = new FormData();
   formData.append("username", emailtologin.value);
   formData.append("password", passtologin.value);
   LoginProcessStatus.innerHTML = `
   <div style="position: relative; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;
   axios
      .post("https://tarmeezacademy.com/api/v1/login", formData)
      .then(function (response) {
         setTimeout(() => {
            LoginProcessStatus.innerHTML = "";
            // console.log(response);
            let data = response.data;
            // console.log(data);
            token = data.token;
            localStorage.setItem("token", token);
            let username = data.user.username;
            localStorage.setItem("username", username);
            let userId = data.user.id;
            localStorage.setItem("UserId", userId);
            // console.log(username);
            let PostCount = data.user.posts_count;
            localStorage.setItem("PostCount", PostCount);
            let CommentsCount = data.user.comments_count;
            localStorage.setItem("CommentCount", CommentsCount);
            let profileImage = data.user.profile_image;
            localStorage.setItem("ProfileImg", profileImage);
            LoginProcessStatus.innerHTML = "Logged In Successfully";
            addpostdiv.innerHTML = `
         <i id="addposticon" onclick="postFocus();" data-bs-toggle="modal" data-bs-target="#CreatePostModal" data-bs-whatever="@fat" class="fa-solid fa-plus"  style="color: white; background-color: blue; padding: 18px; border-radius: 11111px; cursor: pointer;" ></i>
         <h3 id="addpost" style="font-size: 20px;">Add post</h3>`;
            LRL.innerHTML = `
         <button type="button" class="btn btn-outline-danger" onclick="UserLogout()">Logout</button>
         `;
            ProfileLinkShow.innerHTML = `
      <a class="nav-link" href="/index2.html">Profile</a>
      `;
            setTimeout(() => {
               // LoginModal.setAttribute("hidden", "hidden");
               LoginProcessStatus.innerHTML = "";
               closemodalbtn.click();
            }, 2500);
            let timerInS = 0;
            let timerInM = 0;
            localStorage.setItem("timerM", timerInM);
            setInterval(() => {
               timerInS++;

               localStorage.setItem("timerS", timerInS);
               if (timerInS % 60 === 0) {
                  timerInM++;
                  localStorage.setItem("timerM", timerInM);
               }
            }, 1000);

            tokenretrieve();
            userDataRetrieve();
            emptyingInp();
            ShowPosts1();
         }, 2500);
      })
      .catch(function (error) {
         LoginProcessStatus.innerHTML = error.response.data.message;
      });

   return token;
}

function tokenretrieve() {
   let token2 = localStorage.getItem("token");
   // console.log("token recovered : " + token2);
   return token2;
}

function userDataRetrieve() {
   let LogUserData = [];
   LogUserData.push(JSON.parse(localStorage.getItem("UserData")));
   // console.log(LogUserData[0].name);
}

function UserLogout() {
   let tokenf = tokenretrieve();
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
         // console.log(LogoutRes);
         LRL.innerHTML = `
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#LoginF">Login</button>
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#RegisterF">Register</button>
          `;
         addpostdiv.innerHTML = "";
         ProfileLinkShow.innerHTML = "";
         location.href = "index.html";
         ShowPosts1();
         localStorage.clear();
      })
      .catch((error) => {
         // console.log("You're Not logged In");
      });
}

function CreatePost2() {
   let imgtst = CPImage.files[0];
   // console.log(`this is the image : ${imgtst}`);
   // console.log(CPBody.value);
   //
   let tokenf = tokenretrieve();
   // console.log(tokenf);

   let formDatas = new FormData();
   formDatas.append("title", CPTitle.value);
   formDatas.append("body", CPBody.value);
   formDatas.append("image", CPImage.files[0]);

   PostingStatus.innerHTML = `
   <div style="position: relative; margin: auto;">

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
            // console.log(CPRes);
            ShowPosts1();
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

function RegisterUser() {
   //
   RegisteringStatus.innerHTML = `
   <div style="position: relative; margin: auto;">

       <div class="loader">
         <div></div><div></div><div></div>
        </div> 

      </div>
`;

   if (
      !UsernameR.value ||
      !PasswordR.value ||
      !ProfilePictureR.files[0] ||
      !FullnameR.value ||
      !EmailR.value
   ) {
      setTimeout(() => {
         RegisteringStatus.innerHTML = "";
         RegisteringStatus.innerHTML = "All fields are required";
         setTimeout(() => {
            RegisteringStatus.innerHTML = "";
         }, 3000);
      }, 1000);
   } else {
      let formData = new FormData();
      formData.append("username", UsernameR.value);
      formData.append("password", PasswordR.value);
      formData.append("image", ProfilePictureR.files[0]);
      formData.append("name", FullnameR.value);
      formData.append("email", EmailR.value);

      axios
         .post("https://tarmeezacademy.com/api/v1/register", formData)
         .then((RegisterRes) => {
            setTimeout(() => {
               RegisteringStatus.innerHTML = "";
               // console.log(RegisterRes);
               RegisteringStatus.innerHTML = "User registered successfully";
               setTimeout(() => {
                  RegisteringStatus.innerHTML = "";
                  RegisteringModalClose.click();
               }, 2500);
               emptyingInp();
            }, 1500);
         })
         .catch((error) => {
            // console.log(error);
            RegisteringStatus.innerHTML = `${error.response.data.message} Fix errors and try again`;
            setTimeout(() => {
               RegisteringStatus.innerHTML = "";
            }, 2500);
         });
   }
}

function AddComment(PostId) {
   let id = PostId;
   let tokenf = tokenretrieve();
   // console.log(`this is the id : ${id}`);

   PostAddComm.onclick = function () {
      PostAddComm.setAttribute("disabled", "disabled");
      CommentingStatus.innerHTML = `
   <div style="position: relative; margin: auto;">

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
               ShowPosts1();
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

function ShowComments(PostId) {
   commentShowField.innerHTML = "";
   let id = PostId;
   commentShowField.innerHTML = `
   <div style="position: relative; margin: auto;">

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

function LoginStatus() {
   if (localStorage.getItem("token") !== null) {
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

      addpostdiv.innerHTML = `
         <i id="addposticon" onclick="postFocus();" data-bs-toggle="modal" data-bs-target="#CreatePostModal" data-bs-whatever="@fat" class="fa-solid fa-plus"  style="color: white; background-color: blue; padding: 18px; border-radius: 11111px; cursor: pointer;"></i>
         <h3 id="addpost" style="font-size: 20px;">Add post</h3>`;

      LRL.innerHTML = `
         <button type="button" class="btn btn-outline-danger" onclick="UserLogout()">Logout</button>
         `;

      ProfileLinkShow.innerHTML = `
      <a class="nav-link" href="/index2.html">Profile</a>
      `;
   }
}
LoginStatus();



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
   <div style="position: relative; margin: auto;">

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
               ShowPosts1();
               setTimeout(() => {
                  EditPostStatus.innerHTML = "";
                  document.getElementById("EditPostModalClose").click();
               }, 2500);
               emptyingInp();
            }, 1500);
         })
         .catch((error) => {
            // console.log(error.response.data.error_message);
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
   <div style="position: relative; margin: auto;">

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
               ShowPosts1();
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

// localStorage.clear();
